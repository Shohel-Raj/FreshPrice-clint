import React, { useEffect, useState } from 'react';
import Container from '../Component/Shared Comonent/Container/Container';
import usePaginatedProducts from '../hooks/usePaginatedProducts';
import AllProductCard from '../Component/Shared Comonent/ProductCard/AllProductCard';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import NoContent from '../Component/Shared Comonent/NoContent/NoContent';
import { MdProductionQuantityLimits } from 'react-icons/md';

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const [sort, setSort] = useState('desc'); // 'asc' | 'desc'
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | All Products`;
  }, []);

  const { data, isLoading } = usePaginatedProducts(page, limit, sort, selectedDate);
  const totalPages = Number.isFinite(data?.total) ? Math.ceil(data.total / limit) : 1;

  if (isLoading) return <div className="text-center p-10"><LoadingSpinner /></div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

      <div className="bg-white dark:bg-gray-800">
        <Container>
          <div className="py-3.5">
            <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center text-[#FBD536]">
              Explore Daily Essentials at Your Fingertips
            </h1>
            <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600 dark:text-gray-300">
              Dive into a curated list of fresh produce and market goods updated directly by local vendors. FreshPrice brings your neighborhood bazaar online—transparent, timely, and tailored for you.
            </p>

            {/* Filter & Sort UI */}
            <div className="flex md:justify-between flex-col md:flex-row gap-2">

              {/* Price Sort */}
              <div className="flex items-center gap-2 md:gap-3">
                <p className="font-semibold uppercase italic">Sort by Price:</p>
                <select
                  className="select select-sm w-40 select-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                >
                  <option value="asc">🔼 Low to High</option>
                  <option value="desc">🔽 High to Low</option>
                </select>
              </div>

              {/* Single Date Filter */}
              <div className="flex items-center gap-2">
                <label className="font-semibold uppercase italic">Filter by Date:</label>
                <input
                  type="date"
                  className="input input-bordered w-40 input-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setPage(1); }}
                />
              </div>

            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Product Grid */}
          {data?.products?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {data.products.map((product) => (
                <AllProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NoContent message="No Products Available for this day" icon={MdProductionQuantityLimits} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                ◀ Prev
              </button>
              {[...Array(Math.max(totalPages, 1)).keys()].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p + 1)}
                  className={`btn btn-sm ${page === p + 1 ? 'btn-primary' : 'btn-outline'}`}
                >
                  {p + 1}
                </button>
              ))}
              <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
