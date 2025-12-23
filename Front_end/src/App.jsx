import React, { Profiler } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import UserLayout from './Components/Layout/UserLayout';
import Home from './Pages/Home';
import { Toaster } from 'sonner';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/pROFILE.JSX';
import CollectionPage from './Pages/CollectionPage';
import ProductDetails from './Components/Products/ProductDetails';
import CheckOut from './Components/Cart/CheckOut';
import OrderConfirmation from './Pages/OrderConfirmation';
import OrderDetailsPage from './Pages/OrderDetailsPage';
import MyordersPage from './Pages/MyordersPage';
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collection/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyordersPage />} />
          {/* user layout */}
        </Route>
        <Route>{/* admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
}
