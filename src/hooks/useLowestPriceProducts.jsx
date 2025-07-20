import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useLowestPriceProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lowestPriceProducts = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['lowestPriceProducts'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/lowest-price-product');
      return data;
    },
  });

  return { lowestPriceProducts, isLoading, isError, refetch };
};

export default useLowestPriceProducts;
