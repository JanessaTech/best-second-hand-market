import { Box, Divider, Drawer, IconButton, useMediaQuery} from '@mui/material'
import React, { memo } from 'react'
import { useTheme } from '@mui/material/styles'
import {headerHeight, drawerWidth} from '../constant'
import { CheapIcon } from '../../utils/Svgs'
import CategoryFilter from './CategoryFilter'
import NetworkFilter from './NetworkFilter'
import PriceFilter from './PriceFilter'

const FilterMenu = ({width, menuOpen, closeMenu}) => {
  console.log('rending FilterMenu ...')
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer variant={isMediumScreen ? 'temporary': 'persistent'}
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
        disableScrollLock={true}
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

export default memo(FilterMenu)



