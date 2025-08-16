import React from "react";
import { motion } from "framer-motion";

const StatisticCard = ({
  title = "Statistic",
  value = "0",
  icon,
  bgColor = "bg-yellow-300",
}) => {
  return (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded-2xl shadow-md ${bgColor} text-gray-800`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon */}
      <div className="text-4xl">{icon}</div>

      {/* Content */}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatisticCard;
