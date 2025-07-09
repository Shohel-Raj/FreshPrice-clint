import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';


const useMyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch Ads
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['myAds', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads?vendorEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ❌ Delete Ad
  const deleteAd = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/ads/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myAds', user.email]);
      toast.success('Ad deleted successfully!')
    },
  });

  // ✏️ Update Ad
  const updateAd = useMutation({
    mutationFn: async ({ id, updatedAd }) => {
      const res = await axiosSecure.put(`/ads/${id}`, updatedAd);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myAds', user.email]);
      toast.success('Ads Sucessfully updated')
    },
  });


  return { ads, isLoading, deleteAd, updateAd };
};

export default useMyAdvertisements;
