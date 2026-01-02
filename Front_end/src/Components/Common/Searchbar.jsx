import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  fetchProductsByFilters,
  setFilters,
} from '../../redux/slices/productSlice';

export default function Searchbar() {
  const [searchterm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchToogle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = e => {
    e.preventDefault();
    dispatch(setFilters({ search: searchterm }));
    dispatch(fetchProductsByFilters({ search: searchterm }));
    navigate(`/collection/all?search=${searchterm}`);
    setIsOpen(false);
    setSearchTerm('');
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'
      } `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="search"
              value={searchterm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounder-lg focus:outline-none w-full"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchToogle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToogle}>
          <FaSearch className="h-6 w-4" />
        </button>
      )}
    </div>
  );
}
