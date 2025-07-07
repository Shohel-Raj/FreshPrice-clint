import React from 'react';
import { RiseLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div>
            <RiseLoader
                color="#55f7bf"
                size={21}
            />

        </div>
    );
};

export default LoadingSpinner;