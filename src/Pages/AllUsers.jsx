import React, { useState } from 'react';
import { FaSearch, FaUserFriends } from 'react-icons/fa';
import useAllUsers from '../hooks/useAllUsers';
import UserTable from '../Component/Table/UserTable';
import UpdateUserModal from '../Component/Shared Comonent/Modals/UpdateUserModal';
import DeleteUserModal from '../Component/Shared Comonent/Modals/DeleteUserModal';

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, refetch } = useAllUsers({ page, limit, search });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setSelectedUser(null);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <div className='flex justify-between'>
        <div className='flex gap-1.5 items-center'>
          <FaUserFriends size={30}/>
          <h1 className='font-bold text-2xl'>All Users</h1>
        </div>
        <div>
          <form
        onSubmit={handleSearch}
        className="mb-6 flex justify-center w-60"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-4 pr-14 py-3 rounded-full shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBD536] transition"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#FBD536] hover:bg-yellow-500 text-white p-2 rounded-full shadow transition"
          >
            <FaSearch />
          </button>
        </div>
      </form>
        </div>
      </div>
      


      {/* User Table */}
      <UserTable
        users={users}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-3 py-1 rounded-md transition font-medium ${page === num + 1
                  ? 'bg-[#FBD536] text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={closeModals}
          refetch={refetch}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={closeModals}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllUsers;
