import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import {
  MdStorefront,
  MdLocalGroceryStore,
  MdDateRange,
  MdPriceCheck,
  MdDescription,
  MdImage,
  MdPerson,
  MdShoppingCart,
  MdAttachMoney,
  MdCategory,
  MdInventory,
  MdVerifiedUser,
} from 'react-icons/md'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { imageUpload } from '../../api/utils'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../Shared Comonent/LoadingSpinner/LoadingSpinner'
import useVendorInfo from '../../hooks/useVendorInfo'

const AddProduct = () => {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const { vendorInfo, isVendorInfoLoading } = useVendorInfo();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const form = e.target;
  const itemName = form.itemName.value.trim();
  // Get marketDescription from vendor object, NOT from form input
  const marketDescription = vendorInfo?.marketDescription || '';
  const itemDescription = form.itemDescription.value.trim();
  const unitPrice = parseFloat(form.unitPrice.value);
  const imageFile = form.image.files[0];


  // Validate inputs
  if (!itemName || !vendorInfo?.shopName || !marketDescription || isNaN(unitPrice) || unitPrice <= 0 || !imageFile) {
    toast.error('Please fill in all required fields');
    setLoading(false);
    return;
  }

  try {
    const imageUrl = await imageUpload(imageFile);

    const productData = {
      vendorEmail: user?.email,
      vendorName: user?.displayName || '',
      itemName,
      marketName: vendorInfo?.shopName,
      marketDescription,
      itemDescription,
      status: 'pending',
      image: imageUrl,
      unitPrice,
      date: selectedDate.toISOString().split('T')[0],
      prices: [{ date: selectedDate.toISOString().split('T')[0], price: unitPrice }],
      createdAt: new Date().toISOString(),
    };
    const res = await axiosSecure.post(`/products`, productData);
    if (res.data.insertedId) {
      toast.success('Product submitted for review!');
      form.reset();
      setSelectedDate(new Date());
    }
  } catch (err) {
    console.error(err);
    toast.error('Submission failed');
  } finally {
    setLoading(false);
  }
};

  const icons = [
    { icon: MdStorefront, className: 'top-10 left-5', color: 'text-red-300', delay: 0 },
    { icon: MdLocalGroceryStore, className: 'bottom-16 right-10', color: 'text-orange-400', delay: 1 },
    { icon: MdDateRange, className: 'top-24 right-24', color: 'text-yellow-400', delay: 2 },
    { icon: MdPriceCheck, className: 'top-12 right-10', color: 'text-green-400', delay: 3 },
    { icon: MdDescription, className: 'bottom-20 left-12', color: 'text-blue-400', delay: 4 },
    { icon: MdImage, className: 'top-1/4 left-1/3', color: 'text-emerald-400', delay: 5 },
    { icon: MdPerson, className: 'top-1/3 right-1/3', color: 'text-indigo-400', delay: 6 },
    { icon: MdShoppingCart, className: 'bottom-10 left-1/4', color: 'text-pink-400', delay: 7 },
    { icon: MdAttachMoney, className: 'top-20 right-1/4', color: 'text-teal-400', delay: 8 },
    { icon: MdCategory, className: 'bottom-16 left-20', color: 'text-purple-400', delay: 9 },
    { icon: MdInventory, className: 'top-14 left-1/3', color: 'text-cyan-400', delay: 10 },
    { icon: MdVerifiedUser, className: 'bottom-24 right-20', color: 'text-yellow-300', delay: 11 },
  ]

  if (isVendorInfoLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div className='relative py-2 flex justify-center items-center min-h-screen px-4' style={{ backgroundColor: '#F9EDE1' }}>
      {/* Animated Icons */}
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
        <h2 className='text-3xl font-bold mb-4 text-center text-gray-800'>Add Market Product</h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
          {/* Item Name */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Item Name</label>
            <input
              type='text'
              name='itemName'
              placeholder='e.g., Onion'
              required
              className='w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 border-gray-300 focus:outline-[#FBD536]'
            />
          </div>

          {/* Market Name (Auto-filled from Vendor) */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Market Name</label>
            <input
              type='text'
              name='marketName'
              value={vendorInfo?.shopName || ''}
              readOnly
              className='w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-[#FBD536]  border-gray-300 cursor-not-allowed'
            />
          </div>

          {/* Market Description */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Market Description</label>
            <textarea
              name='marketDescription'
              value={vendorInfo?.marketDescription || ''}
              placeholder='Location, establishment year, details...'
              rows='3'
              readOnly
              className='w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 cursor-not-allowed border-gray-300 focus:outline-[#FBD536]'
            ></textarea>
          </div>

          {/* Price Per Unit */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Price per Unit (e.g., ৳30)</label>
            <input
              type='number'
              name='unitPrice'
              step='0.01'
              required
              placeholder='Enter Price'
              className='w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 border-gray-300 focus:outline-[#FBD536]'
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className='w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 border-gray-300 focus:outline-[#FBD536]'
            />
          </div>

          {/* Optional Item Description */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Item Description (Optional)</label>
            <textarea
              name='itemDescription'
              rows='2'
              placeholder='Fresh, organic, high-quality...'
              className='w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 border-gray-300 focus:outline-[#FBD536]'
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className='block mb-2 text-sm font-medium'>Product Image</label>
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
              disabled={loading}
              className='bg-[#FBD536] w-full hover:bg-white hover:border hover:border-amber-400 cursor-pointer rounded-md py-3 font-medium'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
