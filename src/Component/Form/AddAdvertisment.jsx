import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { motion } from 'framer-motion';
import {
  MdOutlineCampaign, MdOutlineImage, MdOutlineTitle, MdOutlineInsertPhoto,
  MdOutlineDateRange, MdOutlineVisibility, MdOutlineAnnouncement,
  MdOutlineAttachMoney, MdOutlineTrendingUp, MdOutlineVerified,
} from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../api/utils';
import useAuth from '../../hooks/useAuth';

const AddAdvertisement = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [vendorInfo, setVendorInfo] = useState(null);

  // Get vendor details
  useEffect(() => {
    const getVendorData = async () => {
      try {
        const { data } = await axiosSecure.get(`/featured-vendors/${user?.email}`);
        setVendorInfo(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load vendor data');
      }
    };
    if (user?.email) getVendorData();
  }, [user?.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.files[0];

    if (!title || !description || !image || !vendorInfo) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await imageUpload(image);

      const advertisement = {
        title,
        description,
        image: imageUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
        vendorEmail: user.email,
        vendorName: vendorInfo?.vendorName,
        marketName: vendorInfo?.location,
      };

      const res = await axiosSecure.post(`/advertisements`, advertisement);
      if (res.data.insertedId) {
        toast.success('Advertisement submitted for review!');
        form.reset();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit advertisement');
    } finally {
      setLoading(false);
    }
  };

  const icons = [
    { icon: MdOutlineCampaign, className: 'top-10 left-5', color: 'text-red-300', delay: 0 },
    { icon: MdOutlineImage, className: 'bottom-16 right-10', color: 'text-orange-400', delay: 1 },
    { icon: MdOutlineTitle, className: 'top-24 right-24', color: 'text-pink-400', delay: 2 },
    { icon: MdOutlineInsertPhoto, className: 'top-12 right-10', color: 'text-yellow-300', delay: 3 },
    { icon: MdOutlineDateRange, className: 'bottom-20 left-12', color: 'text-green-300', delay: 4 },
    { icon: MdOutlineVisibility, className: 'top-1/2 left-5', color: 'text-blue-300', delay: 5 },
    { icon: MdOutlineAnnouncement, className: 'bottom-5 right-1/4', color: 'text-purple-300', delay: 6 },
    { icon: MdOutlineAttachMoney, className: 'top-1/4 left-1/3', color: 'text-emerald-300', delay: 7 },
    { icon: MdOutlineTrendingUp, className: 'top-1/3 right-1/3', color: 'text-indigo-300', delay: 8 },
    { icon: MdOutlineVerified, className: 'bottom-1/4 left-1/4', color: 'text-teal-300', delay: 9 },
  ];

  return (
    <div className='relative flex justify-center items-center min-h-screen px-4' style={{ backgroundColor: '#F9EDE1' }}>
      {/* Animated background icons */}
      {icons.map(({ icon: Icon, className, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${className} text-5xl ${color} opacity-20`}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6 + delay, repeat: Infinity }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Form */}
      <div className='max-w-xl w-full bg-white p-8 rounded-lg shadow-md z-10'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Add Advertisement</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Ad Title */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Ad Title</label>
            <input
              type='text'
              name='title'
              placeholder='Enter Ad Title'
              required
              className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-900 focus:outline-[#FBD536]'
            />
          </div>

          {/* Short Description */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Short Description</label>
            <textarea
              name='description'
              placeholder='Write a brief description'
              rows='3'
              required
              className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-900 focus:outline-[#FBD536]'
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Promotional Image</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              required
              className='w-full px-3 py-2 file:border-0 file:rounded file:bg-[#FBD536] file:text-black file:px-2 file:cursor-pointer bg-gray-100 text-gray-900'
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              disabled={loading || !vendorInfo}
              className='bg-[#FBD536] w-full hover:bg-white hover:border hover:border-amber-400 cursor-pointer rounded-md py-3 font-medium'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit Advertisement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdvertisement;
