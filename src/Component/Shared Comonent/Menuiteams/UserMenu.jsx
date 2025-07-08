import {
  ChartBarIcon,
  EyeIcon,
  ClipboardDocumentListIcon,
  BookmarkSquareIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import MenuItem from './Menuiteam';

const UserMenu = () => {
  return (
    <div>
      {/* 📈 View price trends */}
      <MenuItem
        icon={ChartBarIcon}
        label='View price trends'
        address='price-trends'
      />

      {/* ⭐ Manage watchlist */}
      <MenuItem
        icon={BookmarkSquareIcon}
        label='Manage watchlist'
        address='watchlist'
      />

      {/* 📋 My Order List */}
      <MenuItem
        icon={ListBulletIcon}
        label='My Orders'
        address='my-orders'
      />
    </div>
  );
};

export default UserMenu;
