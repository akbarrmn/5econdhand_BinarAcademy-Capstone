import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ErrorNotFound = () => {
    return (
        <Box display={'flex'} alignItems={'center'} height={'100vh'} margin={'auto'}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
                <Typography variant='h1' sx={{ ml: 'auto', mr: 'auto', fontSize: { md: '6rem', xs: '3rem' } }}> Oops!</Typography>
                <Typography variant='h6' sx={{ ml: 'auto', mr: 'auto', mt: 1 }}> 404 - Page Not Found</Typography>
                <Typography variant='caption' sx={{ ml: 'auto', mr: 'auto', mt: 1, maxWidth: { md: 'unset', xs: '80%' }, textAlign: 'center' }}> The page you are looking for might have been removed had its name changed or is temporarily unavailable</Typography>
                <Link to={'/'} style={{ textDecoration:'none', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }}>
                    <Button color='primary' variant='contained' sx={{  }}>
                        GO TO HOMEPAGE
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default ErrorNotFound