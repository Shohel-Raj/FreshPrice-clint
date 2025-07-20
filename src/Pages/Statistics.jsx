import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import StatisticCard from '../Component/Shared Comonent/StatisticCard';
import { TbBuildingStore, TbCheck, TbClock, TbUsers } from 'react-icons/tb';
import TopOrderedProductsTable from '../Component/Table/TopOrderedProductsTable';
import AdminStatsGraph from '../Component/AdminStatsGrap';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | statistics`;
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/statistics');
      return res.data;
    },
  });
   

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error(`Failed to load statistics: ${error.message}`);
    return <p className="text-center text-red-500">Failed to load statistics</p>;
  }

  return <>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 mt-10">
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
  <div className='grid grid-cols-1 md:grid-cols-2 p-6 gap-2.5 items-stretch'>
    <div className='basis-1 h-full'>
    <AdminStatsGraph/>
    </div>
    <div className='basis-1  h-full'>
      <TopOrderedProductsTable />
    </div>
  </div>
      
  </>
};

export default Statistics;
