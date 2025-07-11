import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePaginatedProducts = (page, limit = 12, sort = 'desc', selectedDate = '') => {
  return useQuery({
    queryKey: ['paginated-products', page, sort, selectedDate],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/total/products?page=${page}&limit=${limit}&sort=${sort}&date=${selectedDate}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
};

export default usePaginatedProducts;
