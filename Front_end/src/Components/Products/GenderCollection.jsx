import React from 'react';

import mensCollection from '../../assets/mens-collection.webp';
import womenCollection from '../../assets/womens-collection.webp';
import { Link } from 'react-router';

export default function GenderCollection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex-col flex md:flex-row gap-8">
        {/* woman collection */}
        <div className="relative flex-1">
          <img
            src={womenCollection}
            alt="woman collection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-3">
          <h2 className='text-2xl font-bold text-gray-900 mb-3'>
            Women's Collection</h2>
            <Link to='/Collection/all/gender=Women' className='text-gray-900 underline'>
            Shop Now</Link>
            </div>
        </div>
        {/* mens collection */}
          <div className="relative flex-1">
          <img
            src={mensCollection}
            alt="woman collection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-3">
          <h2 className='text-2xl font-bold text-gray-900 mb-3'>
            men's Collection</h2>
            <Link to='/Collection/all/gender=men' className='text-gray-900 underline'>
            Shop Now</Link>
            </div>
        </div>
      </div>
    </section>
  );
}
