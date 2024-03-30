import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./OrderHistory.css";
import { getUserOrder } from "../../redux/apis/orderApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const OrderHistory = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  const navigate = useNavigate();
  useEffect(() => {
    getUserOrder(dispatch, axiosJWT, user?.accessToken, user?.id);
  }, []);
  const order = useSelector((state) => state.order.currentOrder);
  const hanldeJsonData = (data) => {
    const parsedData = JSON.parse(data);
    return (
      <div>
        <p>
          {parsedData.address}, {parsedData.nation}
        </p>
      </div>
    );
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  if (!user) {
    navigate("/");
  }
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
        Đơn hàng đã mua
      </h1>
      <div className="contentContainer">
        <div className="info">
          <div className="infoUser">
            <i
              style={{ fontSize: "50px", marginBottom: "2rem" }}
              class="fa-solid fa-user-large fa-2xl"
            ></i>
            <h3>{user?.username}</h3>
            <p style={{ marginBottom: "0.5rem" }}>{user?.email}</p>
          </div>
        </div>
        <div className="orderHistory">
          {order && order.length>0 ? (
            order.map((item) => {
              return (
                <>
                  <div className="orderHistoryItem">
                  <div className="orderItems">
                      {item?.OrderItems?.map((orderItem) => {
                        return (
                            <div className="orderItems-1">
                              <Link to={`/product/${orderItem?.Product.id}`}><img src={orderItem?.Product?.image} alt="" /></Link>
                              <div>
                                <div>{orderItem?.Product?.title}</div>
                                <div>x{orderItem?.quantity}</div>
                                <div>
                                  {formatPrice(orderItem?.Product?.price)}
                                </div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                    <div>Địa chỉ: {hanldeJsonData(item.address)}</div>
                    <div>Trạng thái: {item.status}!</div>
                    <div style={{ color:"red", fontSize:"22px" }}>{formatPrice(item.amount)}</div>
                  </div>
                </>
              );
            })
          ) : (
            <h1 style={{ textAlign:"center" }}>Không có đơn hàng nào</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
