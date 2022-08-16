import { Box, Card, CardActionArea, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CardLoading = () => {

    return (
        <>
            <Box sx={{ mx: { xl: 15, md: 15, sm: 0 }, mt: { md: 5, xs: 0 }, pb: 3 }} >
                <Grid container rowSpacing={2} columnSpacing={{ xs: 3, sm: 3, md: 3 }} justifyContent={'center'} position={'relative'} >
                    <Grid item xl={6} md={8} xs={12}>
                        <Box  >
                            <Skeleton sx={{ width:'100%', height:'436px !important', borderRadius: {md:'16px', xs:'none'} }} animation="wave" variant="rectangular" />
                        </Box>
                        <Box component={'div'} p={4} mt={3} mx={{ md: 'unset', xs: 3 }} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                        </Box>
                    </Grid>
                    <Grid item xl={4} md={4} xs={12} mx={{ md: 'unset', xs: 3 }} >
                        <Box component={'div'} rowGap={2} p={3} flexDirection={'column'} display={{ md:'flex', xs:'none' }} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 1 }} />
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 1 }} />
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: .5 }} />
                            <Skeleton animation="wave" height={80} sx={{ borderRadius: '16px' }} />
                        </Box>
                        <Box component={'div'} rowGap={2} p={3} mt={2} display={'flex'} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                            <Box width={'20%'} mr={2}>
                                <Skeleton animation="wave" height={40} />
                            </Box>
                            <Box width={'80%'}>
                                <Skeleton animation="wave" height={20} />
                                <Skeleton animation="wave" height={20} />
                            </Box>
                        </Box>
                        <Box component={'div'} rowGap={2} p={3} mt={3} flexDirection={'column'} display={{ md:'none', xs:'flex' }} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 1 }} />
                            <Skeleton animation="wave" height={20} sx={{ marginBottom: 1 }} />
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}

export default CardLoading