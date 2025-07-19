// hooks/useAllUsers.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUsers = ({ page, limit, search }) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-users', page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return { data, isLoading, refetch };
};

export default useAllUsers;
