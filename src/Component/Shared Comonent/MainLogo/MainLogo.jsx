import React from 'react';
import { Link } from 'react-router';
import img from '/fresh.png'

const MainLogo = () => {
    return (
        <Link to='/' className='flex justify-center items-center gap-1.5'>
            <img src={img} alt="" className="h-15 md:h-12 w-auto"/>
            <p className='text-2xl font-bold md:flex hidden'>Fresh Price</p>

        
        
        </Link>
    );
};

export default MainLogo;