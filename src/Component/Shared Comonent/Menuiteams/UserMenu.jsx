import {
  ChartBarIcon,
  BookmarkSquareIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { StoreIcon, UserCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MenuItem from './Menuiteam';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const UserMenu = () => {
  const { user, loading } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
  const fetchVendor = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featured-vendors/${user?.email}`);
      setVendor(data.applied); // true or false
    } catch (error) {
      setVendor(false); // Treat any error as "not applied"
    } finally {
      setIsLoading(false);
    }
  };

  if (!loading && user?.email) {
    fetchVendor();
  }
}, [user?.email, loading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* 📈 View price trends */}
      <MenuItem
        icon={ChartBarIcon}
        label="View price trends"
        address="user-home"
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
