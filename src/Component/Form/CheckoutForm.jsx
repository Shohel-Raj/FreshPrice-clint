import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkoutForm.css';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const CheckoutForm = ({ product, quantity, totalPrice }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const  navigate =useNavigate();

  // 1️⃣ Generate Payment Intent
  useEffect(() => {
    if (totalPrice > 0) {
      const getClientSecret = async () => {
        try {
          const { data } = await axiosSecure.post('/create-payment-intent', {
            amount: parseFloat(totalPrice),
          });
          setClientSecret(data?.clientSecret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      };
      getClientSecret();
    }
  }, [totalPrice, axiosSecure]);

  // 2️⃣ Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    setCardError(null);

    // 3️⃣ Confirm Card Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'unknown@example.com',
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      const orderData = {
        userEmail: user?.email,
        productId: product._id,
        productTitle: product.itemName,
        productImage: product.image,
        Market: product.marketName,
        quantity,
        totalPrice,
        transactionId: paymentIntent.id,
        orderDate: new Date(),
        status: 'pending',
      };

      try {
        const { data } = await axiosSecure.post('/order', orderData);
        if (data?.insertedId) {
          toast.success('🎉 Order placed successfully!');
          navigate(-1);
        }

 

      } catch (err) {
        console.error('Error saving order:', err);
        toast.error('Failed to save order!');
      } finally {
        setProcessing(false);
      }
    }
  };
const handleCancel=()=>{
navigate(-1);
toast('❌ Payment Cancelled')
}
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />

      {cardError && <p className="text-red-500 mt-2">{cardError}</p>}

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? <ClipLoader size={20} color="#fff" /> : `Pay ৳${totalPrice}`}
        </button>

        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
