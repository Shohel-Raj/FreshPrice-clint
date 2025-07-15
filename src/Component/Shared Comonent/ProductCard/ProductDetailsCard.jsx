import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaRegBookmark, FaBookmark, FaShoppingCart } from 'react-icons/fa';
import { FaAnglesUp } from 'react-icons/fa6';
import toast from 'react-hot-toast';
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







  if (isLoading) return <LoadingSpinner />;
  if (!product)
    return (
      <p className="text-center items-center justify-center flex min-h-[calc(100vh-200px)] py-6 text-red-500">
        Product not found.
      </p>
    );

  const {
    itemName,
    itemDescription,
    unitPrice,
    marketName,
    marketDescription,
    image,
    date,
    status,
    vendorName,
    vendorEmail,
    comments,
  } = product;

  return (
    <motion.div
      className="rounded-2xl shadow-xl p-6  mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">🏪 {marketName}</h2>
        <p className="text-sm text-gray-500">📅 {date}</p>
      </div>

      

      <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
        {/* Image */}
        <div className="w-full  rounded-xl overflow-hidden">
          <img
            src={image}
            alt={itemName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* content  */}
        <div className='grid basis-1'>
          {/* Product Info */}
          <div className="space-y-2 text-gray-700">
            <p className="text-sm italic text-gray-500">📍 {marketDescription}</p>
            <h3 className="text-xl font-semibold">🍖 {itemName}</h3>
            <p className="text-sm text-gray-600">{itemDescription}</p>
            <p>
              💰 Price: <span className="font-medium">৳{unitPrice} /kg</span>
            </p>
            <p>
              🏷️ Status:{" "}
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${status === 'Verified'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                  }`}
              >
                {status}
              </span>
            </p>
          </div>

          {/* Vendor Info */}
          <div className="border-t pt-4 mt-4 text-sm text-gray-700">
            <p>
              👨‍🌾 Submitted by: <span className="font-semibold">{vendorName}</span>{" "}
              ({vendorEmail})
            </p>
          </div>



          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t mt-4">
            {/* Watchlist Button */}
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition 
            ${role === 'admin' || role === 'vendor'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FBD536] text-black hover:bg-black hover:text-white'
                }`}
              disabled={role === 'admin' || role === 'vendor'}
            >
              {role === 'admin' || role === 'vendor' ? <FaBookmark /> : <FaRegBookmark />}
              {role === 'admin' || role === 'vendor' ? 'Watchlist Disabled' : 'Add to Watchlist'}
            </button>


            {/* Buy Button */}
            <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium">
              <FaShoppingCart />
              Buy Product
            </button>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ProductDetailsCard;
