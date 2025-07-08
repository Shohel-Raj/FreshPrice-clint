import React from 'react';
import { RiseLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <RiseLoader color="#FBD536" size={21} />
    </div>
  );
};

export default LoadingSpinner;
