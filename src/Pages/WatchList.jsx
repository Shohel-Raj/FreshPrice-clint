import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
import { FiTrash } from 'react-icons/fi';
import { FaPlus, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import NoContent from '../Component/Shared Comonent/NoContent/NoContent';


const WatchList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [watchlist, setWatchlist] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
     const navigate =useNavigate();
     useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | WatchList`;
  }, []);
    
    // Fetch user's watchlist
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/watchlist/${user.email}`)
                .then((res) => setWatchlist(res.data))
                .catch(() => toast.error('Failed to load watchlist'));
        }
    }, [user?.email, axiosSecure]);

    // Handle remove
    const handleRemove = async () => {
        try {
            await axiosSecure.delete(`/watchlist/${user.email}/${selectedProductId}`);
            setWatchlist(watchlist.filter((item) => item.productId !== selectedProductId));
            toast.success('Item removed from watchlist');
        } catch (error) {
            toast.error('Failed to remove item');
        } finally {
            setSelectedProductId(null);
        }
    };

    
  if(watchlist.length===0){
    return <NoContent
     icon={FaRegHeart}
  message="You haven’t placed any orders yet. Explore products and shop now!"
  showAction={true}
  actionLabel="Start Shopping"
  onActionClick={() => navigate('/allproduct')}
    />
  }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">📋 My Watchlist</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-yellow-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Item Name</th>
                            <th className="px-4 py-3">Market</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.map((entry) => (
                            <motion.tr
                                key={entry._id}
                                className="border-t hover:bg-yellow-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <td className="px-4 py-3">{entry.product?.itemName || 'N/A'}</td>
                                <td className="px-4 py-3">{entry.product?.marketName || 'N/A'}</td>
                                <td className="px-4 py-3">
                                    {new Date(entry.addedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 flex justify-center gap-4">
                                    <Link to="/allproduct">
                                        <button
                                            className="text-yellow-600 hover:text-yellow-800 text-base"
                                            title="Add More"
                                        >
                                            <FaPlus />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setSelectedProductId(entry.productId)}
                                        className="text-red-600 hover:text-red-800 text-base"
                                        title="Remove from Watchlist"
                                    >
                                        <FiTrash />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                        {watchlist.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-6">
                                    No items in your watchlist yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {selectedProductId && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Remove from Watchlist?</h3>
                        <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedId(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemove}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Confirm Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchList;
