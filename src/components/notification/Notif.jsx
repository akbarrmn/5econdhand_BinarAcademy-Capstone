import React from 'react'
import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotif, fetchNotif } from '../../redux/notif';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Notif = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notif.notification)
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    const profileUser = useSelector(state => state.auth.userProfile)
    const notifTerbitkan = Object.keys(notification).length !== 0 ? notification.filter((item) => item.userId === null && item.product.publish === true) : ''
    const notifDitawar = Object.keys(notification).length !== 0 ? notification.filter((item) => item.userId !== null && item.userId !== profileUser.id) : ''
    const notifMenawar = Object.keys(notification).length !== 0 ? notification.filter((item) => item.userId === profileUser.id) : ''

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
        dispatch(deleteNotif(id)).then(res => res.payload.success && dispatch(fetchNotif()))
    }

    React.useEffect(() => {
        if (Object.keys(profileUser).length !== 0) {
            dispatch(fetchNotif())
        }
    }, [dispatch, profileUser])

    return (
        <>
            {Object.keys(notifDitawar).length !== 0 ? notifDitawar.map((item, index) => {
                return (
                    <Box key={index}>
                        <Link key={index} to={`/info-penawar/${item.tawarId}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Grid container my={1} p={1} sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#eee',
                                }
                            }} >
                                <Grid item xs={2} textAlign="center">
                                    <IconButton >
                                        <Avatar alt="" src={`https://be-kel1.herokuapp.com/public/images/${item.product.images[0]}`} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color='text.secondary' component="h2" >
                                        Penawaran Produk
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        {formatter.format(item.product.price)}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        Ditawar {formatter.format(item.tawar.price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box justifyContent={'flex-end'} alignItems={'center'} display={'flex'} sx={{ marginTop: '-8px' }}>
                                        <Typography variant="caption" color='text.secondary' component="h2" >
                                            {toDate(item.createdAt)}
                                        </Typography>
                                        <IconButton onClick={(e) => handleDelete(e, item.id)}>
                                            <CloseIcon style={{ color: 'red', fontSize: '.8em' }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: '0 !important' }} />
                        </Link>
                    </Box>
                )
            }) : ''}

            {Object.keys(notifMenawar).length !== 0 ? notifMenawar.map((item, index) => {
                return (
                    <Box key={index}>
                        <Link key={index} to={`/detail-product-buyer/${item.productId}`} style={{ textDecoration: 'none', color: 'black' }}>

                            <Grid container my={1} p={1} sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#eee',
                                }
                            }} >
                                <Grid item xs={2} textAlign="center">
                                    <IconButton >
                                        <Avatar alt="" src={`https://be-kel1.herokuapp.com/public/images/${item.product.images[0]}`} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color='text.secondary' component="h2" >
                                        Penawaran Produk
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        <s>{formatter.format(item.product.price)}</s>
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        Berhasil Ditawar {formatter.format(item.tawar.price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="end" >
                                    <Box justifyContent={'flex-end'} alignItems={'center'} display={'flex'} sx={{ marginTop: '-8px' }}>
                                        <Typography variant="caption" color='text.secondary' component="h2" >
                                            {toDate(item.createdAt)}
                                        </Typography>
                                        <IconButton onClick={(e) => handleDelete(e, item.id)}>
                                            <CloseIcon style={{ color: 'red', fontSize: '.8em' }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: '0 !important' }} />
                        </Link>
                    </Box>
                )
            }) : ''}

            {Object.keys(notifTerbitkan).length !== 0 ? notifTerbitkan.map((item, index) => {
                return (
                    <Box key={index}>
                        <Link key={index} to={`/detail-product-seller/${item.productId}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Grid container my={1} p={1} sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#eee',
                                }
                            }} >
                                <Grid item xs={2} textAlign="center">
                                    <IconButton >
                                        <Avatar alt="" src={`https://be-kel1.herokuapp.com/public/images/${item.product.images[0]}`} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color='text.secondary' component="h2" >
                                        Berhasil di terbitkan
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} sx={{ maxWidth:'400px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}>
                                        {formatter.format(item.product.price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="end" >
                                    <Box justifyContent={'flex-end'} alignItems={'center'} display={'flex'} sx={{ marginTop: '-8px' }}>
                                        <Typography variant="caption" color='text.secondary' component="h2" >
                                            {toDate(item.createdAt)}
                                        </Typography>
                                        <IconButton onClick={(e) => handleDelete(e, item.id)}>
                                            <CloseIcon style={{ color: 'red', fontSize: '.8em' }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: '0 !important' }} />
                        </Link>
                    </Box>
                )
            }) : ''}
        </>
    )
}

export default Notif