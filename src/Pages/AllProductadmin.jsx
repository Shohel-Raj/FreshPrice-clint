import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';  // Spinner icon
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';

const AllProductAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // For reject modal & feedback
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Fetch products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allProductsAdmin', statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/products', {
        params: { status: statusFilter, page, limit },
      });
      return res.data;
    },
  });

  // Update status mutation (supports feedback)
  const updateStatus = useMutation({
    mutationFn: async ({ productId, newStatus, feedback }) => {
      const res = await axiosSecure.put(`/admin/products/${productId}`, {
        status: newStatus,
        feedback: feedback || '',
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product status updated');
      queryClient.invalidateQueries(['allProductsAdmin']);
      setShowRejectModal(false);
      setFeedbackText('');
    },
    onError: () => toast.error('Failed to update status'),
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product deleted');
      queryClient.invalidateQueries(['allProductsAdmin']);
    },
    onError: () => toast.error('Failed to delete product'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { products = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between mb-4 items-center gap-4">
        <h2 className="text-2xl font-semibold">🛒 All Products</h2>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-yellow-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => {
                const isUpdatingStatus =
                  updateStatus.isLoading && updateStatus.variables?.productId === product._id;
                const isDeleting =
                  deleteProduct.isLoading && deleteProduct.variables === product._id;

                return (
                  <tr key={product._id} className="border-t hover:bg-yellow-50">
                    <td className="px-4 py-3">{product.itemName}</td>
                    <td className="px-4 py-3">{product.vendorName}</td>
                    <td className="px-4 py-3">{product.marketName}</td>
                    <td className="px-4 py-3">{product.unitPrice}৳</td>
                    <td className="px-4 py-3">{new Date(product.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        disabled={updateStatus.isLoading}
                        value={product.status}
                        onChange={(e) =>
                          updateStatus.mutate({ productId: product._id, newStatus: e.target.value })
                        }
                        className={`border rounded px-2 py-1 ${
                          product.status === 'verified'
                            ? 'bg-green-100'
                            : product.status === 'rejected'
                            ? 'bg-red-100'
                            : 'bg-yellow-100'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected" disabled>Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-2">
                      {/* Delete with toast confirm */}
                      <button
                        disabled={isDeleting}
                        onClick={() =>
                          toast.custom((t) => (
                            <div className="bg-white border border-gray-300 p-4 rounded shadow-md flex flex-col items-center gap-3">
                              <p className="text-sm font-medium">
                                Are you sure you want to delete this product?
                              </p>
                              <div className="flex gap-4">
                                <button
                                  disabled={isDeleting}
                                  onClick={() => {
                                    deleteProduct.mutate(product._id, {
                                      onSuccess: () => toast.dismiss(t.id),
                                    });
                                  }}
                                  className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded flex items-center gap-2"
                                >
                                  {isDeleting && <TbFidgetSpinner className="animate-spin" />}
                                  Delete
                                </button>
                                <button
                                  onClick={() => toast.dismiss(t.id)}
                                  className="px-4 py-1 border rounded hover:bg-gray-100"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ))
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1"
                      >
                        {isDeleting && <TbFidgetSpinner className="animate-spin" />}
                        Delete
                      </button>

                      {/* Hide Reject button if already rejected */}
{product.status !== 'rejected' && (
  <button
    disabled={updateStatus.isLoading}
    onClick={() => {
      setSelectedProductId(product._id);
      setShowRejectModal(true);
    }}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Reject
  </button>
)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                i + 1 === page ? 'bg-[#FBD536] text-black' : 'bg-white text-gray-700'
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Reject Product</h3>
            <textarea
              rows="4"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter rejection feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              disabled={updateStatus.isLoading}
            ></textarea>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-1 rounded border"
                onClick={() => {
                  setShowRejectModal(false);
                  setFeedbackText('');
                }}
                disabled={updateStatus.isLoading}
              >
                Cancel
              </button>
              <button
                disabled={updateStatus.isLoading}
                className="px-4 py-1 bg-red-500 text-white rounded flex items-center gap-2 justify-center"
                onClick={() => {
                  if (!feedbackText.trim()) {
                    return toast.error('Feedback is required');
                  }
                  updateStatus.mutate({
                    productId: selectedProductId,
                    newStatus: 'rejected',
                    feedback: feedbackText.trim(),
                  });
                }}
              >
                {updateStatus.isLoading && <TbFidgetSpinner className="animate-spin" />}
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductAdmin;
