import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash } from 'react-icons/fi';
import useMyAdvertisements from '../hooks/useMyAdvertisements';
import UpdateAdModal from '../Component/Shared Comonent/Modals/UpdateAdModal';
import DeleteAdModal from '../Component/Shared Comonent/Modals/DeleteAdModal';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router';
import { MdOutlineCampaign } from 'react-icons/md';
import NoContent from '../Component/Shared Comonent/NoContent/NoContent';


const MyAdds = () => {
  const { ads, isLoading, deleteAd, updateAd } = useMyAdvertisements();
  const [selectedAd, setSelectedAd] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpdateSubmit = (updateDoc) => {
    updateAd.mutate({ id: selectedAd._id, updatedAd: updateDoc });
  };

  const handleDelete = () => {
    deleteAd.mutate(selectedAd._id);
  };

  if (isLoading) return <LoadingSpinner/>;
if (ads.length === 0) {
    return (
      <div className="min-h-screen">
        <NoContent
          message="No Ads found."
          icon={MdOutlineCampaign}
          showAction
          actionLabel="Add Ads"
          onActionClick={() => navigate('/dashboard/add-advertisement')}
        />
      </div>
    );
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-semibold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Advertisements
      </motion.h2>

      <div className="overflow-x-auto rounded-lg shadow-md border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-yellow-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Ad Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <motion.tr
                key={ad._id}
                className="border-t hover:bg-yellow-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-4 py-3">{ad.title}</td>
                <td className="px-4 py-3">{ad.description}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded">
                    {ad.status || 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedAd(ad);
                      setIsUpdateOpen(true);
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAd(ad);
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
      {selectedAd && (
        <>
          <UpdateAdModal
            isOpen={isUpdateOpen}
            setIsOpen={setIsUpdateOpen}
            handleUpdateSubmit={handleUpdateSubmit}
            defaultData={selectedAd}
          />
          <DeleteAdModal
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default MyAdds;
