import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apis/authApiRequests";
import InputForm from "../../components/InputForm/InputForm";
import "./Register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      const data = {
        username: username,
        email: email,
        password: password,
      };
      registerUser(data, dispatch, navigate);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="container">
        <h1>Đăng ký</h1>
        <form className="formRegister" onSubmit={handleRegister}>
          <div className="inputForm">
            <label htmlFor="username">Username</label>
            <InputForm
              data={username}
              setData={setUsername}
              placeholder="Nhập username"
              type="text"
            />
            <label htmlFor="">Email</label>
            <InputForm
              data={email}
              setData={setEmail}
              placeholder="Nhập email"
              type="text"
            />
            <label htmlFor="password">Password</label>
            <InputForm
              data={password}
              setData={setPassword}
              placeholder="Nhập password"
              type="password"
            />
          </div>
            <input type="submit" value="Đăng ký"/>
        </form>
        <p>
          Đã có tài khoản?{" "}
          <Link className="linkLogin" to="/login">
            <b>Đăng nhập ngay!</b>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
