import React from 'react';
import SignUp from './SignUp/SignUp';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import Container from '../Component/Shared Comonent/Container/Container';
import Seperatesection from '../Component/Shared Comonent/Seperate section/Seperatesection';
import HeroBanner from '../Component/Banner Section/HeroBanner';
import ProductCard from '../Component/Shared Comonent/ProductCard/ProductCard';
import AdvertisementCarousel from '../Component/Shared Comonent/Carusols/AdvertisementCarousel';
import FeaturedVendors from '../Component/FeaturedVendors/FeaturedVendors';
import { useLoaderData } from 'react-router';

const Home = () => {
    const { loading } = useAuth()
    const data=useLoaderData()
    console.log(data);
    const dummyProduct = {
        id: '123',
        image: '/onion-market.jpg',
        marketName: 'Karwan Bazar',
        date: '2025-07-08',
        items: [
            { name: 'Onion', price: 30 },
            { name: 'Potato', price: 22 },
            { name: 'Tomato', price: 40 },
            { name: 'Chili', price: 80 },
        ],
    };

    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <>
            {/* ---------- hero banner -----------*/}
            <Seperatesection color='bg-[#F9EDE1]'>

                <Container>

                    <HeroBanner />

                </Container>

            </Seperatesection>

            {/*--------------- Product Section ---------------*/}
            <Seperatesection color='bg-base-200'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                            Browse Fresh Products from Local Markets
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Explore a wide range of daily essentials including fruits, vegetables, and market staples. Updated regularly by verified vendors near you—FreshPrice helps you make smart, informed shopping decisions every day.
                        </p>



                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 '>

                        {
                            data.map(d=><ProductCard key={d.marketName} product={d}></ProductCard>)
                        }

                        {/* <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} /> */}

                    </div>





                </Container>

            </Seperatesection>


            {/* ---------- Advertisement -----------*/}
            <Seperatesection color='bg-[#F9EDE1]'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                            Spotlight on Local Offers & Promotions
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Discover the best deals from trusted local vendors—limited-time offers, fresh arrivals, and special discounts just for you. Stay ahead of the market and grab your daily essentials at unbeatable prices.

                        </p>



                    </div>
                    <AdvertisementCarousel />
                </Container>

            </Seperatesection>
            {/* ---------- Featured Vendors -----------*/}
            <Seperatesection color='bg-base-200'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                              Meet Our Featured Vendors
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                              Handpicked from local markets across the region, these trusted vendors bring you fresh, high-quality products daily. Explore their offerings, track price updates, and support your community by shopping smart and local.


                        </p>



                    </div>
                    <FeaturedVendors/>
                </Container>

            </Seperatesection>
            <Seperatesection color='bg-[#F9EDE1]'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                              Meet Our Featured Vendors
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                              Handpicked from local markets across the region, these trusted vendors bring you fresh, high-quality products daily. Explore their offerings, track price updates, and support your community by shopping smart and local.


                        </p>



                    </div>
                    <FeaturedVendors/>
                </Container>

            </Seperatesection>


        </>
    );
};

export default Home;