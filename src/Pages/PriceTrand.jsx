import React, { useEffect } from 'react';
import PriceTrendComparison from '../Component/PriceTrendComparison';

const PriceTrand = () => {
    useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Price Trand`;
  }, []);4
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <PriceTrendComparison/>
        </div>
    );
};

export default PriceTrand;