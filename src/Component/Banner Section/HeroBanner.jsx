import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const HeroBanner = () => {
  return (
    <div
      className="hero min-h-[65vh] md:min-h-[75vh]  overflow-hidden"
      style={{
        backgroundImage: "url('/freshPrice_Banner.jpg')",
      }}
    >
      <div className="hero-overlay bg-opacity-60 "></div>

      <motion.div
        className="hero-content text-neutral-content text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">
            Fresh Local Prices at Your Fingertips
          </h1>
          <p className="mb-6 text-base md:text-lg">
            Compare real-time prices from nearby markets and buy fresh produce directly from local vendors. 
            Save time, spend smart, and support your community.
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              to="/"
              className="btn btn-outline bg-white text-black rounded-xl transition-all duration-300 ease-in-out hover:bg-[#fbd536] hover:scale-105"
            >
              Browse Prices
            </Link>
            <Link
              to="/allproduct"
              className="btn bg-[#FBD536] text-black font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-white hover:scale-105"
            >
              Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
