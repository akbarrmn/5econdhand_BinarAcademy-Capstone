import { Fab } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const PublishBuyer = ({ handleOpen,data }) => {
    const { id } = useParams()
    const dataTawar = useSelector(state => state.tawar.tawar)
    const tawarID = Object.keys(dataTawar).length !== 0 ? dataTawar.filter(item => item.productId === Number(id)) : ''

    return (
        <>
            <Fab color="primary" onClick={handleOpen} disabled={tawarID.length !== 0 || data.isSold} aria-label="add" sx={{ position: 'fixed', width: '328px', height: '60px', borderRadius: '12px', top: '90%' }}>
                {Object.keys(tawarID).length !== 0 ? data.isSold ? 'Produk telah terjual' : 'Menunggu respon penjual' : 'Saya tertarik ingin nego'}
            </Fab>
        </>
    )
}

export default PublishBuyer