import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePaginatedVendors = (page, limit, statusFilter) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['vendors', page, limit, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', limit);
      if (statusFilter && statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const res = await axiosSecure.get(`/admin/vendors?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });
};

export default usePaginatedVendors;
