import React from "react";
import { Link } from "react-router";
import img from "/fresh.png";

const MainLogo = () => {
  return (
    <Link
      to="/"
      className="flex justify-center items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <img
        src={img}
        alt="Fresh Price Logo"
        className="h-12 md:h-12 w-auto"
      />
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:flex hidden">
        Fresh Price
      </p>
    </Link>
  );
};

export default MainLogo;
