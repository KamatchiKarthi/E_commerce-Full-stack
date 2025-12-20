import React from 'react';
import Hero from '../Components/Layout/Hero';
import GenderCollection from '../Components/Products/GenderCollection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';
import ProductGrid from '../Components/Products/ProductGrid';
import FeatureCollection from '../Components/Products/FeatureCollection';
import FeaturesSection from '../Components/Products/FeaturesSection';

const placeholderProducts = [
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
  }, {
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
export default function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid product={placeholderProducts}/>
      </div>
      <FeatureCollection />
      <FeaturesSection/>
    </div>
  );
}
