import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserCart, getUserCart } from "../../redux/apis/cartApiRequests";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../services/axiosJWT";
import { updateProductQuantity } from "../../redux/apis/cartApiRequests";
import "./Cart.css";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartChanged, setCartChanged] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.currentCart);
  const isFetchingCart = useSelector((state) => state.cart?.isFetching);
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  //load cart khi có xự thay đổi
  useEffect(() => {
    if (cartChanged && cart) {
      cartList(cart);
      setCartChanged(false);
    }
  }, [cartChanged, cart]);
  //load cart khi render lần đầu
  useEffect(() => {
    if (cart) {
      cartList(cart);
    }
  }, []);
  //xử lý cart khi có các sản phẩm trùng nhau
  const cartList = (cartItems) => {
    const groupedItems = cartItems.reduce((acc, currentItem) => {
      const existingItem = acc.find(
        (item) => item.productId === currentItem.productId
      );
      if (existingItem) {
        existingItem.quantity += currentItem.quantity;
      } else {
        acc.push({ ...currentItem });
      }
      return acc;
    }, []);
    setCartItems(groupedItems);
    getTotalPrice(groupedItems);
  };
  //tính tổng giá tiền
  const getTotalPrice = (cartItems) => {
    let total = 0;
    cartItems.map((item) => {
      total += item.Product.price * item.quantity;
    });
    setTotalPrice(total);
  };
  //chuyển qua trang checkout
  const handleNavigateToCheckout = () => {
    navigate("/checkout", { state: { totalPrice: totalPrice } });
  };
  //Xóa sản phẩm khỏi giỏ hàng
  const handleDeleteProduct = async (productId) => {
    await deleteUserCart(
      productId,
      dispatch,
      axiosJWT,
      user?.accessToken,
      user?.id
    );
    await getUserCart(dispatch, axiosJWT, user?.accessToken, user?.id);
    setCartChanged(true);
  };
  //Tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrease = async (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity < 10) {
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
      const data = {
        productId: newCartItems[index].productId,
        quantity: newCartItems[index].quantity,
      };
      await updateProductQuantity(
        data,
        dispatch,
        axiosJWT,
        user?.accessToken,
        user?.id
      );
      await getUserCart(dispatch, axiosJWT, user?.accessToken, user?.id);
      setCartChanged(true);
    } else {
      return;
    }
  };
  //giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = async (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      const data = {
        productId: newCartItems[index].productId,
        quantity: newCartItems[index].quantity,
      };
      await updateProductQuantity(
        data,
        dispatch,
        axiosJWT,
        user?.accessToken,
        user?.id
      );
      await getUserCart(dispatch, axiosJWT, user?.accessToken, user?.id);
      setCartChanged(true);
    } else {
      return;
    }
  };
  //forrmart giá tiền thành tiền tệ việt nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <>
      {!user ? (
        <h2 style={{ textAlign:"center",marginTop:"2rem", }}>Hãy<Link to="/login" style={{ textDecoration:"none" }}> đăng nhập </Link> để xem giỏ hàng</h2>
      ) : (
        <div className="main">
          {cartItems.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>Giỏ hàng trống</h2>
          ) : (
            <div className="cart">
              {cartItems.map((item, index) => {
                return (
                  <>
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                          <img
                            src={item.Product.image}
                            alt=""
                            height={80}
                            width={60}
                          />
                        </div>
                        <div className="item-details">
                          <h3 style={{fontSize:"40px" }}>{item.Product.title}</h3>
                          <p>Giá: {formatPrice(item.Product.price)}</p>
                        </div>
                        <div className="counter">
                          <button
                            class="btn minus"
                            onClick={() => handleDecrease(index)}
                            disabled={isFetchingCart ? true : false}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="quantity"
                            readonly
                            style={{ width: "20%" }}
                            min={1}
                            max={10}
                            role="spinbutton"
                            aria-live="assertive"
                            aria-valuenow="1"
                            value={item.quantity}
                          />
                          <button
                            class="btn plus"
                            onClick={() => handleIncrease(index)}
                            disabled={isFetchingCart ? true : false}
                          >
                            +
                          </button>
                        </div>
                        <div className="btnDelete">
                          <button
                            onClick={() => handleDeleteProduct(item.productId)}
                          >
                            Xóa
                          </button>
                        </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          <hr />
          <div className="totalPrice">
            {cart.length > 0 ? (
              <>
                <div>
                  <h2>Tổng giá: {formatPrice(totalPrice)} </h2>
                  <button className="payment" onClick={handleNavigateToCheckout}><i class="fa-solid fa-money-check"> </i> Checkout!</button>
                </div>
              </>
            ) : (
                <p style={{ textAlign: "center" }}>
                  Xem thêm sản phẩm khác <Link style={{ textDecoration:"none" }} to="/product"><b>Xem Ngay!</b></Link>
                </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
