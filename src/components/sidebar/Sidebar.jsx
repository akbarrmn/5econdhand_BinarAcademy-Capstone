import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const userProfile = useSelector(state => state.auth.userProfile)
    const [state, setState] = React.useState({
        left: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown') {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            mx={2}
            my={1}
            sx={{ width: 200 }}
            role="presentation"
            display={'flex'}
            flexDirection={'column'}
        >
            <Box display={'flex'} justifyContent={'space-between'} mb={1} >
                <Typography variant='h6' sx={{ cursor: 'pointer',  fontWeight: 700 }} onClick={toggleDrawer(anchor, false)} >
                <Link to='/' style={{ textDecoration:'none',color: '#000000' }}>
                    Second Hand
                    </Link>
                </Typography>
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={toggleDrawer(anchor, false)} />
            </Box>
            <List>
                {Object.keys(userProfile).length !== 0 ?
                    <>
                        {['Notifikasi', 'Daftar Jual', 'Akun Saya', 'Wishlist'].map((text) => (
                        <React.Fragment key={text}>
                            <Link to={ text === 'Notifikasi' ? '/notifikasi' : text === 'Daftar Jual' ? '/daftar-jual' : text === 'Akun Saya' ? '/myaccount' : text === 'Wishlist' ? '/wishlist' : '/'} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem disablePadding>
                                    <ListItemButton key={text} >
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </React.Fragment>
                        ))}
                    </>
                    :
                    <Link to='/login' style={{ textDecoration:'none' }}>
                        <Button color='primary' variant='contained' sx={{ borderRadius: '12px', height: '45px', width: '100px' }}><LoginIcon sx={{ mr: 1 }} />Masuk</Button>
                    </Link>
                }
                
            </List>
        </Box>
    );
    return (
        <div>
            <React.Fragment key='left'>
                <Button onClick={toggleDrawer('left', true)} sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, color: 'black', background: '#f5f5f5', width: '48px', height: '48px', borderRadius: '16px', justifyContent: 'center', alignContent: 'center', cursor: 'pointer' }}>
                        <MenuIcon sx={{ mt: 1.5 }} />
                    </Box>
                </Button>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default Sidebar