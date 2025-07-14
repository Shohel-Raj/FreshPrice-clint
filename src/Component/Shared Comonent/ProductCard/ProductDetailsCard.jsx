import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import { FaRegBookmark, FaBookmark, FaShoppingCart } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProductDetailsCard = () => {
  const { productId } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  if (isLoading) return <LoadingSpinner/>
  if (!product) return <p className="text-center items-center justify-center flex min-h-(calc(100vh-200px)) py-6 text-red-500"style={{ minHeight: 'calc(100vh - 280px)' }}>Product not found.</p>;

  const { marketName, image, date, items, vendor, comments } = product;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          🏪 {marketName}
        </h2>
        <p className="text-sm text-gray-500">📅 {date}</p>
      </div>

      {/* Image */}
      <div className="w-full h-64 rounded-xl overflow-hidden">
        <img
          src={image}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Items List */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">🥕 Item List:</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {items?.map((item, idx) => (
            <li key={idx}>
              🧅 {item.name} — <span className="font-medium">৳{item.price}/kg</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Vendor Info */}
      <div className="border-t pt-4 mt-4 text-sm text-gray-700">
        <p>
          👨‍🌾 Submitted by: <span className="font-semibold">{vendor?.vendorName}</span> ({vendor?.email})
        </p>
      </div>

      {/* User Comments */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold text-gray-700 mb-2">💬 User Reviews:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          {comments?.length > 0 ? (
            comments.map((c, i) => (
              <li key={i}>
                <span className="font-medium">{c.userName}:</span> {c.text}
              </li>
            ))
          ) : (
            <li>No comments yet.</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t mt-4">
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition 
            ${
              role === 'admin' || role === 'vendor'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FBD536] text-black hover:bg-black hover:text-white'
            }`}
          disabled={role === 'admin' || role === 'vendor'}
        >
          {role === 'admin' || role === 'vendor' ? <FaBookmark /> : <FaRegBookmark />}
          {role === 'admin' || role === 'vendor' ? 'Watchlist Disabled' : 'Add to Watchlist'}
        </button>

        <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium">
          <FaShoppingCart />
          Buy Product
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetailsCard;
