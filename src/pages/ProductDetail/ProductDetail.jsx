import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/apis/productApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import {
  addCommentByUser,
  deleteCommentByUser,
  getProductComments,
} from "../../redux/apis/commentApiRequests";
import {
  addUserCart,
  getUserCart,
  updateUserCart,
} from "../../redux/apis/cartApiRequests";
import "./ProductDetail.css";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector(
    (state) => state.auth.login?.currentUser?.refreshToken
  );
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  const cart = useSelector((state) => state.cart?.currentCart);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess, refreshToken);
  const product = useSelector((state) => state.product?.oneProduct);
  const comments = useSelector((state) => state.comment.comments);
  const commentFetching = useSelector((state) => state.comment.isFetching);
  const order = useSelector((state)=>state.order.currentOrder)
  //hàm thêm comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Vui lòng nhập nhận xét");
    } else {
      const data = {
        comment: comment,
        productId: id,
      };
      await addCommentByUser(data, dispatch, axiosJWT, accessToken, user.id);
      await getProductComments(dispatch, id);
    }
    setComment("");
  };
  //hàm xóa comment
  const handleDeleteComment = async (commentId) => {
    await deleteCommentByUser(
      commentId,
      dispatch,
      axiosJWT,
      accessToken,
      user.id
    );
    await getProductComments(dispatch, id);
  };
  //load sản phẩm và comment khi render lần đầu
  useEffect(() => {
    getOneProduct(dispatch, id);
    getProductComments(dispatch, id);
  }, [dispatch, id]);
  //hàm thêm sản phẩm vào giỏ hàng
  const handleAddCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    } else {
      const existProduct = cart.find((item) => item.productId === id);
      if (existProduct) {
        const data = {
          productId: id,
          quantity: existProduct.quantity + quantity,
        };
        await updateUserCart(data, dispatch, accessToken, axiosJWT, user.id);
        await getUserCart(dispatch, axiosJWT, accessToken, user.id);
      } else {
        const data = {
          productId: id,
          quantity: quantity,
        };
        try {
          await addUserCart(data, dispatch, axiosJWT, accessToken, user.id);
          await getUserCart(dispatch, axiosJWT, accessToken, user.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  //hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  //hàm tăng số lượng sản phẩm
  const handleIncrease = (e) => {
    e.preventDefault();
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  //hàm giảm số lượng sản phẩm
  const handleDecrease = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <div className="mainLayout">
        <div id="box">
          {product && (
            <>
              <div className="box-left">
                <img className="productImage" src={product.image} alt="" />
              </div>
              <div className="box-right">
                <h1>{product.title}</h1>
                <p>
                  <i>Danh mục sản phẩm: </i>
                  {product.Category.name}
                </p>
                <p>
                  <i>Mã sản phẩm: </i>
                  {product.id}
                </p>
                <h1 className="price">
                  <i className="priceTitle">Giá tiền: </i>
                  {formatPrice(product.price)}
                </h1>
                <hr />
                <p>
                  <i>Mô tả</i>: {product.description}
                </p>
                <div class="counter">
                  <button class="btn minus" onClick={handleDecrease}>
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
                    value={quantity}
                  />
                  <button class="btn plus" onClick={handleIncrease}>
                    +
                  </button>
                </div>
                <button class="add-to-cart" onClick={handleAddCart}>
                  <i
                    style={{ marginRight: "0.5rem" }}
                    class="fa-solid fa-cart-shopping"
                  ></i>{" "}
                  Thêm vào giỏ
                </button>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="comment">
          <h2 style={{ textAlign: "center", marginBottom:"1rem" }}>Đánh giá sản phẩm</h2>
          <div className="addComment">
            {user ? (
              <>
                <div className="userIcon" style={{ marginRight:"2rem" }}>
                  <i class="fa-solid fa-user fa-2xl"></i>
                  <h3>{user?.username}</h3>
                </div>
                <div className="userComment">
                  <textarea
                    placeholder="Nhập nhận xét"
                    cols="150"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button className="buttonComment" onClick={handleAddComment}>
                    Thêm đánh giá
                  </button>
                </div>
              </>
            ) : (
              <h2>Hãy ĐĂNG NHẬP để bình luận!</h2>
            )}
          </div>
          <div className={comments? "viewComment" : ""}>
          {comments && comments.length>0 ? (
            <div className="viewCommentField" >
              {comments.map((comment) => (
                <div className="viewOneComment" key={comment.id}>
                  <p className="viewCommentInput">
                  <div>
                  <i class="fa-solid fa-user fa-xl"></i> <b>{comment.User?.username}</b> đã bình luận về sản phẩm:{" "}
                    {comment.comment}
                  </div>
                    {user && user.id === comment.userId ? (
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        Xóa
                      </button>
                    ) : (
                      ""
                    )}
                    {commentFetching && user && user.id === comment.userId ? (
                      <p>Đang xóa...</p>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <h3 style={{ textAlign:"center",margin:"0 3rem" }}>Chưa có đánh giá nào cho sản phẩm này</h3>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
