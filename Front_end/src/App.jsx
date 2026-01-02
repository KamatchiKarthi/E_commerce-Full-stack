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
import AdminLayout from './Components/Admin/AdminLayout';
import AdminHomePage from './Pages/AdminHomePage';
import UserManagement from './Components/Admin/UserManagement';
import ProductManagement from './Components/Admin/ProductManagement';
import EditProductPage from './Components/Admin/EditProductPage';
import OrderManagement from './Components/Admin/OrderManagement';

import { Provider } from 'react-redux';
import store from './redux/store';
import ProductedRoute from './Components/Common/ProductedRoute';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* user layout */}

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
          </Route>
          <Route>
            {/* admin layout */}
            <Route
              path="/admin"
              element={
                <ProductedRoute role="admin">
                  <AdminLayout />
                </ProductedRoute>
              }
            >
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
              <Route path="orders" element={<OrderManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
