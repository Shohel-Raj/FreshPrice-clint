import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, } from 'react-router';
import { ImExit } from "react-icons/im";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ArrowLeftIcon,

} from '@heroicons/react/24/outline';
import useRole from '../hooks/useRole';
import MenuItem from '../Component/Shared Comonent/Menuiteams/Menuiteam';
import UserMenu from '../Component/Shared Comonent/Menuiteams/UserMenu';
import VendorMenu from '../Component/Shared Comonent/Menuiteams/VendorMenu';
import AdminMenu from './AdminMenu';

const DrawerLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, isRoleLoading] = useRole()


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg z-40 transform transition-transform duration-300
        ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col justify-between h-full">
          {/* Top section */}
          <div>
            <div className="p-6 text-xl font-bold border-b">Dashboard</div>
            <nav className="mt-6 space-y-2 px-4">

              {role === 'user' && <UserMenu />}
              {role === 'vendor' && <VendorMenu setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Back Button */}
          <div className="p-4 border-t">
            <Link
              to='/'
              className="flex items-center uppercase gap-2 text-sm px-4 py-2 border border-[#FBD536]
                bg-[#FBD536] text-black hover:bg-white w-full md:w-autow-full justify-center"
            >
              <ImExit
                className="w-4 h-4" />
              Exit from DashBoard
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar (mobile) */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>


        {/* Main content */}
        <main className="overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DrawerLayout;
