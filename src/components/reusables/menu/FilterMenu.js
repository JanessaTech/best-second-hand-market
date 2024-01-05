import { Box, Drawer } from '@mui/material'
import React from 'react'
import {headerHeight, drawerWidth} from '../../../common/constant'

export default function FilterMenu({width, menuOpen}) {

  return (
    <Drawer variant="persistent"
         sx={{
          width: {width},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                borderRight:0,
                backgroundColor:'red'
            },
        }}
        anchor="left"
        open={menuOpen}
        >
            <Box sx={{width:1, height: headerHeight}}></Box>
            <Box>
                dddd
            </Box>
    </Drawer>
  )
}

