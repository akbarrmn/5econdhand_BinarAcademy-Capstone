import { Fab } from '@mui/material'
import React from 'react'

const PublishSeller = ({handlePublish}) => {
    return (
        <>
            <Fab color="primary" onClick={handlePublish} aria-label="add" sx={{ position: 'fixed', width: '328px', height: '60px', borderRadius: '12px', top: '90%' }}>
                Terbitkan
            </Fab>
        </>
    )
}

export default PublishSeller