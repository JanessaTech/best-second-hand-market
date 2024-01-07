import { Box, Drawer } from '@mui/material'
import React from 'react'
import {cartWidth, headerHeight} from '../../../common/constant'

export default function Cart({toggleCart, open}) {
  return (
    <Drawer
        sx={{'& .MuiDrawer-paper': {
            width: cartWidth,
            backgroundColor:'green',
            top: headerHeight + 10,
            height:'80%',
            borderRadius:4


        }}}
        anchor='right'
        open={open}
        onClose={toggleCart}
        disableScrollLock={true}
    >
        <Box >
            xxxxx

        </Box>
    </Drawer>
  )
}

