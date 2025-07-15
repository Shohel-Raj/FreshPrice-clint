// src/pages/DashboardRedirect.jsx
import React from 'react';
import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';

const DashboardRedirect = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (role === 'admin') return <Navigate to="/dashboard/admin-home" replace />;
  if (role === 'vendor') return <Navigate to="/dashboard/vendor-home" replace />;
  return <Navigate to="/dashboard/user-home" replace />;
};

export default DashboardRedirect;
