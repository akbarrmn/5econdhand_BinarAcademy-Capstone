import React from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = () => {
    return (
        <>
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', width: '115px', height: '60px', borderRadius: '12px', bottom:'5%' }}>
                <AddIcon /> Jual
            </Fab>
        </>
    )
}

export default FloatingButton