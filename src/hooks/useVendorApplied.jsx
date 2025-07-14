import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import toast from 'react-hot-toast';

const useVendorApplied = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // GET: Check if vendor applied
  const { data: vendor, isLoading: isVendorLoading } = useQuery({
    queryKey: ['vendorApplied', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/featured-vendors/${user.email}`);
      return data;
    },
  });

  // POST: Apply as vendor
  const { mutateAsync: applyAsVendor, isPending: isApplying } = useMutation({
    mutationFn: async (vendorData) => {
      const { data } = await axiosSecure.post('/featured-vendors', vendorData);
      return data;
    },
    onSuccess: () => {
      toast.success('Vendor application submitted!');
      queryClient.invalidateQueries(['vendorApplied', user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to apply');
    },
  });

  return {
    vendor,
    isVendorLoading,
    applyAsVendor,
    isApplying,
  };
};

export default useVendorApplied;
