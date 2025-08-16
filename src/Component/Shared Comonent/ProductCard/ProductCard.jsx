import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  const { marketName, products } = product;

  // Take first 4 items for preview list
  const items = products.slice(0, 4).map((p) => ({
    name: p.itemName,
    price: p.unitPrice,
  }));

  // For main image, pick random product image or fallback placeholder
  const image =
    products[Math.floor(Math.random() * products.length)]?.image || 'fallback';

  // For date, show the latest product date or empty
  const date = products[0]?.date || '';

  return (
    <motion.div
      className="rounded-2xl shadow-md bg-white dark:bg-base-200 overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300 transition-colors 
                 flex flex-col h-full"
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
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            🛒 {marketName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">📅 {date}</p>

          {/* Item List */}
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
            {items?.map((item, idx) => (
              <li key={idx}>
                <div className="flex justify-between">
                  <h1>{item.name}</h1>
                  <span className="font-medium">{item.price} ৳</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="pt-4 mt-auto">
          <Link
            to={`/allproduct`}
            className="inline-block px-4 py-2 rounded-xl 
                       bg-[#FBD536] text-black dark:text-white 
                       hover:bg-transparent hover:border 
                       border-amber-300 transition-colors duration-300"
          >
            🔍 View Products
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
