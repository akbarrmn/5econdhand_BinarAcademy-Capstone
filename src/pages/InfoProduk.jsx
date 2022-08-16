import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import FormProduct from '../components/form/produk/FormProduct'

const InfoProduk = () => {
  return (
    <>
      <Navbars info={'Lengkapi Detail Produk'}/>
      <FormProduct/>
    </>
  )
}

export default InfoProduk