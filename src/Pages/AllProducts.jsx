import React, { useState } from 'react';
import Container from '../Component/Shared Comonent/Container/Container';
import usePaginatedProducts from '../hooks/usePaginatedProducts';
import AllProductCard from '../Component/Shared Comonent/ProductCard/AllProductCard';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';

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
            <Container>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Filter & Sort UI */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6  p-4 rounded-xl shadow">
                        {/* Price Sort (Select Dropdown) */}
                        <div className="flex items-center  gap-2">
                            <label className="font-semibold">Sort by Price:</label>
                            <select
                                className="select select-sm select-bordered"
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
                            <label className="font-semibold">Filter by Date:</label>
                            <input
                                type="date"
                                className="input input-bordered input-sm"
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setPage(1); // reset to first page
                                }}
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    {data?.products?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {data.products.map((product) => (
                                <AllProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            🚫 No products found for the selected filters.
                        </div>
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
