import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateVendorStatusModal = ({ vendor, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(vendor.vendorStatus);

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/admin/vendor/status/${vendor._id}`, {
        status,
      });
      toast.success(res.data.message || 'Status updated');
      refetch();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to update status');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#333]">Vendor Details & Status Update</h2>

        {/* Vendor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Vendor Name</label>
            <p className="bg-gray-100 p-2 rounded">{vendor.vendorName}</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <p className="bg-gray-100 p-2 rounded">{vendor.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Shop Name</label>
            <p className="bg-gray-100 p-2 rounded">{vendor.shopName}</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Location</label>
            <p className="bg-gray-100 p-2 rounded">{vendor.location}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Market Description</label>
            <p className="bg-gray-100 p-2 rounded">{vendor.marketDescription}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Profile Photo</label>
            <img
              src={vendor.profilePhoto}
              alt={vendor.vendorName}
              className="w-32 h-32 rounded-full object-cover border mt-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Created At</label>
            <p className="bg-gray-100 p-2 rounded">{new Date(vendor.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Status Update */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-1">Change Status</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded bg-[#FBD536] text-white font-semibold hover:bg-yellow-500"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendorStatusModal;
