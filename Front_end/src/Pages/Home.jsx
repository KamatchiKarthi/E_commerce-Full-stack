import React, { useEffect, useState } from 'react';
import Hero from '../Components/Layout/Hero';
import GenderCollection from '../Components/Products/GenderCollection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';
import ProductGrid from '../Components/Products/ProductGrid';
import FeatureCollection from '../Components/Products/FeatureCollection';
import FeaturesSection from '../Components/Products/FeaturesSection';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: 'Women',
        category: 'Bottom Wear',
        limit: 8,
      })
    );

    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">loading best seller product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products ?? []} loading={loading} error={error} />
      </div>
      <FeatureCollection />
      <FeaturesSection />
    </div>
  );
}
