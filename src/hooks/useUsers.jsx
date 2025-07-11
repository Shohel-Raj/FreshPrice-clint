import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from './useAxiosSecure';
import toast from 'react-hot-toast';

const useUsers = () => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // 2️⃣ Delete a user
  const deleteUser = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  // 3️⃣ Update a user (e.g., role)
  const updateUser = useMutation({
    mutationFn: async ({ email, updatedUser }) => {
      const res = await axiosSecure.patch(`/user/role/update//${email}`, updatedUser);
      return res.data;
    },
    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });

  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
  };
};

export default useUsers;
