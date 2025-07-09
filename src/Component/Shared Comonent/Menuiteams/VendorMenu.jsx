import React from 'react';
import {
  PlusCircleIcon,
  CubeIcon,
  MegaphoneIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import MenuItem from './Menuiteam';

const VendorMenu = () => {
  return (
    <div>
      {/* ➕ Add Product */}
      <MenuItem
        icon={PlusCircleIcon}
        label='Add Product'
        address='add-product'
      />

      {/* 📦 My Products */}
      <MenuItem
        icon={CubeIcon}
        label='My Products'
        address='my-products'
      />

      {/* 📢 Add Advertisement */}
      <MenuItem
        icon={MegaphoneIcon}
        label='Add Advertisement'
        address='/dashboard/add-advertisement'
      />

      {/* 🗂️ My Advertisements */}
      <MenuItem
        icon={RectangleStackIcon}
        label='My Advertisements'
        address='my-advertisements'
      />
    </div>
  );
};

export default VendorMenu;
