import React from 'react'
import logo from '../../../assets/images/logo.png'
import './Header.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
  const user = useSelector((state)=>state.auth.login?.currentUser)
  return (
    <>
        <header>
          <div className='headerContainer'>
            <div className="logo">
              <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className="user">
                <div className='userIcon'>
                <i class="fa-solid fa-user-ninja fa-2xl"></i>
                {user?.isAdmin && <cite>Admin</cite>}
                </div>
              <div className='userName'>
              <p>{user?.username}</p>
              </div>
            </div>
          </div>
        </header>
    </>
  )
}

export default Header