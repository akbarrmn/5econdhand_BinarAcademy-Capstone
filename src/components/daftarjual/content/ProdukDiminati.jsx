import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CircleIcon from '@mui/icons-material/Circle';
import { deleteTawar, fetchTawarSeller, setLoading, setMessage } from '../../../redux/tawar';
import { Link } from 'react-router-dom';
import TawarLoading from '../../loading/TawarLoading';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fetchNotif } from '../../../redux/notif';

const ProdukDiminati = ({setSuccess}) => {
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
  const dispatch = useDispatch()
  const dataTawar = useSelector(state => state.tawar.tawarSeller)
  const loading = useSelector(state => state.tawar.loading)

  function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
  }

  const toDate = (datenow) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(datenow)
    return (date.getDate() + " " + months[date.getMonth()] + ", " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()))
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteTawar(id)).then((data) =>{
      if (data.payload.success) {
        dispatch(fetchTawarSeller())
        dispatch(fetchNotif())
        setSuccess(true)
        setTimeout(() => {
          dispatch(setMessage(''))
          dispatch(setLoading(false))
        }, 1500);
      }
    })
  }

  React.useEffect(() => {
    dispatch(fetchTawarSeller())
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1500);
  }, [dispatch,deleteTawar])

  return (
    <>
      {Object.keys(dataTawar).length !== 0 ?
        loading ? <TawarLoading length={Object.keys(dataTawar).length} /> :
          dataTawar.map((data,index) => {
            return (
              <Link key={index} to={`/info-penawar/${data.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <Grid container my={1} mx={1} p={1} sx={{
                  cursor: 'pointer', '&:hover': {
                    backgroundColor: '#eee',
                  }
                }} >
                  <Grid item xs={2} textAlign="center">
                    <IconButton >
                      <Box component={'img'}
                        src={`https://be-kel1.herokuapp.com/public/images/${data.product.images[0]}`}
                        sx={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'contain ' }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display={'flex'} flexDirection={'row'}>
                      <Typography variant="caption" color='text.secondary' component="h2" sx={{ marginRight:1 }}>
                        Penawaran Produk 
                      </Typography>
                      <Typography variant="caption" color='text.secondary' component="h2" sx={{  color: data.status === 'accepted' ? 'green' : data.status === 'rejected' ? 'red' : 'orange' }}>
                        {data.status === 'accepted' ? 'Accepted' : data.status === 'rejected' ? 'Rejected' : 'Waiting'}
                      </Typography>
                    </Box>
                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                      {data.product.name}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                      {formatter.format(data.product.price)}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                      Ditawar  {formatter.format(data.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="end" >
                    <Typography variant="caption" color='text.secondary' component="h2" >
                      {toDate(data.createdAt)} <CircleIcon style={{ color: 'red', fontSize: '0.9em', }} />
                    </Typography>
                    <IconButton onClick={(e) => handleDelete(e, data.id)} sx={{ display: data.status === 'waiting' ?  'none' : 'unset' }}>
                      <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: '0 !important' }} />
              </Link>
            )
          })
        :
        <>
          <Box display={'flex'} justifyContent={'center'}>
            <Box component={'img'} src='/images/nothing.png' width={276} height={194} />
          </Box>
          <Box display={'flex'} justifyContent={'center'} >
            <Typography component='h5' width={'329px'}>
              Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
            </Typography>
          </Box>
        </>
      }

    </>
  )
}

export default ProdukDiminati