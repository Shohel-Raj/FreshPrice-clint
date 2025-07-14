import {
  ChartBarIcon,
  BookmarkSquareIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import MenuItem from './Menuiteam';
import { StoreIcon, UserCircleIcon } from 'lucide-react';
import useVendorApplied from '../../../hooks/useVendorApplied';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { EyeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'; // You imported them but didn't use them

const UserMenu = () => {
  const {vendor, isVendorLoading} = useVendorApplied();

  // if (isVendorLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* 📈 View price trends */}
      <MenuItem
        icon={ChartBarIcon}
        label="View price trends"
        address="price-trends"
      />

      {/* ⭐ Manage watchlist */}
      <MenuItem
        icon={BookmarkSquareIcon}
        label="Manage watchlist"
        address="watchlist"
      />

      {/* 📋 My Orders */}
      <MenuItem
        icon={ListBulletIcon}
        label="My Orders"
        address="my-orders"
      />

      {/* 🛍️ Vendor Menu */}
      {vendor ? (
        <MenuItem
          icon={UserCircleIcon}
          label="Profile"
          address="vendor-profile"
        />
      ) : (
        <MenuItem
          icon={StoreIcon}
          label="Become a Vendor"
          address="vendor-Request"
        />
      )}
    </div>
  );
};

export default UserMenu;
