import React, { useEffect } from 'react';
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
import LowestPriceSection from '../Component/Lowest product/LowestPriceSection';

const Home = () => {
    const { loading } = useAuth()
    const data = useLoaderData()
    useEffect(() => {
         document.title = `${import.meta.env.VITE_site_name} | Home`
        fetch('http://localhost:3000/grouped-by-market')
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])


    if (loading) {
        return <LoadingSpinner />
    }
    return (
        
        <>
         
            {/* ---------- hero banner -----------*/}


                    <HeroBanner />



            {/*--------------- Product Section ---------------*/}
            <Seperatesection color='bg-base-200'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center text-[#FBD536]">
                            Browse Fresh Products from Local Markets
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Explore a wide range of daily essentials including fruits, vegetables, and market staples. Updated regularly by verified vendors near you—FreshPrice helps you make smart, informed shopping decisions every day.
                        </p>



                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 '>

                        {
                            data?.map(d => <ProductCard key={d.marketName} product={d}></ProductCard>)
                        }



                    </div>





                </Container>

            </Seperatesection>


            {/* ---------- Advertisement -----------*/}
            <Seperatesection color='bg-[#F9EDE1]'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center text-[#FBD536]">
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
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center text-[#FBD536]">
                            Meet Our Featured Vendors
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Handpicked from local markets across the region, these trusted vendors bring you fresh, high-quality products daily. Explore their offerings, track price updates, and support your community by shopping smart and local.


                        </p>



                    </div>
                    <FeaturedVendors />
                </Container>

            </Seperatesection>
            <Seperatesection color='bg-[#F9EDE1]'>

                <Container>
                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center text-[#FBD536]">
                            Discover the Best Deals of the Day
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-6 text-center text-sm text-gray-600">
                            Handpicked from local markets across the region, these fresh products offer unbeatable prices without compromising on quality. Shop smart, save more, and support local vendors bringing you the best deals daily.
                        </p>



                    </div>
                    <LowestPriceSection />
                </Container>

            </Seperatesection>


        </>
    );
};

export default Home;