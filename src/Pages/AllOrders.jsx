import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['orders', page, limit, status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/orders?page=${page}&limit=${limit}&status=${status}`);
      return res.data;
    },
  });

  const { orders = [], totalPages = 1 } = data || {};

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#333]">All Orders</h2>

      <div className="mb-4 flex items-center gap-4">
        <select
          value={status}
          onChange={e => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner/>
        </div>
      ) : (<>
          {
            orders.length ===0 ? <div className='min-h-[calc(100vh-150px)] flex items-center justify-center text-2xl text-gray-500 text-center'> No order Available</div> : (
        
        <div className="grid grid-cols-1 min-h-screen">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FBD536] text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">User Email</th>
                <th className="p-3">Image</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-[#F9EDE1]/50 transition-colors">
                  <td className="p-3 text-sm">{(page - 1) * limit + index + 1}</td>
                  <td className="p-3">{order.userEmail}</td>
                  <td className="p-3">
                    <img src={order.productImage} alt="Product" className="h-10 w-10 object-cover rounded" />
                  </td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">${order.totalPrice}</td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border cursor-pointer ${
                  page === i + 1 ? 'bg-[#FBD536] font-bold' : 'bg-white'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

            <div className="ml-4">
              <label className="mr-2 text-sm text-gray-600">Rows:</label>
              <select
                value={limit}
                onChange={e => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                {[5, 10, 15, 20].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          {isFetching && (
            <LoadingSpinner/>
          )}
        </div>
      )
          }
      </>)}
    </motion.div>
  );
};

export default AllOrders;
