import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Slider from 'react-slick'; // npm install react-slick slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const AdvertisementCarousel = () => {
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/advertisements`);
      return res.data;
    }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  if (isLoading) return <div className="text-center p-8">Loading ads...</div>;

  if (!ads.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No current advertisements.
      </div>
    );
  }

  return (
    <motion.div
      className="w-full  mx-auto pb-3.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      
      <Slider {...settings}>
        {ads.map((ad, idx) => (
          <div key={ad._id} className="relative px-4">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-[300px] object-cover rounded-xl shadow"
            />
            <div className="absolute bottom-5 left-5 bg-black/60 text-white p-4 rounded-xl max-w-sm">
              <h3 className="text-xl font-bold">{ad.title}</h3>
              <p className="text-sm mt-1">{ad.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default AdvertisementCarousel;
