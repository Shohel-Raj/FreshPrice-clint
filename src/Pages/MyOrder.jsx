import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import NoContent from '../Component/Shared Comonent/NoContent/NoContent';
import { BsCartX } from 'react-icons/bs'
const MyOrdersTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
     document.title = `${import.meta.env.VITE_site_name} | My Orders`
    if (!user?.email) return;

    axiosSecure
      .get(`/orders/${user.email}`)
      .then((res) => setOrders(res.data))
      .catch(() => toast.error('Failed to load orders'));
  }, [user?.email, axiosSecure]);

  if(orders.length===0){
    return <NoContent
     icon={BsCartX}
  message="You haven’t placed any orders yet. Explore products and shop now!"
  showAction={true}
  actionLabel="Start Shopping"
  onActionClick={() => navigate('/allproduct')}
    />
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-yellow-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Market Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <motion.tr
                key={order._id}
                className="border-t hover:bg-yellow-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-4 py-3">{order.productTitle || 'N/A'}</td>
                <td className="px-4 py-3">{order.Market || 'N/A'}</td>
                <td className="px-4 py-3">{order.totalPrice} ৳</td>
                <td className="px-4 py-3">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    to={`/productDetails/${order.productId}`}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-black text-sm"
                  >
                    View Details
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersTable;
