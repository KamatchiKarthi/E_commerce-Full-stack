import React from 'react';
import { LuHandMetal } from 'react-icons/lu';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';

export default function Topbar() {
  return (
    <div className="bg-viloit-dark text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <LuHandMetal className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaXTwitter className="w-5 h-5" />
          </a>
        </div>
        <div className="text-sm text-center grow ">
          <span>We ship worldwide - Fast and reliable Shipping</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+124567897">+1 (234) 567-890</a>
        </div>
      </div>
    </div>
  );
}
