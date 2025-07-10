import { Dialog } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';

const DeleteProductModal = ({ isOpen, setIsOpen, onConfirm }) => {
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" />
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
         

          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800 text-center">
            Confirm Delete
          </Dialog.Title>

          <p className="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteProductModal;
