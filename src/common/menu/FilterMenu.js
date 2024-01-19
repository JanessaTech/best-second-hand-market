import { Box, Divider, Drawer, IconButton, Tooltip, useMediaQuery} from '@mui/material'
import React, { memo, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import {headerHeight, drawerWidth} from '../constant'
import { CheapIcon } from '../../utils/Svgs'
import CategoryFilter from './CategoryFilter'
import NetworkFilter from './NetworkFilter'
import PriceFilter from './PriceFilter'

const FilterMenu = ({width, menuOpen, closeMenu, notifyFilterChanges, handleAlert}) => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerType, setDrawerType] = useState(isMediumScreen ? 'temporary': 'persistent')

  useEffect(() => {
    setDrawerType(isMediumScreen ? 'temporary': 'persistent')
  }, [isMediumScreen])

  const notify = (trigger) => {
    notifyFilterChanges(trigger)
  }

  return (
    <Drawer variant={drawerType} sx={{
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
                <NetworkFilter notify={notify}/>
                <Divider />
                <CategoryFilter notify={notify}/>
                <Divider />
                <PriceFilter notify={notify} handleAlert={handleAlert}/>
            </Box>    
    </Drawer>
  )
}

export default memo(FilterMenu)



