import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from 'aos';
import('../assets/css/remixicon.css');
import 'aos/dist/aos.css';
import Home from './Home';
import Header from '../comp/Header';
import Footer from '../comp/Footer';
import BackToTop from '../comp/BackToTop';
import Register from './Register';
import Error404 from './Error404';
import Checkout from './Checkout';
import Login from './Login';
import Wishlist from './Wishlist';
import Product from './Product';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
function User() {
  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
  });
  setTimeout(() => {
    AOS.refresh();
  }, 100);
}, []);
  return (
    <div className="website-wrap">
      
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
     <Footer/>
     <BackToTop/>
    </div>
  )
}

export default User