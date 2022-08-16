import { Alert, Box, Grid, Stack } from '@mui/material'
import React from 'react'
import DescriptionProduct from '../DescriptionProduct'
import ProductImage from '../ProductImage'
import SellerInfo from '../SellerInfo'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import PublishSeller from '../seller/PublishSeller'
import PublishBuyer from '../buyer/PublishBuyer'
import ProductInfo from '../seller/ProductInfo'
import ProductInterest from '../buyer/ProductInterest'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetail, publishProduct, setLoading } from '../../../redux/product'
import ModalBuyer from '../buyer/ModalBuyer'
import { setMessage, setSuccess } from '../../../redux/tawar'
import DetailProductLoading from '../../loading/DetailProductLoading'
import { fetchNotif } from '../../../redux/notif'

const ProductDetails = ({ status }) => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  // Alert
  const [alert, setAlert] = React.useState(false)
  const data = useSelector(state => state.product.detailProduct)
  const message = useSelector(state => state.tawar.message)
  const success = useSelector(state => state.tawar.success)

  const handleClose = () => {
    setAlert(false)
  }


  const dataUser = useSelector(state => state.auth.userProfile)
  const detailProduct = useSelector(state => state.product.detailProduct)
  const loading = useSelector(state => state.product.loading)
  
  const handlePost = () => {
    if (dataUser.id === detailProduct.user.id) {
      dispatch(setMessage('Tidak dapat melakukan penawaran pada produk sendiri'))
    }
    setAlert(true)
    setTimeout(() => {
      dispatch(setMessage(''))
      setAlert(false)
    }, 2000);
    setOpen(false)
  }

  const navigate = useNavigate()

  const handleEdit = () => {
    if (dataUser.id === detailProduct.user.id) {
      navigate(`/info-produk/update/${id}`)
    } else {
      dispatch(setMessage('Tidak dapat melakukan edit produk pada produk orang!'))
      dispatch(setSuccess(false))
      setAlert(true)
      setTimeout(() => {
        dispatch(setMessage(''))
        setAlert(false)
      }, 2000);
    }
  }

  const handlePublish = () => {
    if (dataUser.id === detailProduct.user.id) {
      if (data.publish === false) {
        dispatch(publishProduct(id)).then(res => res.payload.success && dispatch(fetchNotif()))
        setTimeout(() => {
          navigate('/daftar-jual')
        }, 1500);
      } else {
        navigate('/daftar-jual')
      }
    } else {
      dispatch(setMessage('Tidak dapat melakukan publish produk pada produk orang!'))
      dispatch(setSuccess(false))
      setAlert(true)
      setTimeout(() => {
        dispatch(setMessage(''))
        setAlert(false)
      }, 2000);
    }
  }

  React.useEffect(() => {
    dispatch(fetchProductDetail(id))
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 2000);
  }, [dispatch, id])

  return (
    <>
      {loading ? <DetailProductLoading /> :
        <Box sx={{ mx: { xl: 15, md: 15, sm: 0 }, mt: { md: 5, xs: 0 }, pb: 3 }} >
          <Grid container rowSpacing={2} columnSpacing={{ xs: 3, sm: 3, md: 3 }} justifyContent={'center'} position={'relative'} >
            <Box display={{ sm: 'block', md: 'none' }} mt={{ sm: 5, xs: 5 }}>
              <Link to={-1}>
                <ArrowBackSharpIcon sx={{
                  fontSize: { sm: '2.5rem', xs: '2rem' }, zIndex: 10, padding: 1, position: 'absolute', borderRadius: '50px', color:'purple', background: 'white', left: '4rem', cursor: 'pointer', '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                    color: 'blue'
                  }
                }} />
              </Link>
            </Box>
            <Grid item xl={6} md={8} xs={12} >
              <ProductImage data={data} />
              <Box component={'div'} p={4} mt={3} display={{ md: 'block', xs: 'none' }} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <DescriptionProduct data={data} />
              </Box>
            </Grid>
            <Grid item xl={4} md={4} xs={12} mx={{ md: 'unset', xs: 3 }}  >
              {status === 'buyer' ? <ProductInterest data={data} handlePost={handlePost} handleOpen={handleOpenModal} /> : <ProductInfo data={data} handleEdit={handleEdit} handlePublish={handlePublish} />}
              <SellerInfo data={data} />
              <Box component={'div'} p={4} mt={3} display={{ md: 'none', xs: 'block' }} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <DescriptionProduct data={data}/>
              </Box>
              <Box display={{ xs: 'flex', md: 'none' }} justifyContent={'center'}>
                {status === 'buyer' ? <PublishBuyer data={data} handleOpen={handleOpenModal} /> : <PublishSeller handlePublish={handlePublish} />}
              </Box>
            </Grid>
            <Stack position="absolute" className="alert" mx={'auto'} zIndex={100} width={{ md: '50%', xs: '80%' }} sx={{ left: 0, right: 0, top: 0, transition: '0.5s', marginTop: alert ? { xs: "120px", md: '-25px' } : "-350px" }} >
              <Alert variant="filled" severity={success ? 'success' : 'error'} onClose={handleClose}>{message}</Alert>
            </Stack>
          </Grid>
          <ModalBuyer data={data} open={open} handleClose={handleCloseModal} handlePost={handlePost} />
        </Box>
      }
    </>
  )
}

export default ProductDetails