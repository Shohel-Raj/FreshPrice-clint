import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserTable = ({ users, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-[#FBD536] font-medium">
        Loading users...
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center flex justify-center items-center text-2xl min-h-[calc(100vh-150px)] text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-x-auto bg-white shadow-md rounded-lg"
    >
      <table className="min-w-full table-auto">
        <thead className="bg-[#FBD536] text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="border-b hover:bg-yellow-50 transition duration-150"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{user.name || 'N/A'}</td>
              <td className="py-3 px-4">{user.email}</td>

              <td
                className={`py-3 px-4 capitalize font-medium ${
                  user.role === 'admin'
                    ? 'text-red-600'
                    : user.role === 'vendor'
                    ? 'text-green-600'
                    : 'text-gray-700'
                }`}
              >
                {user.role}
              </td>

              <td
                className={`py-3 px-4 capitalize font-medium ${
                  user.status === 'inactive' ? 'text-gray-400' : 'text-blue-600'
                }`}
              >
                {user.status || 'active'}
              </td>

              <td className="py-3 px-4">
                <div className="flex justify-center items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(user)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(user)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </motion.button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default UserTable;
