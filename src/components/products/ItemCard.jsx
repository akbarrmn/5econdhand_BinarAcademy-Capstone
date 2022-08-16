import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, setDetail, setLoading } from '../../redux/product'
import CardLoading from '../loading/CardLoading'

const ItemCard = ({ clicked, page }) => {
    const dispatch = useDispatch()
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    const data = useSelector(state => state.product.products)
    const loading = useSelector(state => state.product.loading)
    const searched = useSelector(state => state.product.searched)

    const filtered = Object.keys(data).length !== 0 ? data.filter(item => item.publish === true && item.isSold === false) : ''
    React.useEffect(() => {
        dispatch(setDetail({}))
        dispatch(fetchProducts({ clicked, searched, page }))
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 1500);
    }, [dispatch, clicked, searched, page])
    return (
        <>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }} mt={3}>
                {!loading ?
                    Object.keys(filtered).length !== 0 ?
                        filtered.map((item, index) => {
                            return (
                                <Grid key={item.id} item xs={6} sm={6} md={4} xl={2}  >
                                    <Link to={`/detail-product-buyer/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={item.images ? `https://be-kel1.herokuapp.com/public/images/${item.images[0]}` : ''}
                                                    alt="pic"
                                                    sx={{ objectFit:'contain' }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1.1em', md: '1.5em', maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' } }}>
                                                        {item.name ? item.name : ''}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: { xs: '0.9em', md: '1.2em' } }}>
                                                        {item.category ? item.category : ''}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '.8em', md: '1.3em'}, maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden'  }}>
                                                        {item.price ? formatter.format(item.price) : ''}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        }) :
                            <Box display={'flex'} width={'100%'} ml={{ md:'69px', xs:'56px' }} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                                <Box component={'img'} src='/images/nothing.png' width={150} height={100} />
                                <Typography component='h5' width={'329px'}>
                                    Belum ada produk yang diterbitkan
                                </Typography>
                            </Box>
                    :
                    <CardLoading length={Object.keys(filtered).length} md={4} xl={2} />
                }
            </Grid>
        </>
    )
}

export default ItemCard