import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFeaturedVendors = () => {
  return useQuery({
    queryKey: ['featured-vendors'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-vendors`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });
};

export default useFeaturedVendors;
