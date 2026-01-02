import React from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function CartDrawer({ drawerOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const { user, guestId } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const userId = user ? user._id : null;
  const handleCheckOut = () => {
    toggleDrawer();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div
      className={`fixed  top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
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
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty</p>

        )}
      </div>
      {/* checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckOut}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping,taxes, and discount codes
            </p>
          </>
        )}
      </div>
    </div>
  );
}
