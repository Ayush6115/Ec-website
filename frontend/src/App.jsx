import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles/App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import AllProduct from './pages/AllProduct';
import MensCategory from './pages/MensCategory';
import WomensCategory from './pages/WomensCategory';
import KidsCategory from './pages/KidsCategory';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import MyOrderPage from './pages/MyOrderPage';
import DetailedProduct from './pages/DetailedProduct';
import AdminLoginPage from './pages/AdminLoginPage';

// Admin Page
import AddProduct from './admin/pages/AddProduct';
import AdminLayout from './admin/pages/AdminLayout';
import UpdateProduct from './admin/pages/UpdateProduct';
import UpdateProductForm from './admin/pages/UpdateProductForm';
import UpdateOrder from './admin/pages/UpdateOrder';
import UpdateOrderForm from './admin/pages/UpdateOrderForm';
import AllMessages from './admin/pages/AllMessages';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, [location]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<MyOrderPage />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/men" element={<MensCategory />} />
        <Route path="/women" element={<WomensCategory />} />
        <Route path="/kids" element={<KidsCategory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/product/:id" element={<DetailedProduct />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/add-product" />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product" element={<UpdateProduct />} />
          <Route path="update-product-form/:id" element={<UpdateProductForm />} />
          <Route path="update-order" element={<UpdateOrder />} />
          <Route path="update-order-form/:id" element={<UpdateOrderForm />} />
          <Route path="message" element={<AllMessages />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
