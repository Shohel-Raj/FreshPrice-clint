import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import { imageUpload } from '../../../api/utils';

const UpdateAdModal = ({ isOpen, setIsOpen, handleUpdateSubmit, defaultData }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: defaultData,
  });

  const [previewImage, setPreviewImage] = useState(defaultData?.image || '');
  const [imgUrl, setImgUrl] = useState(defaultData?.image);

  useEffect(() => {
    reset(defaultData);
    setPreviewImage(defaultData?.image || '');
    setImgUrl(defaultData?.image || '');
  }, [defaultData, reset]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedUrl = await imageUpload(file);
      setPreviewImage(uploadedUrl);
      setImgUrl(uploadedUrl);
      setValue('image', uploadedUrl); // Store the URL in form state
    }
  };

  const handleFormSubmit = (data) => {
    const updateDoc = {
      title: data.title,
      description: data.description,
      image: imgUrl || defaultData.image,
      status: 'pending',
      updateAt: new Date(),
    };
    // handleUpdateSubmit(updateDoc);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" />
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 cursor-pointer bg-[#FBD536] rounded hover:text-red-500"
          >
            <IoMdClose size={25} />
          </button>

          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800">
            Update Advertisement
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <input
              {...register('title', { required: true })}
              placeholder="Ad Title"
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              {...register('description', { required: true })}
              placeholder="Short Description"
              className="w-full border rounded px-3 py-2"
            ></textarea>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#FBD536] file:text-black hover:file:bg-yellow-400"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded border"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded"
            >
              Update
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateAdModal;
