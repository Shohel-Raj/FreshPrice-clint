import React from 'react';

const StatisticCard = ({ title, value, icon, bgColor = 'bg-yellow-300' }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${bgColor} text-gray-800`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
