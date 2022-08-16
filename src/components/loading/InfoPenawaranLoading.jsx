import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material'

const InfoPenawaranLoading = () => {
    return (
        <>
            <Box component={'div'} rowGap={2} py={{ xs: 2, md: 4 }} px={{ xs: 6, md: 6 }} display={'flex'} mt={3} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box display={'flex'} flexDirection={'column'} ml={2} sx={{ width: '100%' }}>
                    <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                    <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                </Box>
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
                <Skeleton animation="wave" height={20} sx={{ marginTop: 2,marginBottom: 1, width:'300px' }} />
            </Box>
            <Box component={'div'} rowGap={2} p={{ xs: 'unset', md: 2 }} display={'flex'} mt={1} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <Grid container my={1} mx={1} p={1}>
                    <Grid item xs={2} display={'flex'} justifyContent={'center'}>
                        <Skeleton variant="circular" width={40} height={40} sx={{ mt: 1.5 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                    </Grid>
                    <Grid item xs={4} textAlign="end" display={'flex'} justifyContent={'flex-end'} >
                        <Skeleton animation="wave" width={80} height={15} sx={{ marginBottom: 2 }} />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default InfoPenawaranLoading