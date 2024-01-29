import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, Tooltip, useMediaQuery} from '@mui/material'
import {DrawerWidth, HeaderHeight, FilterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'

export default function ProfileFilterBar({menuOpen, toggleMenu, notifyFilterUpdate, handleSummary}) {
    logger.debug('[ProfileFilterBar] rendering ...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${DrawerWidth + margin}px)` :`calc(100% - ${margin}px)`

  return (
    <Box sx={{position:'fixed', top: HeaderHeight,
              width: width, height: FilterBarHeight,
              opacity:1,
              backgroundColor:'white',
              display:'flex', justifyContent:'space-between', alignItems: 'end',
              px:isSmallScreen ? 1 : 3,
              pb:1,
              boxSizing:'border-box',
              zIndex:1
        }}>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Box sx={{display:'flex', [theme.breakpoints.down('sm')]: {display: 'none'}}}>
                    <Tooltip title='Show/hide filter'>
                        <Button sx={{textTransform:'none', mr:1, height:40,
                                    '&.MuiButton-root span': {m:0}, 
                                    '&.MuiButton-root': {p:'5px', minWidth:50}
                                    }} 
                                    color='customBlack'
                                    variant='outlined' 
                                    startIcon={<CheapIcon name={menuOpen ? 'left-arrow': 'right-arrow'} size={20}/>}
                                    onClick={toggleMenu}
                                    >{menuOpen ? 'Hide' : 'Filter'}</Button>
                    </Tooltip>                  
                </Box>
                
                {handleSummary()}
            </Box>

    </Box>
  )
}

