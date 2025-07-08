import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared Comonent/Navbar/Navbar';
import Footer from '../Component/Shared Comonent/Footer.jsx/Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div>
            <div className='shadow-lg sticky top-0 z-50 left-0 right-0 bg-base-100'>
              <Navbar/>  
            </div>
            
            <Outlet ></Outlet>
            <Footer/>
            <Toaster />
        </div>
    );
};

export default RootLayout;