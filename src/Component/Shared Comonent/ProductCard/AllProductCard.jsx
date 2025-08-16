import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

const AllProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const latestPrice = product?.prices?.[product.prices.length - 1];
  const handleViewDetails = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/productDetails/${product._id}`);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-base-200 rounded-2xl shadow-md overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300 transition-colors"
      initial={{ opacity: 0, x: 50, y: -50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.itemName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {product.itemName}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💵 Price: {product.unitPrice || 'N/A'} ৳
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📅 Date: {product?.date?.slice(0, 10)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🏪 Market: {product.marketName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          👨‍🌾 Vendor: {product.vendorName}
        </p>

        <div className="pt-2">
          <button
            onClick={handleViewDetails}
            className="inline-block px-4 py-2 rounded-xl 
                       bg-[#FBD536] text-black dark:text-white 
                       hover:bg-white dark:hover:bg-gray-700 
                       hover:border border-[#fbd536] 
                       font-medium text-sm cursor-pointer 
                       transition-colors duration-300"
          >
            🔍 View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllProductCard;
