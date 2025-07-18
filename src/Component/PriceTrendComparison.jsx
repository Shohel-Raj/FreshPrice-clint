import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PriceTrendBarChart = () => {
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState('Carrot');
  const [chartData, setChartData] = useState([]);
  const axiosSecure =useAxiosSecure();

  useEffect(() => {
    // Fetch all distinct item names
    axiosSecure.get(`${import.meta.env.VITE_API_URL}/distinct-item-names`)
      .then(res => setItemList(res.data))
      .catch(err => console.error('Error loading items:', err));
  }, []);

  useEffect(() => {
    if (selectedItem) {
      axiosSecure.get(`${import.meta.env.VITE_API_URL}/products/price-trends/${selectedItem}`)
        .then(res => {
          const grouped = {};
          const allVendors = new Set();

          // Group prices by date, and track all vendors
          res.data.forEach(vendor => {
            vendor.prices.forEach(priceEntry => {
              const date = priceEntry.date;
              if (!grouped[date]) grouped[date] = { date };
              grouped[date][vendor.vendorName] = priceEntry.price;
              allVendors.add(vendor.vendorName);
            });
          });

          // Ensure all vendors are represented on each date
          const formatted = Object.values(grouped)
            .filter(entry => typeof entry.date === 'string')
            .map(entry => {
              allVendors.forEach(vendor => {
                if (!(vendor in entry)) {
                  entry[vendor] = null; // Or 0 if you want to show a flat line
                }
              });
              return entry;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          setChartData(formatted);
        })
        .catch(err => console.error('Error fetching trend data:', err));
    }
  }, [selectedItem]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📊 Price Trend by Vendor</h2>

      <select
        className="border border-gray-300 rounded-md px-4 py-2 mb-6 w-full"
        value={selectedItem}
        onChange={e => setSelectedItem(e.target.value)}
      >
        <option value="">Select an item...</option>
        {itemList.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(chartData[0])
              .filter(key => key !== 'date')
              .map((vendor, index) => (
                <Bar
                  key={vendor}
                  dataKey={vendor}
                  fill={`hsl(${index * 67}, 70%, 50%)`}
                  barSize={30}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        selectedItem && <p className="text-gray-500">No price trend data available.</p>
      )}
    </div>
  );
};

export default PriceTrendBarChart;
