import React, { useEffect } from "react";
import star from "../../assets/images/star.png";
import "./HomeProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getHomeProduct } from "../../redux/apis/productApiRequests";
import { Link } from "react-router-dom";
const HomeProduct = () => {
  const dispatch = useDispatch();
  const limit = 3;
  useEffect(() => {
    getHomeProduct(dispatch, limit);
  }, []);
  const products = useSelector((state) => state.product?.homeProduct);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <>
      <div id="wp-products">
        <h2>SẢN PHẨM TIÊU BIỂU CỦA CHÚNG TÔI</h2>
        <ul id="list-products">
            {products && products.map((product, index) => {
               return (
                <>
                    {product.inStock ?(
                        <>
                        <div class="item">
                            <Link to={`product/${product.id}`}><img className="productImage" src={product.image} alt="" /></Link>
                            <div class="name">{product.title}</div>
                            <div class="desc">{product.description}</div>
                            <div class="priceProduct">{formatPrice(product.price)}</div>
                        </div>
                        </>
                    ):""}
                </>
               )     
            })}
        </ul>
      </div>
    </>
  );
};

export default HomeProduct;
