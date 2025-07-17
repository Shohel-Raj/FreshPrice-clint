import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ReviewSection = ({ productId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  // 🔄 Load existing reviews
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  // ➕ Submit review
  const onSubmit = async (data) => {
    if (!rating) return toast.error('Please select a star rating');

    const review = {
      productId,
      userName: user.displayName,
      userEmail: user.email,
      rating,
      comment: data.comment,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/reviews', review);
      if (res.data.insertedId) {
        toast.success('Review submitted!');
        reset();
        setRating(0);
        refetch(); // 🔁 refresh review list
      }
    } catch {
      toast.error(' Failed to submit review.');
    }
  };

  return (
    <div className="mt-8">
      {/* 📝 Review Form */}
      <div className='p-1.5 shadow text-center mb-2 rounded-2xl'>
        <h1 className='uppercase text-2xl font-bold'>Your openion matter</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`cursor-pointer text-center text-2xl ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        <textarea
          {...register('comment')}
          className="w-full border p-2 rounded-md"
          placeholder="Write your thoughts about the price..."
          rows={3}
        />

        <button
          type="submit"
          className="bg-[#FBD536] px-4 py-2 text-sm rounded-md text-black font-medium"
        >
          Submit Review
        </button>
      </form>
      </div>
      

      {/* 💬 Review List */}
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="p-3 border rounded-md bg-white">
              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  {r.userName} ({r.userEmail})
                </p>
                <p>{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-yellow-500 text-sm">
                {'⭐'.repeat(r.rating)}
                <span className="text-gray-700 ml-2">{r.comment}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
