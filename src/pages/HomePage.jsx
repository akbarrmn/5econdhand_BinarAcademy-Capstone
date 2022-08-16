import React from 'react'
import Banner from '../components/header/Banner'
import Navbars from '../components/header/navbar/Navbars'
import Products from '../components/products/main/Products'

const HomePage = () => {
  
  return (
    <>
      <Navbars />
      <Banner />
      <Products />
    </>
  )
}

export default HomePage