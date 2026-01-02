import React, { useEffect, useState } from 'react';
import register from '../assets/register.webp';
import { Link, useLocation, useNavigate } from 'react-router';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

export default function Register() {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  // get redirect parameter and check if it's checlout ot something
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const isCheckoutRedirect = redirect.includes('checkout');

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? 'checkout' : '/');
        });
      } else {
        navigate(isCheckoutRedirect ? '/checkout' : '/');
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);
  const handleSumbit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSumbit}
          className="w-full max-w-md bg-white border-gray-200 p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Ocean</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! </h2>
          <p className="text-center mb-6">
            Enter Your username and password to login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name "
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => SetEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => SetPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold
           hover:bg-gray-800"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="register to account"
            className="h-187 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
