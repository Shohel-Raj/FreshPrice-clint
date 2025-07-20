import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useVendorInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: vendorInfo, isLoading: isVendorInfoLoading, refetch } = useQuery({
    queryKey: ['vendorInfo', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/self/vendor/info?email=${user.email}`);
      return data;
    },
  });

  return { vendorInfo, isVendorInfoLoading, refetch };
};

export default useVendorInfo;
