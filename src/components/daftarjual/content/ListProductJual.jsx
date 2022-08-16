import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, fetchProductsUser, setDetail, setLoading, setMessageProduct } from '../../../redux/product';
import CardLoading from '../../loading/CardLoading';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { setMessageUser, setSuccessUser } from '../../../redux/users';
import { fetchNotif } from '../../../redux/notif';

const ListProductJual = ({ setSuccess }) => {
    const dispatch = useDispatch()
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    const data = useSelector(state => state.product.productUser)
    const loading = useSelector(state => state.product.loading)
    const userProfile = useSelector(state => state.auth.userProfile)
    const navigate = useNavigate()
    
    const handleSell = () => {
        if (Object.keys(userProfile).length !== 0) {
            if (userProfile.city) {
                navigate(`/info-produk`)
            } else {
                dispatch(setMessageUser('Lengkapi profil untuk dapat menjual produk'))
                dispatch(setSuccessUser(false))
                navigate(`/info-user/${userProfile.id}`)
            }

        } else {
            navigate('/login')
        }
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteProduct(id)).then((data) => {
            if (data.payload.success) {
                dispatch(fetchNotif())
                dispatch(fetchProductsUser())
                setSuccess(true)
                setTimeout(() => {
                    dispatch(setMessageProduct(''))
                    dispatch(setLoading(false))
                }, 1500);
            }
        })
    }

    React.useEffect(() => {
        dispatch(setDetail({}))
        dispatch(fetchProductsUser())
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 1500);
    }, [dispatch])

    return (
        <>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }} >
                <Grid item xs={6} sm={6} md={4} >
                    <Card sx={{ maxWidth: 345, height: data.length !== 0 && data.length !== undefined ? '100%' : '280px' }} onClick={handleSell}>
                        <CardActionArea sx={{ height: '100%', border: '1px dashed #bbb' }}>
                            <CardContent >
                                <Typography gutterBottom variant="h4" textAlign='center' component="div">
                                    +
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" textAlign='center' component="div">
                                    Tambah Produk
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                {!loading ?
                    Object.keys(data).length !== 0 ?
                        data.map((items, index) => {
                            return (
                                <Grid key={index} item xs={6} sm={6} md={4} >
                                    <Link to={`/detail-product-seller/${items.id}`} style={{ textDecoration: 'none' }}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <Typography gutterBottom variant="h6" component="div" sx={{ padding: .5, display: items.publish ? 'none' : 'block', color: 'white', background: 'grey', fontSize: '.8em', position: 'absolute' }}>
                                                    {items.publish ? '' : 'Unpublish'}
                                                </Typography>
                                                <Box onClick={(e) => handleDelete(e, items.id)} sx={{ padding: .3, fontSize: '.8em', background: 'white', position: 'absolute', right: 0, cursor: 'pointer', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', borderBottomLeftRadius: '16px' }}>
                                                    <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                                                </Box>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={`https://be-kel1.herokuapp.com/public/images/${items.images[0]}`}
                                                    alt=""
                                                    sx={{ objectFit: 'contain'  }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1.1em', md: '1.2em' }, maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                                        {items.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: { xs: '0.9em', md: '1.2em' } }}>
                                                        {items.category}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1.1em', md: '1.2em' }, maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                                        {formatter.format(items.price)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        })
                        : '' :
                    <CardLoading length={Object.keys(data).length} md={4} />
                }
            </Grid>
        </>
    )
}

export default ListProductJual