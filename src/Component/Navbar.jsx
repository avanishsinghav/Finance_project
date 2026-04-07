import React from "react";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="px-6 py-4 sticky top-0 flex justify-between items-center z-50 bg-blue-700">
      <p className="text-white font-medium text-2xl">Financely</p>
      <IoPersonCircle className="h-8 w-8 " />
    </div>
  );
};

export default Navbar;
