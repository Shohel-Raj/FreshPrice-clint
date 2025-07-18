import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePaginatedOrders = (page, limit, status) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['orders', page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', limit);
      if (status && status !== 'all') params.set('status', status);

      const res = await axiosSecure.get(`/admin/orders?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });
};

export default usePaginatedOrders;
