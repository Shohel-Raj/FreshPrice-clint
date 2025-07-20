import React from 'react';
import useLowestPriceProducts from '../../hooks/useLowestPriceProducts';
import LoadingSpinner from '../Shared Comonent/LoadingSpinner/LoadingSpinner';
import AllProductCard from '../Shared Comonent/ProductCard/AllProductCard';

const LowestPriceSection = () => {
  const { lowestPriceProducts, isLoading } = useLowestPriceProducts();

  if (isLoading) return <LoadingSpinner/>

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lowestPriceProducts.map(product => (
          <AllProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LowestPriceSection;
