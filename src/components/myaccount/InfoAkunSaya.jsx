import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import MenuMyAkun from './MenuMyAkun';
import { useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const InfoAkunSaya = () => {
    const [files, setFiles] = useState([]);
    const userProfile = useSelector(state => state.auth.userProfile)
    return (
        <Box width={{ md: '70%', xs: '100%' }} mx={'auto'} mt={3}>
            <Toolbar position='relative' >
                <Link to={-1}>
                    <ArrowBackSharpIcon sx={{
                        display: { md: 'block', xs: 'none' }, borderRadius: '50px', background: 'white', color: 'purple'
                        , zIndex: 100, padding: 1, cursor: 'pointer', '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                            color: 'blue'
                        }
                    }} />
                </Link>
                <Box position='absolute' width={{ md: '70%', xs: '100%' }} mx={'auto'} sx={{ left: 0, right: 0, top: 0 }} >
                    <Box sx={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {userProfile.image ?
                            <Box component={'img'}
                                src={`https://be-kel1.herokuapp.com/public/profile/${userProfile.image}`}
                                alt='profile'
                                sx={{ borderRadius: '12px', width: '96px', height: '96px', objectFit: 'cover', boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.15)' }}
                            />
                            :
                            <Box sx={{ borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '96px', height: '96px', objectFit: 'cover', boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
                                <PersonOutlineOutlinedIcon sx={{ width: '2em', height: '2em' }} />
                            </Box>
                        }
                    </Box>
                    <MenuMyAkun userProfile={userProfile} />
                </Box>
            </Toolbar>

        </Box>
    )
}

export default InfoAkunSaya