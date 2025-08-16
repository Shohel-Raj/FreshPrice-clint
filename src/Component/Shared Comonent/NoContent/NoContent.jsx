import React from 'react';
import { motion } from 'framer-motion';
import { MdSentimentDissatisfied } from 'react-icons/md'; // Default icon

const NoContent = ({
  message = 'No content available.',
  icon: Icon = MdSentimentDissatisfied,
  showAction = false,
  actionLabel = 'Go Back',
  onActionClick = null,
  className = '',
}) => {
  return (
    <motion.div
      className={`flex flex-col min-h-screen items-center justify-center text-center rounded-xl 
        bg-[#F9EDE1] dark:bg-base-200 shadow-inner transition-colors ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Icon */}
      <Icon size={70} className="text-[#FBD536] mb-4" />

      {/* Message */}
      <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
        {message}
      </h2>

      {/* Action Button */}
      {showAction && (
        <button
          onClick={onActionClick}
          className="mt-4 px-4 py-2 bg-[#FBD536] cursor-pointer text-black dark:text-white 
            rounded-full hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default NoContent;
