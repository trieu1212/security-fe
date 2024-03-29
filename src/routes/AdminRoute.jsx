import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = (props) => {
  const admin = useSelector((state) => state.auth.login?.currentUser?.isAdmin);
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  return (
    <>
      <Routes>
        <Route
          path={props.path}
          element={admin && accessToken ? props.children : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default AdminRoute;
