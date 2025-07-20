import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import usePaginatedVendors from '../hooks/usePaginatedVendors';
import UpdateVendorStatusModal from '../Component/Shared Comonent/Modals/UpdateVendorStatusModal';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
// import UpdateVendorStatusModal from '../Shared Comonent/Modals/UpdateVendorStatusModal';
// import usePaginatedVendors from '../../hooks/usePaginatedVendors';

const statusOptions = ['all', 'pending', 'verified', 'rejected'];

const AllVendorsPaginated = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  useEffect(() => {
      document.title = `${import.meta.env.VITE_site_name} | Vendor`;
    }, []);

  const { data, isLoading, isFetching, refetch } = usePaginatedVendors(page, limit, statusFilter);
  const { vendors = [], totalPages = 1 } = data || {};

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#333]">All Vendors</h2>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full cursor-pointer ${
                statusFilter === status ? 'bg-[#FBD536] font-bold' : 'bg-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <label className="text-sm mr-2 text-gray-600">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 15, 20].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-md text-[#FBD536]" />
        </div>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead className="bg-[#FBD536] text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Shop</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id} className="border-b hover:bg-[#F9EDE1]/50 transition-colors">
                  <td className="p-3 text-sm font-semibold">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="p-3">
                    <img
                      src={vendor.profilePhoto}
                      alt={vendor.vendorName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{vendor.vendorName}</td>
                  <td className="p-3">{vendor.email}</td>
                  <td className="p-3">{vendor.shopName}</td>
                  <td className="p-3">{vendor.location}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${vendor.vendorStatus === 'verified'
                        ? 'bg-green-100 text-green-700'
                        : vendor.vendorStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'}`}>
                      {vendor.vendorStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setSelectedVendor(vendor);
                        setShowUpdateModal(true);
                      }}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  page === i + 1 ? 'bg-[#FBD536] font-bold' : 'bg-white'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {isFetching && (
            <LoadingSpinner/>
          )}
        </>
      )}

      {/* Modal */}
      {showUpdateModal && selectedVendor && (
        <UpdateVendorStatusModal
          vendor={selectedVendor}
          onClose={() => setShowUpdateModal(false)}
          refetch={refetch}
        />
      )}
    </motion.div>
  );
};

export default AllVendorsPaginated;
