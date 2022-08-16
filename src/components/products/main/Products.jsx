import { Box, Pagination, Typography } from '@mui/material'
import React from 'react'
import FilterCategory from '../FilterCategory'
import FloatingButton from '../FloatingButton'
import ItemCard from '../ItemCard'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setMessageAuth, setSuccessAuth } from '../../../redux/auth'
import { setMessageUser, setSuccessUser } from '../../../redux/users'

const Products = () => {
  const [clicked, setClicked] = React.useState('Semua');
  const [page, setPage] = React.useState(1)
  const userProfile = useSelector(state => state.auth.userProfile)
  const tab = useSelector(state => state.product.tab)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSell = () => {
    if (Object.keys(userProfile).length !== 0) {
      if (userProfile.city) {
        navigate(`/info-produk`)
      } else {
        dispatch(setMessageUser('Lengkapi profil untuk dapat menjual produk'))
        dispatch(setSuccessUser(false))
        navigate(`/info-user/${userProfile.id}`)
        setTimeout(() => {
          dispatch(setMessageUser(''))
        }, 1500);
      }

    } else {
      dispatch(setMessageAuth('Anda perlu login untuk dapat menjual produk'))
      dispatch(setSuccessAuth(false))
      navigate('/login')
      setTimeout(() => {
        dispatch(setMessageAuth(''))
      }, 1500);
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
  }

  return (
    <Box sx={{ mx: { lg: 15, md: 15, sm: 7, xs: 5 }, mt: { xs: 20, md: 'unset' }, pb: 3 }}>
      <Typography variant='h5' fontWeight={700} sx={{ fontSize: { xs: '1em', md: '2em' } }}>
        Telusuri Kategori
      </Typography>
      <FilterCategory clicked={clicked} setClicked={setClicked} />
      <ItemCard clicked={clicked} page={page} />
      <Box display={'flex'} onClick={handleSell} justifyContent={'center'}>
        <FloatingButton />
      </Box>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
        <Pagination count={tab ? tab : 1} color="primary" page={page} onChange={handleChange} />
      </Box>
    </Box>
  )
}

export default Products