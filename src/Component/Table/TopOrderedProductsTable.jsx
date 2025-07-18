import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared Comonent/LoadingSpinner/LoadingSpinner";

const TopOrderedProductsTable = () => {
  const axiosSecure = useAxiosSecure();

  const { data: recentOrders = [], isError, isLoading, error } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/recent-orders');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error(`Failed to load recent orders: ${error.message}`);
    return <p className="text-center text-red-500">Failed to load recent orders</p>;
  }

  return (
    <div className=" rounded-xl shadow p-4 ">
      <h3 className="text-lg font-bold text-center mb-4">🛒 Recent Ordered Products</h3>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full text-sm">
          <thead>
            <tr className="bg-[#FBD536]/80 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Product ID</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-[#F9EDE1]">
                <td className="p-2">
                  <img
                    src={order.productImage}
                    alt="product"
                    className="h-10 w-10 rounded object-cover"
                  />
                </td>
                <td className="p-2">{order.productId.slice(-6)}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopOrderedProductsTable;
