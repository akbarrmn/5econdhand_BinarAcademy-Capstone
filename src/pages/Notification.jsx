import React from 'react'
import Navbars from '../components/header/navbar/Navbars'
import Notif from '../components/notification/Notif'

const Notification = () => {
    return (
        <>
            <Navbars info={'Notifikasi'} />
            <Notif/>
        </>
    )
}   

export default Notification