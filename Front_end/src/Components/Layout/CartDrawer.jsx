import React, { useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router';

export default function CartDrawer({ drawerOpen, toggleDrawer }) {
  const navigate = useNavigate()
  const handleCheckOut  = () => {
    navigate('/checkout')
  }
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4  ">
        <button onClick={toggleDrawer}>
          <HiMiniXMark className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {/* cart content scrollable area */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* component for cart content */}
        <CartContent/>
      </div>
      {/* checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        <button onClick={handleCheckOut} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
          Checkout
        </button>
        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping,taxes, and discount codes</p>
      </div>
    </div>
  );
}
