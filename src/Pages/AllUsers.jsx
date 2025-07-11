import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
// import usePaginatedUsers from '../hooks/usePaginatedUsers';
import UpdateUserModal from '../Component/Shared Comonent/Modals/UpdateUserModal';
import DeleteUserModal from '../Component/Shared Comonent/Modals/DeleteUserModal';
import usePaginatedUsers from '../hooks/usePaginatedUsers';
// import UpdateUserModal from './UpdateUserModal';
// import DeleteUserModal from './DeleteUserModal';

const roleIcons = {
  admin: <FaUserShield className="text-blue-600 text-lg" />,
  vendor: <FaUserTie className="text-green-600 text-lg" />,
  buyer: <FaUser className="text-gray-600 text-lg" />,
};

const AllUsersPaginated = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isFetching, refetch } = usePaginatedUsers(page, limit);
  const { users = [], totalPages = 1 } = data || {};

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#333]">All Users</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-md text-[#FBD536]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 min-h-screen">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FBD536] text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-[#F9EDE1]/50 transition-colors">
                  <td className="p-3 font-semibold text-sm">{(page - 1) * limit + index + 1}</td>
                  <td className="p-3">{user.name || 'N/A'}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${user.status === 'verified' || user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : user.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : user.status === 'not-verified' || user.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'}
    `}>
                      {user.status || 'unknown'}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    {roleIcons[user.role] || <FaUser className="text-gray-600" />}
                    <span className="capitalize">{user.role || 'N/A'}</span>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 cursor-pointer hover:underline mr-2"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUpdateModal(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-500 cursor-pointer hover:underline"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border cursor-pointer ${page === i + 1 ? 'bg-[#FBD536] font-bold' : 'bg-white'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

            <div className="ml-4">
              <label className="mr-2 text-sm text-gray-600">Rows per page:</label>
              <select
                value={limit}
                onChange={handleLimitChange}
                className="border px-2 py-1 rounded"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          {isFetching && (
            <div className="text-sm text-gray-400 text-center mt-2">Loading page...</div>
          )}

          {showUpdateModal && selectedUser && (
            <UpdateUserModal
              user={selectedUser}
              onClose={() => setShowUpdateModal(false)}
              refetch={refetch}
            />
          )}

          {showDeleteModal && selectedUser && (
            <DeleteUserModal
              user={selectedUser}
              onClose={() => setShowDeleteModal(false)}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AllUsersPaginated;
