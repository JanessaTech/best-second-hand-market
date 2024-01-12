import { Box, Drawer } from '@mui/material'
import React, { memo } from 'react'
import {cartWidth, headerHeight} from './constant'

const Cart = ({toggleCart, open}) => {
  console.log('Cart rendering ...')
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

export default memo(Cart)

