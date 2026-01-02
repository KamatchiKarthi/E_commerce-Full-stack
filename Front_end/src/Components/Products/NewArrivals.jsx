import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';

export default function NewArrivals() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startx, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = e => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startx;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUporLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {};
  const scroll = direction => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: 'smooth' });
  };
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rigthScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setScrollRight(rigthScrollable);
    }
    // console.log({
    //   scrollLeft: container.scrollLeft,
    //   cilentwidth: container.clientWidth,
    //   containerscrollwidth: container.scrollWidth,
    //   offseyleft: scrollRef.current.offsetLeft,
    // });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [newArrivals]);
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straigth off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        {/* scroll buttons */}
        <div className="absolute right-0 -bottom-7.5 flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? 'bg-white text-black'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded border ${
              canScrollRight
                ? 'bg-white text-black'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      {/* scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUporLeave}
      >
        {newArrivals.map(product => (
          <div
            key={product._id}
            className="min-w-full sm:min-w-[40%] lg:min-w-[30%] relative"
          >
            <img
              className="w-full h-125 object-cover rounded-lg"
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 opacity-100 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
