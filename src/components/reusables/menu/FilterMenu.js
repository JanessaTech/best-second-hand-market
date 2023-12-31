import { Box, Divider, Drawer, IconButton} from '@mui/material'
import React from 'react'
import {headerHeight, drawerWidth} from '../../../common/constant'
import { CheapIcon } from '../../../utils/Svgs';
import CategoryFilter from './CategoryFilter';
import NetworkFilter from './NetworkFilter';
import PriceFilter from './PriceFilter';

export default function FilterMenu({width, menuOpen, closeMenu}) {

  return (
    <Drawer variant="persistent"
         sx={{
          width: {width},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                borderRight:0
            },
        }}
        anchor="left"
        open={menuOpen}
        >
            <Box sx={{width:1, height: headerHeight}}></Box>
            <Box sx={{display:'flex', justifyContent:'end'}}>
              <IconButton onClick={closeMenu}>
                <CheapIcon name={'close'}/>
              </IconButton>
            </Box>
            <Box sx={{mx:3}}>
                <NetworkFilter/>
                <Divider />
                <CategoryFilter/>
                <Divider />
                <PriceFilter/>
            </Box>
            
            
    </Drawer>
  )
}

