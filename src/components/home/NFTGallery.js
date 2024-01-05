import { Box, Button } from '@mui/material'
import React from 'react'
import {headerHeight, drawerWidth} from '../../common/constant'

export default function NFTGallery({closeMenu, openMenu, menuOpen, toggleCart}) {
  return (
    <Box component="main" 
        sx={{ width: menuOpen ? `calc(100% - ${drawerWidth}px)` : 1, height: 1300, 
            backgroundColor:'pink' }}>
        <Box sx={{width:1, height: headerHeight}}></Box>
        <Box>
            <Button onClick={openMenu}>Open</Button>
            <Button onClick={closeMenu}>Close</Button>
            <Button onClick={toggleCart}>Toggle Cart</Button>
            This is NFT gallery
        </Box>
    </Box>
    
  )
}

