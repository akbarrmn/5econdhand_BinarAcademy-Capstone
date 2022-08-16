import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react'

const WishlistLoading = ({ length }) => {
    var rows = [];
    for (var i = 0; i < length; i++) {
        rows.push(
            <Box key={i} component={'div'} rowGap={2} height={'105px'} mt={2} p={{ xs: 'unset', md: 2 }} display={'flex'} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <Grid container my={1} mx={1} p={1} rowGap={1}>
                    <Grid item xs={1} md={1} textAlign={"center"} display={'flex'} alignItems={"center"}>
                        <Skeleton variant="circular" width={25} height={25} />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        md={4}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                        justifyContent={'center'}
                    >
                        <Skeleton variant="rectangular" width={90} height={75} sx={{borderRadius:'12px'}}/>
                    </Grid>
                    <Grid item xs={4} md={3} mt={1}>
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                    </Grid>
                    <Grid item xs={3} md={4} mt={1} textAlign="center" display={'flex'} justifyContent={'center'}>
                        <Box display={'flex'} width={'80%'} flexDirection={'column'}>
                            <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                            <Skeleton animation="wave" height={15} sx={{ marginBottom: 1.3 }} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    return (
        <>
            {rows}
        </>
    )
}

export default WishlistLoading