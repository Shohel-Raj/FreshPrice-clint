import React from 'react';
import { motion } from 'framer-motion';
import Container from '../Component/Shared Comonent/Container/Container';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};

const About = () => {
  return (
    <div className="bg-[#F9EDE1] text-gray-800 min-h-screen py-10">
      <Container>
        {/* Hero Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD536]">About Fresh Price</h1>
          <p className="text-lg text-gray-600">
            Your trusted companion for daily market price tracking across local markets in the Country.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10"
        >
          <h2 className="text-2xl font-semibold text-[#FBD536] mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700">
            At Fresh Price, we aim to empower consumers and vendors by providing transparent, real-time market data.
            We believe in a future where fair pricing and accessibility are available to everyone.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10"
        >
          <h2 className="text-2xl font-semibold text-[#FBD536] mb-4">🛒 What We Do</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Track and display real-time prices for vegetables, fish, meat, and essentials.</li>
            <li>Allow vendors to update prices and manage their profiles.</li>
            <li>Enable users to monitor price trends and build personalized watchlists.</li>
            <li>Provide insights and analytics to help with smarter market decisions.</li>
          </ul>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
        >
          <h2 className="text-2xl font-semibold text-[#FBD536] mb-4">👨‍💻 Meet the Team</h2>
          <p className="text-gray-700 mb-4">
            Fresh Price is built by a passionate team of developers, designers, and local market researchers. We blend technology with local knowledge to create a smarter, fairer shopping experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              {
                name: 'Shohel Raj',
                role: 'Frontend Developer',
                img: 'https://i.postimg.cc/ZnYDYPwC/man-1.jpg'
              },
              {
                name: 'Ruma Chowdory',
                role: 'Backend Developer',
                img: 'https://i.postimg.cc/CMJQPtKD/woman-1.jpg'
              },
              {
                name: 'Alamgir',
                role: 'Database Manager',
                img: 'https://i.postimg.cc/L5vwjQJt/man-2.jpg'
              },
              {
                name: 'Riya Akhter',
                role: 'Database Manager',
                img: 'https://i.postimg.cc/mkTKzWgZ/woman-2.jpg'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#F9EDE1] p-4 rounded-xl shadow text-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-3"
                />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
