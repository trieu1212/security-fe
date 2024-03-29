import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'
import HomeProduct from '../../components/HomeProduct/HomeProduct'
import SaleOff from '../../components/SaleOff/SaleOff'
import HomeComment from '../../components/HomeComment/HomeComment'
import './Home.css'
const Home = () => {
  return (
    <>
        <div className='homeContainer'>
          <Banner />
          <HomeProduct />
          <SaleOff />
          <HomeComment />
        </div>
    </>
  )
}

export default Home