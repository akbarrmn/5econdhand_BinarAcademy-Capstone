import { Box, Button } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

import { Swiper, SwiperSlide } from "swiper/react";

const FilterCategory = ({clicked, setClicked}) => {
  let items = [];
  let keys = ['Semua', 'Hobi', 'Kendaraan', 'Baju', 'Elektronik', 'Kesehatan']
  keys.map((item)=>{
    items.push(
      <SwiperSlide className='filter-button' key={item}><Button className={item === clicked ? 'button-active button-controll' : 'button-controll'} onClick={()=>setClicked(item)}><SearchIcon/>{item} </Button></SwiperSlide>
    )
  })

  return (
    <>
      <Box mt={3}>
        <Swiper
          slidesPerView={"auto"}
          className="mySwiper"
        >
          {items}
        </Swiper>
      </Box>
    </>

  )
}

export default FilterCategory

