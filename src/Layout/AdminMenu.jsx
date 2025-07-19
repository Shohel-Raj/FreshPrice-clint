import React from 'react';
import {
  UsersIcon,
  CubeIcon,
  MegaphoneIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import MenuItem from '../Component/Shared Comonent/Menuiteams/Menuiteam';
import { ChartBarIcon } from 'lucide-react';

const AdminMenu = () => {
  return (
    <div>
      {/* 👥 All Users */}
      <MenuItem
        icon={ChartBarIcon}
        label='Statistic'
        address='/dashboard/admin-home'
      />
      {/* 👥 All Users */}
      <MenuItem
        icon={UsersIcon}
        label='All Users'
        address='/dashboard/all-users'
      />

      {/* 📦 All Products */}
      <MenuItem
        icon={CubeIcon}
        label='All Products'
        address='/dashboard/all-products'
      />

      {/* 📢 All Advertisements */}
      <MenuItem
        icon={MegaphoneIcon}
        label='All Advertisements'
        address='/dashboard/all-ads'
      />

      {/* 🛒 All Orders */}
      <MenuItem
        icon={ShoppingCartIcon}
        label='All Orders'
        address='/dashboard/all-orders'
      />
      {/*  All vendor */}
      <MenuItem
        icon={BuildingStorefrontIcon}
        label='All Vendor'
        address='/dashboard/all-vendor'
      />
    </div>
  );
};

export default AdminMenu;
