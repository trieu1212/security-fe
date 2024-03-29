import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Checkout from '../pages/Checkout/Checkout';
import Cart from '../pages/Cart/Cart';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import AllProduct from '../pages/AllProduct/AllProduct';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useLocation } from "react-router-dom";
const PublicRoute = () => {
  const location = useLocation();
  const renderHeader = !location.pathname.includes("/admin");
  const renderFooter = !location.pathname.includes("/admin");
  return (
    <>
    {renderHeader && <Header />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/cart/" element={<Cart />} />
          <Route exact path="/order-history" element={<OrderHistory/>}/>
          <Route exact path="/product" element={<AllProduct/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
    {renderFooter && <Footer />} 
    </>
  )
}

export default PublicRoute