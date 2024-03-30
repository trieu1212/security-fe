import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apis/authApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { logout } from "../../redux/authSlice";
// import "./Header.css";
import { getUserCart } from "../../redux/apis/cartApiRequests";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const location = useLocation();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector(
    (state) => state.auth.login?.currentUser?.refreshToken
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logout, refreshToken);
  useEffect(() => {
    if (user) {
      getUserCart(dispatch, axiosJWT, accessToken, user.id);
    }
  }, [user]);
  const cart = useSelector((state) => state.cart?.currentCart);
  const handleLogout = (e) => {
    e.preventDefault();
    const data = {
      refreshToken: refreshToken,
    };
    logoutUser(axiosJWT, dispatch, navigate, accessToken, data);
  };
  const handleMoveToCartPage = () => {
    navigate(`/cart`);
  };
  const handleMoveToOrderHistoryPage = () => {
    navigate(`/order-history`);
  };
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <>
      {/* <header>
        <div id="header">
          <Link to="/" class="logo">
            <img src={logo} alt="" />
          </Link>
          <div id="menu">
            <div class="item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div class="item">
              <Link to="/product">Sản phẩm</Link>
            </div>
            <div class="item">
              <Link to="/contact">Liên hệ</Link>
            </div>
            {user?.isAdmin && user?.accessToken ? (
              <div class="item">
                <Link to="/admin/category">ADMIN</Link>
              </div>
            ) : null}
          </div>
          <div id="actions">
            <div class="item itemUser">
              {accessToken ? (
                <button className="buttonLogout" onClick={handleLogout}>
                  Đăng xuất
                </button>
              ) : (
                <Link
                  className="buttonLogin"
                  to="/login"
                  style={{ color: "black" }}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
            <div style={{ fontSize: "20px" }} class="item itemCart">
              {user ? (
                <i
                  style={{ marginLeft: " 1rem" }}
                  class="fa-solid fa-address-card fa-lg"
                  onClick={handleMoveToOrderHistoryPage}
                ></i>
              ) : null}
              <i
                class="fa-solid fa-cart-shopping fa-lg"
                style={{ marginLeft: " 1rem" }}
                onClick={handleMoveToCartPage}
              ></i>{" "}
              {cart ? `(${cart?.length})` : "(0)"}
            </div>
          </div>
        </div>
      </header> */}
      <header className="container-fluid bg-light py-3 mt-1">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Logo" className="img-fluid" />
                    </Link>
                </div>
                <div className="col-md-6">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/product" className="nav-link">Sản phẩm</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/contact" className="nav-link">Liên hệ</Link>
                            </li> */}
                            {user?.isAdmin && user?.accessToken && (
                                <li className="nav-item">
                                    <Link to="/admin/category" className="nav-link">ADMIN</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className="col-md-3 d-flex justify-content-end align-items-center">
                    {accessToken ? (
                        <button className="btn btn-primary mr-3" onClick={handleLogout}>Đăng xuất</button>
                    ) : (
                        <Link to="/login" className="btn btn-outline-primary mr-3">Đăng nhập</Link>
                    )}
                    <div className="cart-icon" style={{ cursor:"pointer" }} onClick={handleMoveToCartPage}>
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        <span className="cart-count">{cart ? `(${cart.length})` : "(0)"}</span>
                    </div>
                    {user && (
                        <div className="order-history-icon ml-3" style={{ cursor:"pointer" }} onClick={handleMoveToOrderHistoryPage}>
                            <i className="fa-solid fa-address-card fa-lg"></i>
                        </div>
                    )}
                </div>
            </div>
        </header>
    </>
  );
};

export default Header;
