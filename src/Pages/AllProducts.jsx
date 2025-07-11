import React, { useState } from 'react';
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

    const { data, isLoading } = usePaginatedProducts(page, limit, sort, selectedDate);
    const totalPages = Number.isFinite(data?.total) ? Math.ceil(data.total / limit) : 1;

    if (isLoading) return <div className="text-center p-10"><LoadingSpinner /></div>;

    return (
        <div className='bg-[#F9EDE1]'>

            <div className='bg-base-200'>
                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                            Explore Daily Essentials at Your Fingertips
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Dive into a curated list of fresh produce and market goods updated directly by local vendors. FreshPrice brings your neighborhood bazaar online—transparent, timely, and tailored for you.
                        </p>

                        {/* Filter & Sort UI */}
                        <div className="flex md:justify-between flex-col md:flex-row ">
                            {/* Price Sort (Select Dropdown) */}
                            <div className="flex  items-center mb-2 md:mb-0">
                                <p className="font-semibold uppercase italic mr-3">Sort by Price:</p>
                                <select
                                    className="select select-sm w-40 select-bordered"
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        setPage(1); // reset to first page
                                    }}
                                >
                                    <option value="asc">🔼 Low to High</option>
                                    <option value="desc">🔽 High to Low</option>
                                </select>
                            </div>

                            {/* Single Date Filter */}
                            <div className="flex items-center gap-2">
                                <label className="font-semibold uppercase italic mr-2">Filter by Date:</label>
                                <input
                                    type="date"
                                    className="input input-bordered w-40 input-sm"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setPage(1); // reset to first page
                                    }}
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
                        <NoContent message={'No Product Availabe for this day'} icon={MdProductionQuantityLimits} />
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
