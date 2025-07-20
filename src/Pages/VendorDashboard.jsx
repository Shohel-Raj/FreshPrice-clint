import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../Component/Shared Comonent/Container/Container';

const VendorDashboard = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Vendor Dashboard`;
  }, []);
  return (
    <div className="bg-[#F9EDE1] min-h-screen py-10 text-gray-800">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#FBD536]">Welcome, Vendor!</h1>
          <p className="text-gray-700 mt-2">Manage your market presence with ease.</p>
        </motion.div>

        {/* Quick Links / Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: 'Add New Product', bg: 'bg-white' },
            { label: 'My Products', bg: 'bg-white' },
            { label: 'Post Advertisement', bg: 'bg-white' },
            { label: 'My Advertisement', bg: 'bg-white' },
            // { label: 'View Orders', bg: 'bg-white' },
            // { label: 'Watchlist', bg: 'bg-white' },
            // { label: 'Settings', bg: 'bg-white' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${item.bg} p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition`}
            >
              <p className="font-semibold text-lg text-gray-800">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VendorDashboard;
