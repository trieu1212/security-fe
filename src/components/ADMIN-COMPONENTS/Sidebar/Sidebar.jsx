import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <>
        <div class="sidebar">
        <ul>
            <li><Link to="/admin/category">Danh mục</Link></li>
            <li><Link to="/admin/product">Sản phẩm</Link></li>
            <li><Link to="/admin/user">Người dùng</Link></li>
        </ul>
    </div>
    </>
  )
}

export default Sidebar