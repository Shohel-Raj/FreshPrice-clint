import React from 'react';

const SeparateSection = ({ children, color }) => {
  return (
    <div className={`${color ? color : ''} py-4`}>
      {children}
    </div>
  );
};

export default SeparateSection;
