import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import StatisticCard from '../Component/Shared Comonent/StatisticCard';
import { TbBuildingStore, TbCheck, TbClock, TbUsers } from 'react-icons/tb';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/statistics');
      return res.data;
    },
  });
  console.log(data);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error(`Failed to load statistics: ${error.message}`);
    return <p className="text-center text-red-500">Failed to load statistics</p>;
  }

  return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-5 my-10">
      <StatisticCard
        title="Pending Products"
        value={data.pendingProducts}
        icon={<TbClock />}
        bgColor="bg-yellow-300"
      />
      <StatisticCard
        title="Verified Products"
        value={data.verifiedProducts}
        icon={<TbCheck />}
        bgColor="bg-green-300"
      />
      <StatisticCard
        title="Total Users"
        value={data.totalUsers}
        icon={<TbUsers />}
        bgColor="bg-blue-300"
      />
      <StatisticCard
        title="Total Vendors"
        value={data.totalVendors}
        icon={<TbBuildingStore />}
        bgColor="bg-purple-300"
      />
    </div>
  
  
  </>
};

export default Statistics;
