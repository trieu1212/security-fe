import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/images/logo.png";
const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <>
      <div id="footer">
        <div class="box">
          <div class="logo">
            <img src={logo} alt="" />
          </div>
          <p>Cung cấp sản phẩm với chất lượng an toàn cho quý khách</p>
        </div>
        <div class="box">
          <h3>NỘI DUNG</h3>
          <ul class="quick-menu">
            <div class="item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div class="item">
              <Link to="/">Sản phẩm</Link>
            </div>
            <div class="item">
              <Link to="/contact">Liên hệ</Link>
            </div>
          </ul>
        </div>
        <div class="box">
          <h3>LIÊN HỆ</h3>
          <form action="">
            <input type="text" placeholder="Địa chỉ email" />
            <button>Nhận tin</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
