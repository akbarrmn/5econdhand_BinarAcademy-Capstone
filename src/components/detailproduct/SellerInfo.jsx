import { Box, Typography } from '@mui/material'
import React from 'react'

const SellerInfo = ({data}) => {
  return (
    <>
        <Box component={'div'} rowGap={2} p={4} display={'flex'} mt={3} sx={{ boxShadow:'0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius:'16px'}}>
            <Box component={'img'} src={data.user ? `https://be-kel1.herokuapp.com/public/profile/${data.user.image}` : ''} sx={{ maxHeight:'48px',maxWidth:'48px',objectFit:'cover' ,borderRadius:'12px' }}/>
            <Box display={'flex'} flexDirection={'column'} ml={2}>
                <Typography>{data.user ? data.user.name : ''}</Typography>
                <Typography>{data.user ? data.user.city : ''}</Typography>
            </Box>
        </Box>
    </>
  )
}

export default SellerInfo