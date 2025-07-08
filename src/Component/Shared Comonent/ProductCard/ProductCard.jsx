import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  const { image, marketName, date, items, id } = product;

  return (
    <motion.div
      className="rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={marketName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          🛒 {marketName}
        </h3>
        <p className="text-sm text-gray-500">📅 {date}</p>

        {/* Item List */}
        <ul className="text-sm text-gray-700 space-y-1 mt-2">
          {items.slice(0, 4).map((item, idx) => (
            <li key={idx}>
              🧅 {item.name} — <span className="font-medium">৳{item.price}/kg</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="pt-4">
          <Link
            to={`/product/${id}`}
            className="inline-block px-4 py-2 rounded-xl bg-[#FBD536] text-black font-medium text-sm hover:bg-black hover:text-white transition-colors duration-300"
          >
            🔍 View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
