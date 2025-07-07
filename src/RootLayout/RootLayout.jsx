import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared Comonent/Navbar/Navbar';
import Footer from '../Component/Shared Comonent/Footer.jsx/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default RootLayout;