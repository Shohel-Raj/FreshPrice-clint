import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from './useAxiosSecure';
import useAuth from './useAuth';
import toast from 'react-hot-toast';

const useMyProducts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 1️⃣ Fetch vendor's products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['my-products', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?vendor=${user.email}`);
      return res.data;
    },
  });

  // 2️⃣ Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product deleted successfully!');
      queryClient.invalidateQueries(['my-products']);
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  // 3️⃣ Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, updatedProduct }) => {
      const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product updated successfully!');
      queryClient.invalidateQueries(['my-products']);
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  return {
    products,
    isLoading,
    deleteProduct,
    updateProduct,
  };
};

export default useMyProducts;
