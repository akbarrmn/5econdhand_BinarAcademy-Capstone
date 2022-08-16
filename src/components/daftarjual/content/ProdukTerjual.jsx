import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProductSold, setLoading, setMessageProduct } from '../../../redux/product';
import CardLoading from '../../loading/CardLoading';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fetchNotif } from '../../../redux/notif';

const ProdukTerjual = ({ setSuccess }) => {
  const dispatch = useDispatch()
  const produk_terjual = useSelector(state => state.product.productSold)
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
  const loading = useSelector(state => state.product.loading)

  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchProductSold())
        dispatch(fetchNotif())
        setSuccess(true)
        setTimeout(() => {
          dispatch(setMessageProduct(''))
          dispatch(setLoading(false))
      }, 1500);
      }
    })
  }

  React.useEffect(() => {
    dispatch(fetchProductSold())
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1500);
  }, [dispatch]);

  return (
    <>
      {Object.keys(produk_terjual).length !== 0 ?
        <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }} >
          {loading ?
            <CardLoading length={Object.keys(produk_terjual).length} md={4} />
            :
            produk_terjual.productSold.map((item, index) => {
              return (
                <Grid key={index} item xs={6} sm={6} md={4} >
                  <Link to={`/detail-product-seller/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Card >
                      <CardActionArea>
                        <Typography gutterBottom variant="h6" component="div" sx={{ padding: .5, display: item.isSold ? 'block' : 'none', color: 'white', background: 'grey', fontSize: '.8em', position: 'absolute' }}>
                          {item.isSold ? 'Terjual' : ''}
                        </Typography>
                        <Box onClick={(e) => handleDelete(e, item.id)} sx={{ padding: .3, fontSize: '.8em', background: 'white', position: 'absolute', right: 0, cursor: 'pointer', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', borderBottomLeftRadius: '16px' }}>
                          <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                        </Box>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://be-kel1.herokuapp.com/public/images/${item.images[0]}`}
                          alt="green iguana"
                          sx={{ objectFit: 'contain' }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1.1em', md: '1.5em' }, maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            {item.category}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1.1em', md: '1.5em' }, maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                            {formatter.format(item.price)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              )
            })
          }
        </Grid>
        :
        <>
          <Box display={'flex'} justifyContent={'center'}>
            <Box component={'img'} src='/images/nothing.png' width={276} height={194} />
          </Box>
          <Box display={'flex'} justifyContent={'center'} >
            <Typography component='h5' width={'329px'}>
              Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok
            </Typography>
          </Box>
        </>
      }
    </>
  )
}

export default ProdukTerjual