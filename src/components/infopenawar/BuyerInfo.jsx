import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailTawar } from '../../redux/tawar'

const BuyerInfo = () => {
  const dispatch = useDispatch()
  const detailPenawaran = useSelector(state => state.tawar.detailTawar)

  return (
    <>
      <Box component={'div'} rowGap={2} p={{ xs: 2, md: 4 }} display={'flex'} mt={3} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
        <Box component={'img'} src={Object.keys(detailPenawaran).length !== 0 ? `https://be-kel1.herokuapp.com/public/profile/${detailPenawaran[0].user.image}` : ''} sx={{ height: '50px', width:'50px', objectFit:'cover', borderRadius:'12px' }} />
        <Box display={'flex'} flexDirection={'column'} ml={2}>
          <Typography>{Object.keys(detailPenawaran).length !== 0 ? detailPenawaran[0].user.name : ''}</Typography>
          <Typography color='text.secondary'>{Object.keys(detailPenawaran).length !== 0 ? detailPenawaran[0].user.city : ''}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default BuyerInfo