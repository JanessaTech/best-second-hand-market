import { Box, Drawer } from '@mui/material'
import React, { memo } from 'react'
import {cartWidth, headerHeight} from '../../../common/constant'

const Cart = ({toggleCart, open}) => {
  console.log('rending Cart ...')
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

