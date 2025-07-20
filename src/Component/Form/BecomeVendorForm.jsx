import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import useVendorApplied from '../../hooks/useVendorApplied'

const BecomeVendorForm = () => {
  const { user } = useAuth()
  const { applyAsVendor } = useVendorApplied();
  useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Become vendor`;
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      vendorName: user?.displayName || '',
      email: user?.email || '',
      profilePhoto: user?.photoURL || '',
    }
  })

  const onSubmit = async (data) => {
    const vendorRequest = {
      vendorName: data.vendorName,
      email: data.email,
      marketDescription:data.marketDescription,
      shopName: data.shopName,
      location: data.location,
      profilePhoto: data.profilePhoto || user?.photoURL,
      vendorStatus: 'pending',
      createdAt: new Date()
    }
    await applyAsVendor(vendorRequest);

    reset()
  }

  return (
    <div className='bg-[#f9ede1] min-h-screen '>
      <div className="max-w-2xl mx-auto  p-6 bg-white shadow rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Become a Vendor</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Vendor Name (Pre-filled) */}
          <div>
            <label className="block mb-1 font-medium">Vendor Name</label>
            <input
              {...register('vendorName')}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Email (Pre-filled) */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Shop Name */}
          <div>
            <label className="block mb-1 font-medium">Shop Name</label>
            <input
              {...register('shopName', { required: true })}
              placeholder="e.g., Krishi Katha"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Shop Location</label>
            <input
              {...register('location', { required: true })}
              placeholder="e.g., Sylhet Bondor Bazar"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
            />
          </div>
          {/* market Description */}
          <div>
            <label className="block mb-1 font-medium">Market Description</label>
            <input
              {...register('marketDescription', { required: true })}
              placeholder="e.g., etablish ,market type "
              className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
            />
          </div>

          {/* Profile Photo URL (Hidden) */}
          <input type="hidden" {...register('profilePhoto')} />

          {/* Profile Preview */}
          <div>
            <label className="block mb-1 font-medium">Your Profile Photo</label>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="h-28 w-28 object-cover rounded-full border"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>

  )
}

export default BecomeVendorForm
