import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash } from 'react-icons/fi';
import useMyProducts from '../hooks/useMyProducts';
import UpdateProductModal from '../Component/Shared Comonent/Modals/UpdateProductModal';
import DeleteProductModal from '../Component/Shared Comonent/Modals/DeleteProductModal';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import { MdProductionQuantityLimits } from 'react-icons/md';
import NoContent from '../Component/Shared Comonent/NoContent/NoContent';
import { CiCircleQuestion } from "react-icons/ci";

// Rejection reason modal component
const RejectionReasonModal = ({ isOpen, setIsOpen, reason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
          🛑 Rejection Reason
        </h2>
        <p className="text-gray-700">{reason}</p>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const MyProducts = () => {
  const { products, isLoading, deleteProduct, updateProduct } = useMyProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteProduct.mutate(selectedProduct._id);
  };

  const handleUpdateSubmit = (updatedDoc) => {
    updateProduct.mutate({
      id: selectedProduct._id,
      updatedProduct: updatedDoc,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (products.length === 0) {
    return (
      <div className="min-h-screen">
        <NoContent
          message="No products found."
          icon={MdProductionQuantityLimits}
          showAction
          actionLabel="Add Product"
          onActionClick={() => navigate('/dashboard/add-product')}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Products
        </motion.h2>

        <div className="overflow-x-auto rounded-lg shadow-md border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-yellow-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Item Name</th>
                <th className="px-4 py-3">Price/Unit</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <motion.tr
                  key={product._id}
                  className="border-t hover:bg-yellow-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-4 py-3">{product.itemName}</td>
                  <td className="px-4 py-3">{product.unitPrice} ৳</td>
                  <td className="px-4 py-3">{product.marketName}</td>
                  <td className="px-4 py-3">
                    {new Date(product.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded flex items-center gap-1 w-fit cursor-pointer ${
                        product.status === 'approved'
                          ? 'bg-green-200 text-green-800'
                          : product.status === 'rejected'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                      onClick={() => {
                        if (product.status === 'rejected') {
                          setRejectionReason(product.feedback || 'No reason provided.');
                          setIsRejectionModalOpen(true);
                        }
                      }}
                      title={product.status === 'rejected' ? 'Click to view reason' : ''}
                    >
                      {product.status}
                      {product.status === 'rejected' && <CiCircleQuestion className="text-base" />}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsUpdateOpen(true);
                      }}
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteOpen(true);
                      }}
                      className="text-red-600 cursor-pointer hover:text-red-800"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {selectedProduct && (
          <>
            <UpdateProductModal
              isOpen={isUpdateOpen}
              setIsOpen={setIsUpdateOpen}
              handleUpdateSubmit={handleUpdateSubmit}
              defaultData={selectedProduct}
            />
            <DeleteProductModal
              isOpen={isDeleteOpen}
              setIsOpen={setIsDeleteOpen}
              onConfirm={handleDelete}
            />
          </>
        )}

        <RejectionReasonModal
          isOpen={isRejectionModalOpen}
          setIsOpen={setIsRejectionModalOpen}
          reason={rejectionReason}
        />
      </div>
    </div>
  );
};

export default MyProducts;
