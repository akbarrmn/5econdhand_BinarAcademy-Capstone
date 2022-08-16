import { Box } from '@mui/material'
import React from 'react'
import ProductDetails from '../components/detailproduct/main/ProductDetails'
import Navbars from '../components/header/navbar/Navbars'

const DetailProductBuyer = () => {
  return (
    <>
        <Box display={{ md:'block', xs:'none' }}>
          <Navbars/>
        </Box>
        <ProductDetails status={'buyer'}/>
    </>
  )
}

export default DetailProductBuyer