import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminProduct from "./pages/ADMIN-PAGES/Product/AdminProduct";
import AdminUser from "./pages/ADMIN-PAGES/User/AdminUser";
import AdminCategory from "./pages/ADMIN-PAGES/Category/AdminCategory";
import Header from "./components/ADMIN-COMPONENTS/Header/Header";
import Footer from "./components/ADMIN-COMPONENTS/Footer/Footer";
import { useEffect } from "react";
import Sidebar from "./components/ADMIN-COMPONENTS/Sidebar/Sidebar";
function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const renderHeader = location.pathname.includes("/admin");
  const renderFooter = location.pathname.includes("/admin");
  const renderSidbar = location.pathname.includes("/admin");
  useEffect(()=>{
    if(location.pathname === "/admin" || location.pathname === "/admin/"){
      navigate("/admin/category")
    }
  },[location.pathname,navigate])
  return (
    <>
      <div className="app">
        <PublicRoute />
        {renderHeader && <Header />}
        {renderSidbar && <Sidebar />}
        <div className="content">
          <AdminRoute path="/admin/product" children={<AdminProduct />} />
          <AdminRoute path="/admin/user" children={<AdminUser/>} />
          <AdminRoute path="/admin/category" children={<AdminCategory/>} />
        </div>
        {renderFooter && <Footer />}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
