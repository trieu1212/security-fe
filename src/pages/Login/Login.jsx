import React from "react";
import { useState, useEffect } from "react";
import { loginUser } from "../../redux/apis/authApiRequests";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import InputForm from "../../components/InputForm/InputForm";
import "./Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isFetching = useSelector((state) => state.auth.login?.isFetching);
  console.log(isFetching);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    loginUser(data, dispatch, navigate);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="container">
        <h1>Đăng Nhập</h1>
        <form className="formLogin" onSubmit={handleSubmit}>
          <div className="inputForm">
          <label htmlFor="username">Username</label>
            <InputForm
              data={username}
              setData={setUsername}
              placeholder="Nhập username"
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
          <input type="submit" value="Đăng nhập" disabled={isFetching? true : false}/>
        </form>
        <p>
          Chưa có tài khoản?{" "}
          <Link className="linkRegister" to="/register">
            <b>Đăng kí ngay!</b>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
