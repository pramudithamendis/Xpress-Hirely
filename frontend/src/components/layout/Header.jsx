import React from "react";
import { FaPhone } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-gray-400 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-25 h-16 flex items-center justify-center mr-2 bg-gray-400">
            <img
              src="carLogo.png"
              alt="Logo"
              className="w-full h-auto
            "
            />
          </div>
          <span className="text-xl font-semibold mr-4">Xpress Hirely</span>
        </div>
        <nav>
          <ul className="flex">
            <li className="mr-6">
              <a href="#" className="menu-item hover:text-gray-900 relative">
                HOME
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="menu-item hover:text-gray-900 relative">
                VEHICLE FLEET
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="menu-item hover:text-gray-900 relative">
                FEEDBACKS
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="menu-item hover:text-gray-900 relative">
                RENT YOUR VEHICLE
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="menu-item hover:text-gray-900 relative">
                CUSTOMER SUPPORT
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4">
            LOGIN
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4">
            SIGN UP
          </button>
        </div>
        <div className="flex items-center">
          <FaPhone className="mr-1" />
          <span className="ml-1">+94 123 456 789</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
