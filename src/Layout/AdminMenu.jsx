import React from 'react';
import {
  UsersIcon,
  CubeIcon,
  MegaphoneIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import MenuItem from '../Component/Shared Comonent/Menuiteams/Menuiteam';

const AdminMenu = () => {
  return (
    <div>
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
    </div>
  );
};

export default AdminMenu;
