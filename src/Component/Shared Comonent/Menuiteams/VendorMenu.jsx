import React from 'react';
import {
  PlusCircleIcon,
  CubeIcon,
  MegaphoneIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import MenuItem from './Menuiteam';

const VendorMenu = ({ setDrawerOpen ,drawerOpen}) => {
  return (
    <div>
      {/* ➕ Add Product */}
      <MenuItem
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        icon={PlusCircleIcon}
        label='Add Product'
        address='add-product'
      />

      {/* 📦 My Products */}
      <MenuItem
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        icon={CubeIcon}
        label='My Products'
        address='my-products'
      />

      {/* 📢 Add Advertisement */}
      <MenuItem
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        icon={MegaphoneIcon}
        label='Add Advertisement'
        address='/dashboard/add-advertisement'
      />

      {/* 🗂️ My Advertisements */}
      <MenuItem
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        icon={RectangleStackIcon}
        label='My Advertisements'
        address='/dashboard/my-advertisements'
      />
    </div>
  );
};

export default VendorMenu;
