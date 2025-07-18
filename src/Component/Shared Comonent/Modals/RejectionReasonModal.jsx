import React from 'react';

const RejectionReasonModal = ({ isOpen, setIsOpen, reason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4 text-red-600">🛑 Rejection Reason</h2>
        <p className="text-gray-700">{reason}</p>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RejectionReasonModal;
