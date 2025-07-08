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
        address='all-users'
      />

      {/* 📦 All Products */}
      <MenuItem
        icon={CubeIcon}
        label='All Products'
        address='all-products'
      />

      {/* 📢 All Advertisements */}
      <MenuItem
        icon={MegaphoneIcon}
        label='All Advertisements'
        address='all-advertisements'
      />

      {/* 🛒 All Orders */}
      <MenuItem
        icon={ShoppingCartIcon}
        label='All Orders'
        address='all-orders'
      />
    </div>
  );
};

export default AdminMenu;
