import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-8 mt">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="relative w-full sm:w-1/2 md:w-auto mb-4sm:mb-0 border-r-4 border-gray-700 pr-4">
          <div className="absolute top-0 left-10">
            <h2 className="text-lg font-bold">XPRESS HIRELY</h2>
          </div>
          <img src="/carLogo.png" alt="XpressHirely" className="mr-0" />
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h2 className="text-lg font-bold mb-2">Overview</h2>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Contact </li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Direct Bookings</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex items-center">
            <SocialIcon
              url="www.facebook.com"
              style={{ height: 40, width: 40 }}
              className="mr-4"
            />
            <SocialIcon
              url="www.twitter.com"
              style={{ height: 40, width: 40 }}
              className="mr-4"
            />
            <SocialIcon
              url="www.instagram.com"
              style={{ height: 40, width: 40 }}
              className="mr-4"
            />
            <SocialIcon
              url="www.youtube.com"
              style={{ height: 40, width: 40 }}
              className="mr-4"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0 space-y-2 border-r-4 border-gray-600 pr-16">
          <h3 className="text-lg font-bold mb-2 ">Hotline & E-mail</h3>
          <p>+94 123 456 789</p>
          <p>contact@xpresshire.lk</p>
          <p>No. 28, Moratuwa, Sri Lanka</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Payments</h3>
          <div className="flex">
            <img src="/visaLogo.png" alt="Visa" className="mr-2" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
