import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import toast from 'react-hot-toast'
import { imageUpload } from '../../../api/utils'

const UpdateProductModal = ({ isOpen, setIsOpen, handleUpdateSubmit, defaultData }) => {
  const { register, handleSubmit, reset, setValue } = useForm({ defaultValues: defaultData })
  const [previewImage, setPreviewImage] = useState(defaultData?.image || '')
  const [imgUrl, setImgUrl] = useState(defaultData?.image)

  useEffect(() => {
    reset(defaultData)
    setPreviewImage(defaultData?.image || '')
    setImgUrl(defaultData?.image || '')
  }, [defaultData, reset])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const uploadedUrl = await imageUpload(file)
      setPreviewImage(uploadedUrl)
      setImgUrl(uploadedUrl)
      setValue('image', uploadedUrl)
    }
  }

  const onSubmit = (data) => {

    const currentDate = data.date
  const currentPrice = parseFloat(data.unitPrice)

  const existingPrices = defaultData.prices || []

  const alreadyExists = existingPrices.some(
    (p) => p.date === currentDate && p.price === currentPrice
  )

  // Only add new price entry if it doesn't already exist with same value
  const updatedPrices = alreadyExists
    ? existingPrices
    : [...existingPrices, { date: currentDate, price: currentPrice }]

    const updatedDoc = {
      itemName: data.itemName,
      unitPrice: parseFloat(data.unitPrice),
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      itemDescription: data.itemDescription || '',
      date: data.date,
      image: imgUrl || defaultData.image,
      status: 'pending',
      updatedAt: new Date(),
      prices: updatedPrices,
    }
    handleUpdateSubmit(updatedDoc)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" />
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="relative bg-white rounded-lg w-full max-w-4xl shadow-lg max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <IoMdClose size={22} />
          </button>

          <div className="p-6">
            <Dialog.Title className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Update Product
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    {...register('itemName', { required: true })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                    placeholder="e.g., Onion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market Name</label>
                  <input
                    {...register('marketName', { required: true })}
                    placeholder="Market Name"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit (৳)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('unitPrice', { required: true })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    {...register('date', { required: true })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market Description</label>
                  <textarea
                    {...register('marketDescription', { required: true })}
                    rows="3"
                    placeholder="Market details..."
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Description (optional)</label>
                  <textarea
                    {...register('itemDescription')}
                    rows="2"
                    placeholder="e.g., Fresh, local..."
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 border-gray-300 focus:outline-[#FBD536]"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
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
              </div>

              {/* Submit Button Full Width */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded mt-2"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default UpdateProductModal
