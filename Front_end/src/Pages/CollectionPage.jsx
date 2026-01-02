import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideBar from '../Components/Products/FilterSideBar';
import SortOption from '../Components/Products/SortOption';
import ProductGrid from '../Components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

export default function CollectionPage() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  const handleClickOutSide = e => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden   p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2 " /> Filter
      </button>
      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? ' translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 left-0
        w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4 ">All Collection</h2>
        {/* sort option */}
        <SortOption />
        {/* product grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}
