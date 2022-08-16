import { Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const MenuMyAkun = ({ userProfile }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
    return (
        <>
            <Box mt={3} p={2}>
                <MenuList>
                    <Link to={`/info-user/${userProfile.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem sx={{ paddingLeft: '5px !important' }}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" color='primary' />
                            </ListItemIcon>
                            <ListItemText>Ubah Akun</ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider sx={{ mt: '0 !important' }} />
                    <Link to={`/transaksi`} style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem sx={{ paddingLeft: '5px !important' }}>
                            <ListItemIcon>
                                <ReceiptLongOutlinedIcon fontSize="small" color='primary' />
                            </ListItemIcon>
                            <ListItemText>Transaksi</ListItemText>
                        </MenuItem >
                    </Link>
                    <Divider sx={{ mt: '0 !important' }} />
                    <MenuItem sx={{ paddingLeft: '5px !important' }} onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" color='primary' />
                        </ListItemIcon>
                        <ListItemText>Keluar</ListItemText>
                    </MenuItem>
                    <Divider sx={{ mt: '0 !important' }} />
                </MenuList>
            </Box>
        </>
    )
}

export default MenuMyAkun