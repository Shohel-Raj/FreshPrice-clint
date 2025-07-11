import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
// import { axiosSecure } from '../hooks/useAxiosSecure';

const UpdateUserModal = ({ user, onClose, refetch }) => {
  const [role, setRole] = useState(user.role);

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/users/${user._id}`, { role });
      toast.success('User role updated successfully!');
      refetch();
      onClose();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Update Role</h2>
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>

        <label className="block mb-2 font-medium">Select Role:</label>
        <select
          className="w-full border rounded p-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleUpdate} className="bg-[#FBD536] px-4 py-2 rounded font-semibold">
            Update
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateUserModal;
