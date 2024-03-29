import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputForm from "../../components/InputForm/InputForm";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import { createOrder } from "../../redux/apis/orderApiRequests";
import { getUserCart } from "../../redux/apis/cartApiRequests";
import "./Checkout.css";
const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [nation, setNation] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cart = useSelector((state) => state.cart?.currentCart);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  const navigate = useNavigate();
  const totalPrice = location?.state?.totalPrice;
  if (!user) {
    navigate("/");
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const handleSetCOD = () => {
    setPayment("COD");
  }
  const handleSetCard = () => {
    setPayment("Thẻ tín dụng");
  }
  const handleOrder = async () => {
    if(!address || !nation || !payment){
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    else if(payment === 'Thẻ tín dụng'){
      toast.warning('Chức năng này đang được phát triển');
    }else{
      const data = {
        amount: totalPrice,
        address: {
          address: address,
          nation: nation,
        },
        products: cart,
      };
      await createOrder(
        data,
        dispatch,
        navigate,
        axiosJWT,
        user?.accessToken,
        user?.id
      );
      await getUserCart(dispatch, axiosJWT, user?.accessToken, user?.id);
    }
  }
  return (
    <>
      <div className="checkoutContainer">
        <div className="checkoutInfo">
          <h1 style={{ textAlign: "center" }}>Thông tin thanh toán</h1>
          <div className="checkoutInput">
            <InputForm type="text" data={user?.username} disabled={true} />
            <br />
            <InputForm type="text" data={user?.email} disabled={true} />
            <br />
            <InputForm
              type="text"
              placeholder="Nhập Địa chỉ"
              data={address}
              setData={setAddress}
            />
            <br />
            <InputForm
              type="text"
              placeholder="Nhập quốc gia"
              data={nation}
              setData={setNation}
            />
            <br />
            <div className="paymentMethod">
              <div>
                <button onClick={handleSetCOD} >Thanh toán: COD</button>
              </div>
              <div>
                <button onClick={handleSetCard}>
                  Thanh toán: Thẻ tín dụng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="checkoutOrder">
          <div>
            {cart?.map((item) => {
              return (
                <>
                  <div className="checkoutOrderitems">
                    <Link to={`/product/${item.Product.id}`}><img src={item.Product.image} alt="" /></Link>
                    <h3>{item.Product.title}</h3>
                    <h3>Số lượng: {item.quantity}</h3>
                    <h3>Giá: {formatPrice(item.Product.price)}</h3>
                  </div>
                </>
              );
            })}
          </div>
          <div className="confirmOrder">
            <h2>Phương thức thanh toán: {payment}</h2>
            <p>Tổng tiền: <b style={{ fontSize:"22px" }}>{formatPrice(totalPrice)}</b></p>
            <div className="btnConfirmOrder">
              <button onClick={handleOrder}>Xác nhận đơn hàng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
