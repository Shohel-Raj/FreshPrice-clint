import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import MainLogo from '../MainLogo/MainLogo';
import Container from '../Container/Container';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('auth-token');
        setIsMenuOpen(false);
      })
      .catch((error) => {
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-bold border-b-2 uppercase' : 'uppercase'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allproduct"
          className={({ isActive }) =>
            isActive ? 'font-bold border-b-2 uppercase' : 'uppercase'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          all product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'font-bold border-b-2 uppercase' : 'uppercase'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  const authButton = user ? (
    <div className='flex gap-1 flex-col md:flex-row'>
      <Link
        to="/dashboard"
        className="btn bg-[#FBD536]  hover:bg-white w-full md:w-auto"
        onClick={() => setIsMenuOpen(false)}
      >
        <LayoutDashboard/>
        <p className='uppercase'>dashboard</p>
        
      </Link>

      <button
        onClick={handleLogout}
        className="btn bg-[#FBD536] text-black hover:bg-white w-full md:w-auto"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className='flex flex-col md:flex-row gap-2'>
      <Link
        to="/login"
        className="btn bg-[#FBD536] text-black hover:bg-white w-full md:w-auto"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="btn bg-[#FBD536] text-black hover:bg-white w-full md:w-auto"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign-up
      </Link>
    </div>
  );

  return (
    <Container>
      <div className="navbar mx-0 relative">
        {/* Left */}
        <div className="navbar-start">
          <MainLogo />
        </div>

        {/* Center - visible from md and up */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          {/* Avatar */}
          {user && (
            <div className="avatar w-8 cursor-pointer">
              <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-10 h-10">
                <img
                  src={
                    user?.photoURL ||
                    'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
          )}

          {/* Hamburger Icon - only for < md */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="btn btn-ghost btn-circle md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Auth Button - only for ≥ md */}
          <div className="hidden md:flex">{authButton}</div>
        </div>

        {/* Fullscreen Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 70, damping: 12 }}
              className="fixed inset-0 z-50 bg-white dark:bg-base-200 flex flex-col justify-center items-center px-6 md:hidden"
            >
              {/* Close button - fixed in top-right */}
              <button
                className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                &times;
              </button>

              {/* Nav Links */}
              <ul className="menu menu-vertical text-xl font-semibold text-center space-y-4 mb-6">
                {links}
              </ul>

              {/* Auth Button */}
              <div className="w-full max-w-xs">{authButton}</div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Container>
  );
};

export default Navbar;
