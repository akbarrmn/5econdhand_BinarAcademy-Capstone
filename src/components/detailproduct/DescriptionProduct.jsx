import { Typography } from '@mui/material'
import React from 'react'

const DescriptionProduct = ({data}) => {
    return (
        <>
            <Typography variant='h6'>
                Deskripsi
            </Typography>
            <Typography variant='p'>
                {data? data.description:''}
            </Typography>
        </>
    )
}

export default DescriptionProduct