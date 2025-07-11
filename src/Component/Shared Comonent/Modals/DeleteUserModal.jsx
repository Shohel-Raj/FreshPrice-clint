import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const DeleteUserModal = ({ user, onClose,  }) => {


  const handleDelete = async () => {


      toast.success('Delete functionality added soon...');

      onClose();

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-red-500">Confirm Delete</h2>
        <p>Are you sure you want to delete:</p>
        <p className="my-2 font-medium text-gray-800">{user.name} ({user.email})</p>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteUserModal;
