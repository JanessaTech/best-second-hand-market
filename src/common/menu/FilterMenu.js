import { Box, Divider, Drawer, IconButton, Tooltip, useMediaQuery} from '@mui/material'
import React, { memo, useCallback} from 'react'
import { useTheme } from '@mui/material/styles'
import {headerHeight, drawerWidth} from '../constant'
import { CheapIcon } from '../../utils/Svgs'
import CategoryFilter from './CategoryFilter'
import NetworkFilter from './NetworkFilter'
import PriceFilter from './PriceFilter'

const FilterMenu = ({width, menuOpen, closeMenu, handleFilters}) => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const updateFilters = useCallback((key, value) => {
    handleFilters([key], value)
  },[])

  return (
    <Drawer variant={isMediumScreen ? 'temporary': 'persistent'} sx={{
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
        onClose={closeMenu}
        >
            <Box sx={{width:1, height: headerHeight}}></Box>
            <Box sx={{display:'flex', justifyContent:'end'}}>
              <Tooltip title='Hide filter'>
                  <IconButton onClick={closeMenu}>
                    <CheapIcon name={'close'}/>
                  </IconButton>
              </Tooltip>
              
            </Box>
            <Box sx={{mx:3}}>
                <NetworkFilter updateFilters={updateFilters}/>
                <Divider />
                <CategoryFilter updateFilters={updateFilters}/>
                <Divider />
                <PriceFilter updateFilters={updateFilters}/>
            </Box>    
    </Drawer>
  )
}

export default memo(FilterMenu)



