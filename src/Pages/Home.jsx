import React from 'react';
import SignUp from './SignUp/SignUp';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';

const Home = () => {
    const {  loading} = useAuth()
    if(loading){
        return <LoadingSpinner/>
    }
    return (
        <div className='min-h-screen '>
       home

        </div>
    );
};

export default Home;