import { Box, Divider, Grid, Skeleton } from '@mui/material';
import React from 'react'

const TransaksiLoading = ({ length }) => {
    var rows = [];
    for (var i = 0; i < length; i++) {
        rows.push(
            <Box key={i} component={'div'} rowGap={2} mt={2} p={{ xs: 'unset', md: 2 }} display={'flex'} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <Grid container my={1} mx={1} p={1} gap={1}>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                        justifyContent={'space-between'}
                    >
                        <Box display={'flex'} alignItems={'center'}>
                            <Skeleton variant="rectangular" width={25} height={25} sx={{ borderRadius: '12px' }} />
                            <Box display={'flex'} flexDirection={'column'} alignItems={"center"} ml={1} gap={.2}>
                                <Skeleton animation="wave" width={40} height={10} />
                                <Skeleton animation="wave" width={40} height={10} />
                            </Box>
                        </Box>
                        <Box sx={{ fontWeight: 'bold', py: .5, px: 1, borderRadius: '8px' }}>
                            <Skeleton animation="wave" width={40} height={10} sx={{ marginBottom: 1.3 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider sx={{ mt: '0 !important', my: 1 }} />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        md={4}
                        xl={4}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                        justifyContent={'center'}
                        sx={{ height:{xs: "100px", md: '120px', xl: '150px'} }}
                    >
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ borderRadius: '12px' }} />
                    </Grid>
                    <Grid item xs={5} md={5} xl={5} >
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1 }} />
                        <Skeleton animation="wave" height={15} sx={{ marginBottom: 1 }} />
                    </Grid>
                    <Grid item xs={2} md={2} xl={2} textAlign="center" display={'flex'} justifyContent={'flex-end'}>
                        <Skeleton animation="wave" width={40} height={10} sx={{ marginBottom: 1.3 }} />
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

export default TransaksiLoading