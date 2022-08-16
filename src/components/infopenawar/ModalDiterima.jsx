import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '360px',
    height: '438px',
    bgcolor: 'background.paper',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '16px',
    p: 4,
};

const ModalDiterima = ({ open, handleClose, handlePost, data }) => {
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Typography id="modal-modal-description" variant='h6' sx={{ mt: 2, fontSize: '14px', fontWeight: 700 }}>
                        Yeay kamu berhasil mendapat harga yang sesuai
                    </Typography>
                    <Typography sx={{ mt: 2, fontSize: '14px', color: '#8A8A8A' }}>
                        Segera hubungi pembeli melalui WhatsApp untuk transaksi selanjutnya
                    </Typography>
                    <Box display={'flex'} fullWidth sx={{ mt: 3, background: '#EEEEEE', padding: 2, height: '150px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
                        <Grid container>
                            <Grid item md={12} xs={12} display={'flex'} justifyContent={'center'} mb={1}>
                                <Typography variant='p'>Product Match</Typography>
                            </Grid>
                            <Grid item md={12} xs={12} mb={1}>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <Box component={'img'} src={Object.keys(data).length !== 0 ? `https://be-kel1.herokuapp.com/public/profile/${data[0].user.image}` : ''} sx={{ height: '48px', width: '48px', objectFit: 'contain', borderRadius: '16px' }} />
                                    <Box display={'flex'} flexDirection={'column'} ml={2}>
                                        <Typography variant='subtitle1' >{Object.keys(data).length !== 0 ? data[0].user.name : ''}</Typography>
                                        <Typography variant="caption" color='text.secondary'  >{Object.keys(data).length !== 0 ? data[0].user.city : ''}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid container item alignItems={'center'} md={12}>
                                <Box mr={2}>
                                    <Box component={'img'} src={Object.keys(data).length !== 0 ? `https://be-kel1.herokuapp.com/public/images/${data[0].product.images[0]}` : ''} sx={{ height: '48px', width: '48px', objectFit: 'contain', borderRadius: '16px' }} />
                                </Box>
                                <Box>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                                        {Object.keys(data).length !== 0 ? data[0].product.name : ''}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                                        <s>{Object.keys(data).length !== 0 ? formatter.format(data[0].product.price) : ''}</s>
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={550} my={0} >
                                        Ditawar {Object.keys(data).length !== 0 ? formatter.format(data[0].price) : ''}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>


                    </Box>
                    <Button onClick={handlePost} variant='contained' fullWidth color='primary' sx={{ borderRadius: '16px', height: '48px', marginTop: 2 }}>
                        <a target={"_blank"} rel="noopener noreferrer" href={ Object.keys(data).length !== 0 ?  `https://wa.me/${data[0].user.number_mobile}` : ''} style={{ textDecoration: 'none', color:'white', display:'flex', justifyContent:'center' }}>
                            <Typography>
                                Hubungi via WhatsApp
                            </Typography>
                            <WhatsAppIcon sx={{ ml: 1 }} />
                        </a>
                    </Button>

                </Box>

            </Modal>
        </>
    )
}

export default ModalDiterima