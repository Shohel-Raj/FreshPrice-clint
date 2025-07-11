import React from 'react';
import SignUp from './SignUp/SignUp';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import Container from '../Component/Shared Comonent/Container/Container';
import Seperatesection from '../Component/Shared Comonent/Seperate section/Seperatesection';
import HeroBanner from '../Component/Banner Section/HeroBanner';
import ProductCard from '../Component/Shared Comonent/ProductCard/ProductCard';

const Home = () => {
    const { loading } = useAuth()

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
            <Seperatesection>

                <Container>
                    <div className='grid grid-cols-4 gap-3'>

                        <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} />
                        <ProductCard product={dummyProduct} />

                    </div>





                </Container>

            </Seperatesection>


        </>
    );
};

export default Home;