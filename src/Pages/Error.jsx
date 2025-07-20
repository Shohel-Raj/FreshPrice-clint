import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoPlayBackSharp } from 'react-icons/io5';
import { Link } from 'react-router';

const ErrorPage = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Error`;
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#F9EDE1] px-4 py-10">
      <div className="flex flex-col items-center text-center space-y-6 max-w-xl">
        {/* Error Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 uppercase"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.05 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Error Subtext */}
        <motion.p
          className="text-gray-600 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          It looks like the page you're looking for doesn't exist or is currently unavailable. <br />
          Try again later or head back to the homepage.
        </motion.p>

        {/* Go Back Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#FBD536] text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 transition"
          >
            <IoPlayBackSharp size={20} /> Back to homepage
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ErrorPage;
