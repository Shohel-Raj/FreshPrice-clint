import React from 'react';
import useAuth from '../hooks/useAuth';


const About = () => {
 const {  loading} = useAuth()
    if(loading){
        return <LoadingSpinner/>
    }
    return (
        <div>
            I'm About
        </div>
    );
};

export default About;