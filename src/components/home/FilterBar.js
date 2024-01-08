import { Box, Button, useMediaQuery } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CheapIcon } from '../../utils/Svgs';

export default function FilterBar({menuOpen}) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen ? `calc(100% - ${drawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    
  return (
    <Box sx={{position:'fixed', top: headerHeight,
              width: width, height: filterBarHeight,
              display:'flex', justifyContent:'space-between', alignItems: 'center',
              px:3,
              boxSizing:'border-box'
        }}>
            <Box>
                <Button sx={{textTransform:'none', mr:1, '&.MuiButton-root span': {m:0}, '&.MuiButton-root': {p:'5px', minWidth:50}}} variant='outlined' startIcon={<CheapIcon name={'left-arrow'} size={20}/>}>Hide</Button>
                <Button sx={{textTransform:'none', textIndent:'0px', 
                            '&.MuiButton-root': {p:'5px', minWidth:50},
                            '&.MuiButton-root span': {m:0}
                        }} variant='outlined' startIcon={<CheapIcon name={'update'} size={20}/>}>Update</Button>
            </Box>
            <Box>
                <Button>select</Button>
            </Box>
            
    </Box>
  )
}

