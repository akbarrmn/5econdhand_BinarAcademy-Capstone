import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const ProductInfo = ({ data, handlePublish, handleEdit }) => {
    const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    return (
        <>
            <Box component={'div'} rowGap={2} p={4} flexDirection={'column'} display={'flex'} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '16px' }}>
                <Box display={'flex'}>
                    <Typography variant='h6' fontWeight={800}>
                        {data ? data.name : ''}
                    </Typography>
                    <Typography variant='h6' fontWeight={800} sx={{ display: data ? data.isSold ? 'flex' : 'none' : 'none' ,ml:1, pr:1.5, pl:1.5, alignItems:'center', color:'white', backgroundColor:'red', fontSize:'1rem', borderRadius:'5px' }}>
                        {data ? data.isSold ? 'SOLD' : '' : ''}
                    </Typography>
                </Box>
                <Typography variant='h6' sx={{ color: '#8A8A8A' }}>
                    {data ? data.category : ''}
                </Typography>
                <Typography variant='h6'>
                    {data ? formatter.format(data.price) : ''}
                </Typography>
                <Button color='primary' onClick={handlePublish} variant='contained' fullWidth sx={{ borderRadius: '16px', height: '48px', display: { md: 'block', xs: 'none' } }}>
                    Terbitkan
                </Button>
                <Button color='primary' variant='outlined' onClick={handleEdit} fullWidth sx={{ borderRadius: '16px', height: '48px', display: { md: 'block', xs: 'none' } }}>
                    Edit
                </Button>
            </Box>
        </>
    )
}

export default ProductInfo