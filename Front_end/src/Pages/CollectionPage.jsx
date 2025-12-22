import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideBar from '../Components/Products/FilterSideBar';
import SortOption from '../Components/Products/SortOption';
import ProductGrid from '../Components/Products/ProductGrid';
const fetchedProducts = [
  {
    _id: 1,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=10',
      },
    ],
  },
  {
    _id: 2,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=11',
      },
    ],
  },
  {
    _id: 3,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=12',
      },
    ],
  },
  {
    _id: 4,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=13',
      },
    ],
  },
  {
    _id: 6,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=18',
      },
    ],
  },
  {
    _id: 7,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=17',
      },
    ],
  },
  {
    _id: 8,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=22',
      },
    ],
  },
  {
    _id: 9,
    name: 'PRODUCT1',
    price: 100,
    Images: [
      {
        url: 'https://picsum.photos/500/500?random=19',
      },
    ],
  },
];
export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(fetchedProducts);
    }, 0);
    return () => clearTimeout(timer);
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
        <ProductGrid product={fetchedProducts} />
      </div>
    </div>
  );
}
