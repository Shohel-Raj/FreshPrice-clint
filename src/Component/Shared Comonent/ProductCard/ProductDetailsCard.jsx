import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaRegBookmark, FaBookmark, FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useRole from '../../../hooks/useRole';

const ProductDetailsCard = () => {
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, } = useAuth();
  const [role ,setRole]=useState('')
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  const [alreadyWatchlisted, setAlreadyWatchlisted] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  // 🔍 Check watchlist status on load
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user || !product?._id) return;
      try {
        const res = await axiosSecure.get(`/watchlist/check/${user.email}/${product._id}`);
        setAlreadyWatchlisted(res.data.exists);
      } catch (err) {
        console.error('Watchlist check failed:', err);
      }
      const result =await axiosSecure(`/user/role/${user?.email}`)
      setRole(result.data.role);

    };
    checkWatchlist();
  }, [user, product, axiosSecure]);

  // ⭐ Handle Add to Watchlist
  const handleAddToWatchlist = async () => {
    if (!user || alreadyWatchlisted) return;

    setWatchlistLoading(true);
    try {
      const res = await axiosSecure.post('/watchlist/add', {
        userEmail: user.email,
        productId: product._id,
      });

      if (res.data?.insertedId) {
        toast.success('⭐ Added to watchlist!');
        setAlreadyWatchlisted(true);
      } else if (res.data?.message === 'Already in watchlist') {
        toast('Already in watchlist');
      }
    } catch (err) {
      toast.error('Failed to add to watchlist');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleBuy = () => {
    navigate(`/payment/${product._id}`);
  };

  if (isLoading ) return <LoadingSpinner />;
  if (!product)
    return (
      <p className="text-center items-center justify-center flex min-h-[calc(100vh-200px)] py-6 text-red-500">
        Product not found.
      </p>
    );

  const {
    itemName,
    itemDescription,
    unitPrice,
    marketName,
    marketDescription,
    image,
    date,
    status,
    vendorName,
    vendorEmail,
    comments,
  } = product;

  const isDisabled = role === 'admin' || role === 'vendor' || alreadyWatchlisted;
  return (
    <motion.div
      className="rounded-2xl shadow-xl p-6 mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">🏪 {marketName}</h2>
        <p className="text-sm text-gray-500">📅 {date}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Image */}
        <div className="w-full rounded-xl overflow-hidden">
          <img
            src={image}
            alt={itemName}
            className="w-full max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* content */}
        <div className="grid basis-1">
          {/* Product Info */}
          <div className="space-y-2 text-gray-700">
            <p className="text-sm italic text-gray-500">📍 {marketDescription}</p>
            <h3 className="text-xl font-semibold">🍖 {itemName}</h3>
            <p className="text-sm text-gray-600">{itemDescription}</p>
            <p>
              💰 Price: <span className="font-medium">৳{unitPrice} /kg</span>
            </p>
            <p>
              🏷️ Status:{' '}
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                  status === 'Verified'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {status}
              </span>
            </p>
          </div>

          {/* Vendor Info */}
          <div className="border-t pt-4 mt-4 text-sm text-gray-700">
            <p>
              👨‍🌾 Submitted by: <span className="font-semibold">{vendorName}</span> ({vendorEmail})
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t mt-4">
            {/* Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border font-medium text-sm transition ${
                isDisabled || watchlistLoading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                  : 'bg-[#FBD536] text-black hover:bg-yellow-400 border-[#fbd536]'
              }`}
              disabled={isDisabled || watchlistLoading}
            >
              {alreadyWatchlisted ? <FaBookmark /> : <FaRegBookmark />}
              {alreadyWatchlisted
                ? 'In Watchlist'
                : role === 'admin' || role === 'vendor'
                ? 'Watchlist Disabled'
                : 'Add to Watchlist'}
            </button>

            {/* Buy Button */}
            <button
              onClick={handleBuy}
              className="px-4 py-2 rounded-lg flex items-center gap-2 text-black btn-outline btn hover:bg-[#fbd536] border-[#fbd536] transition text-sm font-medium"
            >
              <FaShoppingCart />
              Buy Product
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsCard;
