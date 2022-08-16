import { Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CategoryJual = ({category, clicked}) => {
    return (
        <>
            <Box p={2} pr={0} sx={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: '16px' }}>
                <Typography variant='h6' fontWeight={600} >
                    Kategori
                </Typography>
                <MenuList  >
                    <MenuItem sx={{ paddingLeft: '5px !important', color:clicked === 'Semua Produk'? '#7126B5' : '' }} onClick={()=> category('Semua Produk')}>
                        <ListItemIcon>
                            <ListAltIcon fontSize="small" sx={{ color:clicked === 'Semua Produk'? '#7126B5' : '' }} />
                        </ListItemIcon>
                        <ListItemText>Semua Produk</ListItemText>
                        <Typography variant="h5" >
                            <ArrowForwardIosIcon sx={{ color:clicked === 'Semua Produk'? '#7126B5' : '', fontSize:'16px' }}/>
                        </Typography>
                    </MenuItem>
                    <Divider sx={{ mt: '0 !important'}} />
                    <MenuItem sx={{ paddingLeft: '5px !important', color:clicked === 'Diminati'? '#7126B5' : '' }} onClick={()=> category('Diminati')}>
                        <ListItemIcon>

                            <FavoriteBorderIcon fontSize="small" sx={{ color:clicked === 'Diminati'? '#7126B5' : '' }}/>
                        </ListItemIcon>
                        <ListItemText>Diminati</ListItemText>
                        <Typography variant="h5" >
                            <ArrowForwardIosIcon sx={{ color:clicked === 'Diminati'? '#7126B5' : '', fontSize:'16px' }}/>
                        </Typography>
                    </MenuItem >
                    <Divider sx={{ mt: '0 !important' }} />
                    <MenuItem sx={{ paddingLeft: '5px !important', color:clicked === 'Terjual'? '#7126B5' : '' }} onClick={()=> category('Terjual')}>
                        <ListItemIcon>
                            <MonetizationOnOutlinedIcon fontSize="small" sx={{ color:clicked === 'Terjual'? '#7126B5' : '' }}/>
                        </ListItemIcon>
                        <ListItemText>Terjual</ListItemText>
                        <Typography variant="h5" >
                            <ArrowForwardIosIcon sx={{ color:clicked === 'Terjual'? '#7126B5' : '', fontSize:'16px' }}/>
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Box>
        </>
    )
}

export default CategoryJual