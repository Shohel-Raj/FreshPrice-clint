import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from './Shared Comonent/LoadingSpinner/LoadingSpinner';

const AdminStatsGraph = () => {
  const axiosSecure = useAxiosSecure();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get('/admin/statistics/graph')
      .then(res => {
        const { userStats = [], vendorStats = [], productStats = [] } = res.data || {};

        const formatStats = (arr, key) =>
          arr.map(item => ({
            month: `${item.year}-${String(item.month).padStart(2, '0')}`,
            [key]: item.count
          }));

        const users = formatStats(userStats, 'users');
        const vendors = formatStats(vendorStats, 'vendors');
        const products = formatStats(productStats, 'products');

        const merged = {};

        [...users, ...vendors, ...products].forEach(item => {
          const month = item.month;
          if (!merged[month]) {
            merged[month] = { month, users: 0, vendors: 0, products: 0 };
          }
          Object.keys(item).forEach(key => {
            if (key !== 'month') {
              merged[month][key] = item[key] ?? 0;
            }
          });
        });

        const mergedArray = Object.values(merged)
          .map(item => ({
            month: item.month,
            users: item.users || 0,
            vendors: item.vendors || 0,
            products: item.products || 0,
          }))
          .sort((a, b) => a.month.localeCompare(b.month));

        setGraphData(mergedArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading admin stats graph:', error);
        toast.error('Failed to load admin graph data');
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">📈 Admin Trends (Monthly)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" name="New Users" />
          <Line type="monotone" dataKey="vendors" stroke="#82ca9d" name="New Vendors" />
          <Line type="monotone" dataKey="products" stroke="#ffc658" name="New Products" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminStatsGraph;
