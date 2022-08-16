import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import Wishlists from '../components/wishlist/Wishlist'

const Wishlist = () => {
  return (
    <>
        <Navbars info={'Wishlist'}/>
        <Wishlists/>
    </>
  )
}

export default Wishlist