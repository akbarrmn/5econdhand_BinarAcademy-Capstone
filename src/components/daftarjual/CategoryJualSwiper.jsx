import React from 'react';
import { Box, Button } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CategoryJualSwiper = ({category, clicked}) => {
  return (
    <Box >
      <Swiper
        slidesPerView={"auto"}
        className="mySwiper"
      >
        <SwiperSlide className='filter-button'><Button className={'Semua Produk' === clicked ? 'button-active button-controll' : 'button-controll'} onClick={()=>category('Semua Produk')}><ListAltIcon sx={{ mr:.5 }} />Produk </Button></SwiperSlide>
        <SwiperSlide className='filter-button'><Button className={'Diminati' === clicked ? 'button-active button-controll' : 'button-controll'} onClick={()=>category('Diminati')}><FavoriteBorderIcon sx={{ mr:.5 }} />Diminati </Button></SwiperSlide>
        <SwiperSlide className='filter-button'><Button className={'Terjual' === clicked ? 'button-active button-controll' : 'button-controll'} onClick={()=>category('Terjual')}><MonetizationOnOutlinedIcon sx={{ mr:.5 }} />Terjual </Button></SwiperSlide>
      </Swiper>
    </Box>
  )
}

export default CategoryJualSwiper