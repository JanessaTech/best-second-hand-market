import { Box, Divider, Drawer, IconButton, Tooltip, useMediaQuery} from '@mui/material'
import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, DrawerWidth} from '../constant'
import { CheapIcon } from '../../utils/Svgs'
import CategoryFilter from './CategoryFilter'
import NetworkFilter from './NetworkFilter'
import PriceFilter from './PriceFilter'
import logger from '../Logger'

const FilterMenu = ({width, menuOpen, closeMenu, eventsBus, notifyFilterUpdate, notifyAlertUpdate}) => {
  logger.debug('[FilterMenu] rendering')
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerType, setDrawerType] = useState(isMediumScreen ? 'temporary': 'persistent')

  useEffect(() => {
    setDrawerType(isMediumScreen ? 'temporary': 'persistent')
  }, [isMediumScreen])
  
  return (
    <Drawer variant={drawerType} sx={{
          width: {width},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
                width: DrawerWidth, 
                boxSizing: 'border-box',
                borderRight:0
            },
        }}
        anchor="left"
        open={menuOpen}
        disableScrollLock={true}
        onClose={closeMenu}
        >
            <Box sx={{width:1, height: HeaderHeight}}></Box>
            <Box sx={{display:'flex', justifyContent:'end'}}>
              <Tooltip title='Hide filter'>
                  <IconButton onClick={closeMenu}>
                      <CheapIcon name={'close'}/>
                  </IconButton>
              </Tooltip>             
            </Box>
            <Box sx={{mx:3}}>
                <NetworkFilter notifyFilterUpdate={notifyFilterUpdate} eventsBus={eventsBus}/>
                <Divider />
                <CategoryFilter notifyFilterUpdate={notifyFilterUpdate} eventsBus={eventsBus}/>
                <Divider />
                <PriceFilter notifyFilterUpdate={notifyFilterUpdate} notifyAlertUpdate={notifyAlertUpdate} eventsBus={eventsBus}/>
            </Box>    
    </Drawer>
  )
}

export default memo(FilterMenu)



