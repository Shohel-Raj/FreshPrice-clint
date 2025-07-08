import React from 'react';
import SignUp from './SignUp/SignUp';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import Container from '../Component/Shared Comonent/Container/Container';
import Seperatesection from '../Component/Shared Comonent/Seperate section/Seperatesection';
import HeroBanner from '../Component/Banner Section/HeroBanner';

const Home = () => {
    const { loading } = useAuth()
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <Seperatesection color='bg-[#F9EDE1]'>

            <Container>

                <HeroBanner/>
                
            </Container>

        </Seperatesection>
    );
};

export default Home;