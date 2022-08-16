import { Box, Button, IconButton, Typography, Menu, Badge } from '@mui/material'
import React from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchField from './SearchField';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notifications from '../../notification/NotificationsModal';
import Sidebar from '../../sidebar/Sidebar';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';

const Navbars = ({ info }) => {
    const userProfile = useSelector(state => state.auth.userProfile)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isNotifOpen = Boolean(anchorEl);
    const location = useLocation().pathname
    const notification = useSelector(state => state.notif.notification)
    const handleNotifOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotifClose = () => {
        setAnchorEl(null);
    };
    const totalNotification = Object.keys(notification).length !== 0 ? notification.filter((item) =>item.product.publish === true) : ''
    const renderMenu = (
        <Menu
            PaperProps={{ sx: { width: { md: '35%', xs: '100%'}, maxHeight:'300px' } }}
            sx={{ top: "50px", display: Object.keys(totalNotification).length === 0 ? 'none' : 'block' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isNotifOpen}
            onClose={handleNotifClose}
        >
            <Notifications />
        </Menu>
    );
    return (
        <>
            <Box component={'div'} height={'3rem'} display={'flex'} sx={{ px: { xs: 5, sm: 7, md: 10, lg: 15 }, py: 2, boxShadow: { xs: 'none', md: '0px 0px 10px rgba(0, 0, 0, 0.15)' } }} justifyContent={'space-between'} alignItems={'center'} position={{ md: 'unset', xs: 'relative' }}>
                <Box component={'div'} display={'flex'} alignItems={'center'} justifyContent={{ xs: 'space-between', sm: 'space-between', md: 'space-between' }} >
                    {info ?
                        <Box display={{ sm: 'block', md: 'none' }} zIndex={10}>
                            <Link to={-1}>
                                <IconButton sx={{ padding: 0 }}>
                                    <ArrowBackIcon sx={{ fontSize: '2rem', color: 'black' }} />
                                </IconButton>
                            </Link>
                        </Box>
                        :
                        <Sidebar />
                    }
                    <Link to='/' style={{ zIndex: 100 }}>
                        <Box
                            component={'img'}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                            src='/images/Rectangle.png'
                            alt='logo-rectangle'
                        />
                    </Link>
                    {info ? '' :
                        <Box display={{ xs: 'none', md: 'block' }}>
                            <SearchField />
                        </Box>
                    }
                </Box>
                {info ?
                    <Typography position='absolute' variant="h6" mx={'auto'} my={'auto'} sx={{ left: 0, right: 0, textAlign: 'center' }}>
                        {info}
                    </Typography>
                    :
                    <Box>
                        <Box display={{ xs: 'block', md: 'none' }}>
                            <SearchField />
                        </Box>
                        <Box display={{ xs: 'none', md: 'flex' }} gap={2}>
                            {Object.keys(userProfile).length !== 0 ?
                                <>
                                    <Link to='/daftar-jual' style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
                                        <IconButton>
                                            <FormatListBulletedIcon sx={{ cursor: 'pointer', color: location === '/daftar-jual' ? '#7126B5' : 'black' }} />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        onClick={handleNotifOpen}
                                    >
                                        <Badge badgeContent={Object.keys(totalNotification).length} color="primary">
                                            <NotificationsNoneOutlinedIcon sx={{ cursor: 'pointer', color: location === '/notifikasi' ? '#7126B5' : 'black' }} />
                                        </Badge>
                                    </IconButton>
                                    <Link to='/wishlist' style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon sx={{ cursor: 'pointer', color: location === '/wishlist' ? '#7126B5' : 'black' }} />
                                        </IconButton>
                                    </Link>
                                    <Link to='/myaccount' style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
                                        <IconButton>
                                            <PersonOutlineOutlinedIcon sx={{ cursor: 'pointer', color: location === '/myaccount' ? '#7126B5' : 'black' }} />
                                        </IconButton>
                                    </Link>
                                </>
                                :
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <Button color='primary' variant='contained' sx={{ borderRadius: '12px', height: '48px', width: '105px' }}><LoginIcon sx={{ mr: 1 }} />Masuk</Button>
                                </Link>
                            }
                        </Box>
                    </Box>
                }
                {renderMenu}

            </Box>
        </>
    )
}

export default Navbars