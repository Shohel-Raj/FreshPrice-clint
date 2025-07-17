import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PriceComparisonChart = ({ productId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [priceData, setPriceData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (productId) {
      axiosSecure.get(`/products/price-history/${productId}`)
        .then(res => setPriceData(res.data || []));
    }
  }, [productId, axiosSecure]);

  const selectedDateData = priceData.find(d => d.date === selectedDate);
  const currentDateData = priceData[priceData.length - 1];
  const priceDiff = selectedDateData
    ? currentDateData.price - selectedDateData.price
    : null;

  return (
    <div className="p-4 bg-white rounded-xl shadow mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg font-semibold">📊 Price Trend Comparison</h3>
        <select
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm"
        >
          <option value="">Select Previous Date</option>
          {priceData.slice(0, -1).map(d => (
            <option key={d.date} value={d.date}>{d.date}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#FBD536"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {selectedDate && selectedDateData && (
        <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
          <p>Price on <strong>{selectedDate}</strong>: ৳{selectedDateData.price}</p>
          <p>Current Price: ৳{currentDateData?.price}</p>
          <p>
            Change:{' '}
            <span className={`font-semibold ${
              priceDiff > 0 ? 'text-red-500' : priceDiff < 0 ? 'text-green-600' : 'text-gray-500'
            }`}>
              {priceDiff > 0
                ? `▲ Increased by ৳${priceDiff}`
                : priceDiff < 0
                ? `▼ Decreased by ৳${Math.abs(priceDiff)}`
                : 'No Change'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceComparisonChart;
