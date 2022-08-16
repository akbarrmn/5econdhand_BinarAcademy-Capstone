import { Box, Divider, Grid, Skeleton } from '@mui/material'
import React from 'react'

const TawarLoading = ({length}) => {
    var rows = [];
    for (var i = 0; i < length; i++) {
        rows.push(
            <Box key={i}>
                <Grid container my={1} mx={1} p={1}>
                    <Grid item xs={2} display={'flex'} justifyContent={'center'}>
                        <Skeleton variant="circular" width={40} height={40} sx={{mt:1.5}}/>
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
                <Divider sx={{ mt: '0 !important' }} />
            </Box>
            )
    }

    return (
        <>
            {rows}
        </>
    )
}

export default TawarLoading