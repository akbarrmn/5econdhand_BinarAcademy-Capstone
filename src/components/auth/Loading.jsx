import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ width: '100%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box position={'absolute'} top={'20%'}>
            <Typography variant='h4' component={'h4'}>
                Loading
            </Typography>
            <LinearProgress sx={{ mt:2 }}/>
        </Box>
    </Box>
  )
}

export default Loading