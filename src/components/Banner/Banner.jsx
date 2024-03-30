import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Banner.css";
import img1 from "../../assets/images/7.jpg";
import img2 from "../../assets/images/8.jpg";
import img3 from "../../assets/images/9.jpg";
import arrow_down from "../../assets/images/to_bottom.png";
const Banner = () => {
  const navigate = useNavigate();
  const style = {
    boderRadius: "20px",
  };
  const handleToProduct = () => {
    navigate("/product");
  };
  return (
    <>
      <div id="banner" className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12 box-left">
            <h2>
              <span>THỜI TRANG</span>
              <br />
              <span>ĐỘC ĐÁO</span>
            </h2>
            <p>
              Cung cấp đa dạng các phong cách thời trang, từ thanh lịch, cá tính
              đến năng động, giúp bạn dễ dàng tìm kiếm trang phục phù hợp với cá
              tính riêng của mình.
            </p>
            <button className="btn btn-primary" onClick={handleToProduct}>
              Mua ngay
            </button>
          </div>
          <div className="col-md-6 col-sm-12 box-right">
            <img src={img1} alt="" style={style} className="img-fluid" />
            <img src={img2} alt="" style={style} className="img-fluid" />
            <img src={img3} alt="" style={style} className="img-fluid" />
          </div>
        </div>
        <div className="to-bottom">
          <Link to="">
            <img src={arrow_down} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
