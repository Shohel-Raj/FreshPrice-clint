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
      className={`flex flex-col min-h-screen items-center justify-center text-center  rounded-xl bg-[#F9EDE1] shadow-inner ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Icon size={70} className="text-6xl text-[#FBD536] mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-gray-700">{message}</h2>

      {showAction && (
        <button
          onClick={onActionClick}
          className="mt-4 px-4 py-2 bg-[#FBD536] cursor-pointer text-white rounded-full hover:bg-yellow-500 transition"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};


export default NoContent;
