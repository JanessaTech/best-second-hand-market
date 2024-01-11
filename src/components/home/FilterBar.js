import { Box, Button, FormControl, OutlinedInput, Select, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs';
import MenuItem from '@mui/material/MenuItem';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 200,
    },
    
  },
  disableScrollLock: true,
};

function getStyles(sortName, sortBy, theme) {
    return {
      fontWeight:
        sortBy.indexOf(sortName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function FilterBar({menuOpen, toggleMenu}) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${drawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    const sortOptions = ['Recent activity', 'aa','bb','ccc', 'ddddd','eeee','ffff', 'gggg','hhhhh']
    const [sortBy, setSortBy] = useState('Recent activity')

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
    }
    
  return (
    <Box sx={{position:'fixed', top: headerHeight,
              width: width, height: filterBarHeight,
              opacity:1,
              backgroundColor:'white',
              display:'flex', justifyContent:'space-between', alignItems: 'end',
              px:isSmallScreen ? 1 : 3,
              pb:1,
              boxSizing:'border-box'
        }}>
            <Box sx={{display:'flex'}}>
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
                    <Tooltip title='Update page'>
                        <Button sx={{textTransform:'none', mr:1, height:40,color:'black',
                                    '&.MuiButton-root': {p:'5px', minWidth:50},
                                    '&.MuiButton-root span': {m:0}
                                    }} 
                                    color='customBlack'
                                    variant='outlined' 
                                    startIcon={<CheapIcon name={'update'} size={20}/>}>
                        </Button>
                    </Tooltip>
                    
                </Box>
                
                <Box>
                    <Typography variant='body2'>22,334,111 items</Typography>
                    <Typography variant='body2' color={'grey'}>2 mins ago</Typography>
                </Box>
            </Box>
            <Box>
                <FormControl sx={{width: 200 }}>
                    <Select
                        label="sort-by-name-option"
                        value={sortBy}
                        onChange={handleSortChange}
                        input={<OutlinedInput size="small"/>}
                        MenuProps={MenuProps}
                    >
                        {
                            sortOptions.map((sortName) => (
                                <MenuItem
                                    key={sortName}
                                    value={sortName}
                                    style={getStyles(sortName, sortBy, theme)}
                                >
                                    {sortName}
                                </MenuItem>
                            ))
                        }                        
                    </Select>
                </FormControl>
            </Box>     
    </Box>
  )
}

