import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from './useAxiosSecure';
import useAuth from './useAuth';

const usePaginatedUsers = (page, limit = 10) => {

  const {user}=useAuth();
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}&email=${user?.email}`);
      return res.data; // { users, totalUsers, totalPages, currentPage }
    },
    keepPreviousData: true,
  });
};

export default usePaginatedUsers;
