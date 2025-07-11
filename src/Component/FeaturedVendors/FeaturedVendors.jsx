import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import useFeaturedVendors from '../../hooks/useFeaturedVendors';

const FeaturedVendors = () => {
  const navigate = useNavigate();
  const { data: vendors = [], isLoading, isError } = useFeaturedVendors();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load vendors</p>;

  return (

      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor._id}
            initial={{ opacity: 0, x: 100, y: -100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center text-center space-y-3 border border-[#f6de7d]"
          >
            <img
              src={vendor.profilePhoto}
              alt={vendor.vendorName}
              className="w-24 h-24 object-cover rounded-full border-4 border-[#FBD536]"
            />
            <h3 className="text-lg font-semibold">{vendor.vendorName}</h3>
            <div>
                <h3 className="text-lg font-semibold">{vendor.shopName}</h3>
            <p className="text-sm text-gray-600">{vendor.location}</p>
            </div>
            <button
              className="px-4 py-2 bg-[#FBD536] hover:bg-yellow-400 rounded-full font-semibold"
              onClick={() => navigate(`/allproduct`)}
            >
              View Products
            </button>
          </motion.div>
        ))}
      </div>
  );
};

export default FeaturedVendors;
