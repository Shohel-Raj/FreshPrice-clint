import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import CheckoutForm from '../Component/Form/CheckoutForm';
import { motion } from 'framer-motion';
import {
  FaCreditCard,
  FaMoneyBillAlt,
  FaLock,
  FaApplePay,
  FaGooglePay,
  FaPaypal,
  FaShoppingCart,
  FaWallet,
  FaBitcoin,
  FaArrowRight,
} from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const iconList = [
  FaCreditCard,
  FaMoneyBillAlt,
  FaLock,
  FaApplePay,
  FaGooglePay,
  FaPaypal,
  FaShoppingCart,
  FaWallet,
  FaBitcoin,
  FaArrowRight,
];

const FloatingIcon = ({ Icon, x, y, delay }) => (
  <motion.div
    className="absolute text-gray-500 opacity-40 text-4xl"
    style={{ top: `${y}%`, left: `${x}%` }}
    animate={{ y: [0, -15, 0] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    <Icon />
  </motion.div>
);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // in kg

  useEffect(() => {
    if (id) {
      axiosSecure.get(`/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [id, axiosSecure]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  const totalPrice = (product.unitPrice * quantity).toFixed(2);

  return (
    <div className="relative min-h-screen bg-[#f4ebc8] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated Background Icons */}
      {iconList.map((Icon, index) => (
        <FloatingIcon
          key={index}
          Icon={Icon}
          x={Math.random() * 90} // 0–90% left
          y={Math.random() * 90} // 0–90% top
          delay={Math.random() * 2} // 0–2s delay
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full p-6 bg-white shadow-2xl rounded-xl"
      >
        <div className="flex items-center justify-center mb-4 text-green-600">
          <FaCreditCard className="text-3xl mr-2" />
          <h2 className="text-3xl font-bold text-center">Secure Checkout</h2>
        </div>

        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/3 object-cover rounded-lg shadow"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
            <p className="text-gray-700 text-sm mb-2">{product.description}</p>
            <p className="text-md font-medium mb-3">
              Unit Price: <span className="text-green-600">৳{product.unitPrice}/kg</span>
            </p>

            <div className="mb-4">
              <label className="block font-medium mb-1">Select Quantity (in kg):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  step="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded px-3 py-1 w-24"
                  placeholder="Enter kg"
                />
                <span className="text-gray-600 font-medium">kg</span>
              </div>
            </div>

            <p className="text-lg font-bold">
              Total for {quantity} kg:{' '}
              <span className="text-green-700">৳{totalPrice}</span>
            </p>
          </div>
        </div>

        {/* Stripe Checkout Form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            product={product}
            quantity={quantity}
            totalPrice={totalPrice}
          />
        </Elements>
      </motion.div>
    </div>
  );
};

export default Payment;
