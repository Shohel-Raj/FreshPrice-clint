import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';

const AllAds = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  // ✅ Fetch Ads
  const { data, isLoading } = useQuery({
    queryKey: ['allAdvertisements', { page, filterStatus }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads?page=${page}&limit=${limit}&status=${filterStatus}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const ads = data?.ads || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // ✅ Update Status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.put(`/ads/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Status updated!');
      queryClient.invalidateQueries(['allAdvertisements']);
    },
    onError: () => toast.error('Failed to update status'),
  });

  // ✅ Delete Ad
  const deleteAd = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/ads/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Ad deleted!');
      queryClient.invalidateQueries(['allAdvertisements']);
    },
    onError: () => toast.error('Failed to delete ad'),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.h2 className="text-3xl font-semibold mb-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        📢 All Advertisements
      </motion.h2>

      {/* Filter */}
      <div className="mb-4 flex gap-3 items-center">
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-yellow-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Market</th>
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-t hover:bg-yellow-50">
                <td className="px-4 py-2">{ad.title}</td>
                <td className="px-4 py-2">{ad.marketName}</td>
                <td className="px-4 py-2">{ad.vendorName}</td>
                <td className="px-4 py-2">
                  <img src={ad.image} alt="ad" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={ad.status}
                    onChange={(e) =>
                      updateStatus.mutate({ id: ad._id, status: e.target.value })
                    }
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() => {
                      if (confirm('Delete this ad?')) {
                        deleteAd.mutate(ad._id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                  {ad.status !== 'approved' && (
                    <button
                      onClick={() =>
                        updateStatus.mutate({ id: ad._id, status: 'approved' })
                      }
                      className="text-green-600 hover:text-green-800"
                    >
                      <FiCheckCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllAds;
