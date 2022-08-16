import React from 'react';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Toolbar from '@mui/material/Toolbar';
import { Alert, Button, Grid, Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import BuyerInfo from './BuyerInfo';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ModalDiterima from './ModalDiterima';
import ModalStatus from './ModalStatus';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailTawar, setLoading } from '../../redux/tawar';
import { createTransaksi, fetchTransaksiSeller, setMessageTransaksi, setSuccess } from '../../redux/transaksi';
import InfoPenawaranLoading from '../loading/InfoPenawaranLoading';


const DataPenawar = () => {
    const [openAgreement, setOpenAgreement] = React.useState(false)
    const [openStatus, setOpenStatus] = React.useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()

    const handleCloseAgreement = () => { setOpenAgreement(false) }
    const handleCloseStatus = () => { setOpenStatus(false) }
    const handleOpenStatus = () => { setOpenStatus(true) }

    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    const toDate = (datenow) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const date = new Date(datenow)
        return (date.getDate() + " " + months[date.getMonth()] + ", " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()))
    }

    const detailPenawaran = useSelector(state => state.tawar.detailTawar)
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })

    const handleReject = () => {
        try {
            const data = {
                userId: detailPenawaran[0].userId,
                productId: detailPenawaran[0].productId,
                price: detailPenawaran[0].price,
                status: "rejected",
                tawarId: id
            }
            dispatch(createTransaksi(data)).then(data => {
                if (data.payload.success) {
                    dispatch(fetchDetailTawar(id))
                    dispatch(fetchTransaksiSeller())
                    dispatch(setMessageTransaksi('Berhasil menolak tawaran'))
                    dispatch(setSuccess(true))
                    setTimeout(() => {
                        dispatch(setMessageTransaksi(''))
                        dispatch(setSuccess())
                        dispatch(setLoading(false))
                    }, 1500);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreate = () => {
        setOpenAgreement(true)
        try {
            const data = {
                userId: detailPenawaran[0].userId,
                productId: detailPenawaran[0].productId,
                price: detailPenawaran[0].price,
                status: "pending",
                tawarId: id
            }
            dispatch(createTransaksi(data)).then(data => {
                if (data.payload.success) {
                    dispatch(fetchDetailTawar(id))
                    dispatch(fetchTransaksiSeller())
                    setTimeout(() => {
                        dispatch(setLoading(false))
                    }, 1500)
                }
            })
        } catch (err) {
            console.log(err);
        }
    }


    const [status, setStatus] = React.useState('')
    const [confirm, setConfirm] = React.useState(false)
    const dataTransaksi = useSelector(state => state.transaksi.transaksiSeller)
    const loading = useSelector(state => state.tawar.loading)
    const filterTransaksi = Object.keys(dataTransaksi).length !== 0 ? dataTransaksi.filter(data => data.tawarId === Number(id)) : ''

    const [alert, setAlert] = React.useState(true)
    const message = useSelector(state => state.transaksi.message)
    const success = useSelector(state => state.transaksi.success)

    React.useEffect(() => {
        dispatch(fetchTransaksiSeller())
    }, [dispatch])

    React.useEffect(() => {
        dispatch(setLoading(true))
        dispatch(fetchDetailTawar(id))
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 1500)
    }, [])

    return (
        <Box width={{ md: '70%', xs: '90%' }} mx={'auto'} mt={{ xs: 'unset', md: 3 }}>
            <Toolbar position='relative' >
                <Stack position="absolute" display={message !== '' ? "block" : "none"} className="alert" mx={'auto'} width={{ md: '40%', xs: '90%' }} sx={{ zIndex: 100, left: 0, right: 0, top: 0, transition: '0.5s' }} style={{ 'marginTop': alert ? "-15px" : "-350px" }} >
                    <Alert variant="filled" severity={success ? "success" : "error"} onClose={() => setAlert(false)}>{message}</Alert>
                </Stack>
                <Link to={-1}>
                    <ArrowBackSharpIcon sx={{
                        display: { md: 'block', xs: 'none' }, borderRadius: '50px', background: 'white'
                        , zIndex: 100, padding: 1, cursor: 'pointer', '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                            color: 'purple'
                        }
                    }} />
                </Link>
                <Box component={'div'} position='absolute' width={{ md: '70%', xs: '100%' }} mx={'auto'} sx={{ left: 0, right: 0, top: 0 }}  >
                    {loading ?
                        <InfoPenawaranLoading />
                        :
                        <>
                            <BuyerInfo />
                            <Typography variant='h6' fontWeight={700} mt={2} sx={{ fontSize: { xs: '.8em', md: '1em', } }}>
                                Daftar Produkmu yang Ditawar
                            </Typography>
                            {Object.keys(detailPenawaran).length !== 0 || Object.keys(filterTransaksi).length !== 0 ?
                                <Box component={'div'} rowGap={2} p={{ xs: 'unset', md: 2 }} display={'flex'} mt={1} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                                    <Grid container my={1} p={1} >
                                        <Grid item xs={3} sm={2} textAlign="center">
                                            <Box component={'img'} src={`https://be-kel1.herokuapp.com/public/images/${detailPenawaran[0].product.images[0]}`} sx={{ height: '60px', width: '60px', objectFit: 'contain', borderRadius: '16px' }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <Typography variant="caption" color='text.secondary' component="h2" >
                                                    Penawaran Produk
                                                </Typography>
                                                <Typography  sx={{ml:.5,  color: detailPenawaran[0].status === 'accepted' ? 'green' : detailPenawaran[0].status === 'rejected' ? 'red' : 'orange' }} variant="caption" color='text.secondary' component="h2" >
                                                    {detailPenawaran[0].status === 'accepted' ? 'Accepted' : detailPenawaran[0].status === 'rejected' ? 'Rejected' : 'Pending'}
                                                </Typography>
                                            </Box>
                                            <Typography variant='subtitle1' fontWeight={550} my={0} >
                                                {detailPenawaran[0].product.name}
                                            </Typography>
                                            <Typography variant='subtitle1' fontWeight={550} my={0} >
                                                {formatter.format(detailPenawaran[0].product.price)}
                                            </Typography>
                                            <Typography variant='subtitle1' fontWeight={550} my={0} >
                                                Ditawar {formatter.format(detailPenawaran[0].price)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={4} textAlign="end" >
                                            <Typography variant="caption" color='text.secondary' component="h2" >
                                                {toDate(detailPenawaran[0].createdAt)}
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={1} mt={2} item xs={12} justifyContent={'end'}>
                                            {Object.keys(filterTransaksi).length !== 0 && filterTransaksi[0].status === 'pending' ?
                                                <>
                                                    <Grid item xs={3} sx={{ display: Object.keys(filterTransaksi).length !== 0 ? filterTransaksi[0].status !== 'pending' ? 'none' : 'block' : 'unset' }}>
                                                        <Button fullWidth variant="outlined" color="primary" onClick={handleOpenStatus} sx={{ height: '40px', borderRadius: '25px', display: filterTransaksi[0].status !== 'pending' ? 'none' : 'block' }} >
                                                            Status
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={3} sx={{ display: Object.keys(filterTransaksi).length !== 0 ? filterTransaksi[0].status !== 'pending' ? 'none' : 'block' : 'unset' }}>
                                                        <a target={"_blank"} rel="noopener noreferrer" href={`https://wa.me/${detailPenawaran[0].user.number_mobile}`} style={{ textDecoration: 'none' }}>
                                                            <Button fullWidth variant="contained" color="primary" sx={{ height: '40px', borderRadius: '25px', display: filterTransaksi[0].status !== 'pending' ? 'none' : 'flex', alignItems: 'center' }}>
                                                                <Typography variant='caption'>
                                                                    Hubungi di
                                                                </Typography>
                                                                <WhatsAppIcon sx={{ ml: 1, fontSize: { md: '1rem', xs: '.5rem' } }} />
                                                            </Button>
                                                        </a>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid item xs={3} sx={{ display: Object.keys(filterTransaksi).length !== 0 ? filterTransaksi[0].status !== 'pending' ? 'none' : 'block' : 'unset' }}>
                                                        <Button fullWidth variant="outlined" color="primary" onClick={handleReject} sx={{ height: '40px', borderRadius: '25px', }} >
                                                            Tolak
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={3} sx={{ display: Object.keys(filterTransaksi).length !== 0 ? filterTransaksi[0].status !== 'pending' ? 'none' : 'block' : 'unset' }}>
                                                        <Button fullWidth variant="contained" color="primary" onClick={handleCreate} sx={{ height: '40px', borderRadius: '25px', }}>
                                                            Terima
                                                        </Button>
                                                    </Grid>
                                                </>
                                            }

                                        </Grid>
                                    </Grid>
                                </Box>
                                : ""}
                        </>

                    }
                </Box>
            </Toolbar>
            <ModalStatus handleClose={handleCloseStatus} open={openStatus} status={status} setStatus={setStatus} idTransaksi={filterTransaksi} />
            <ModalDiterima handleClose={handleCloseAgreement} open={openAgreement} data={detailPenawaran} />

        </Box >
    )
}
export default DataPenawar