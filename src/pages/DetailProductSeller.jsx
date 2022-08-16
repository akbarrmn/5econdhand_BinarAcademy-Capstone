import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import ProductDetails from '../components/detailproduct/main/ProductDetails'
import { Box } from '@mui/material'

const DetailProductPage = () => {
  return (
    <>
        <Box display={{ md:'block', xs:'none' }}>
          <Navbars/>
        </Box>
        <ProductDetails status={'seller'}/>
    </>
  )
}

export default DetailProductPage