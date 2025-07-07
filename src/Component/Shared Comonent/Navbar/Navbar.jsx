import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import MainLogo from '../MainLogo/MainLogo';
import Container from '../Container/Container';

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        localStorage.removeItem('auth-token');
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
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
    <button
      onClick={handleLogout}
      className="btn bg-[#34eb74] text-white hover:bg-[#97f7b9] hover:text-black w-full"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/loginSignInPage"
      className="btn bg-[#34eb74] text-white hover:bg-[#97f7b9] hover:text-black w-full"
      onClick={() => setIsMenuOpen(false)}
    >
      Login
    </Link>
  );

  return (
    <Container>
      <div className="navbar bg-base-100 dark:bg-white px-4 relative">
        {/* Left */}
        <div className="navbar-start">
          <MainLogo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-4">
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

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="btn btn-ghost btn-circle lg:hidden"
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

          {/* Desktop Auth Button */}
          <div className="hidden lg:flex">{authButton}</div>
        </div>

        {/* Animated Full-Screen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 70, damping: 20 }}
              className="fixed inset-0 z-50 bg-white dark:bg-base-200 flex flex-col items-center justify-start p-6 pt-10 space-y-6 lg:hidden"
            >
              {/* Close button */}
              <button
                className="self-end text-3xl font-bold text-gray-700 hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                &times;
              </button>

              {/* Nav Links */}
              <ul className="menu menu-vertical text-lg text-center space-y-3">
                {links}
              </ul>

              {/* Auth Button */}
              <div className="w-full px-6">{authButton}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Navbar;
