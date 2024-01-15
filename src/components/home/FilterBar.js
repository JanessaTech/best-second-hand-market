import { Box, Button, FormControl, OutlinedInput, Select, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs';
import MenuItem from '@mui/material/MenuItem';
import zIndex from '@mui/material/styles/zIndex';


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

function getMins() {
      const beforeDate = localStorage.getItem('now') ? parseInt(localStorage.getItem('now')) : undefined
      const nowDate = Math.round(Date.now() / 1000)
      const secs = beforeDate ? nowDate - beforeDate : 0
      const mins = Math.round(secs / 60)
      localStorage.setItem('now', `${nowDate}`)
      console.log(`${secs} secs ago`)
      console.log(`${mins} mins ago`)
      return mins
}
function getSortByFromLocalStorage() {
    let filter = localStorage.getItem('filter')
    if (filter) {
      filter = JSON.parse(filter)
      if (filter.sortBy) return filter.sortBy
    }
    return 'Recent activity'
  }

export default function FilterBar({menuOpen, toggleMenu, notifyFilterChanges}) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${drawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    const sortOptions = ['Recent activity', 'aa','bb','ccc', 'ddddd','eeee','ffff', 'gggg','hhhhh']
    const [sortBy, setSortBy] = useState(getSortByFromLocalStorage())
    const [ago, setAgo] = useState(0)

    useEffect(() => {
        setAgo(getMins())
    }, [])

    const handleSortChange = (e) => {
        setSortBy(e.target.value)

        let filter = localStorage.getItem('filter')
        if (filter) {
            filter = JSON.parse(filter)
            filter.sortBy = e.target.value
        } else {
            filter = {sortBy: e.target.value}
        }
        localStorage.setItem('filter', JSON.stringify(filter))
        console.log('[FilterBar] store filter:', filter)
        notifyFilterChanges(Math.random())
    }

    const handleUpdate = (e) => {
      e.preventDefault()
      console.log('handleUpdate ...')
      const newAgo = getMins()
      setAgo(newAgo)
      localStorage.removeItem('filter')
    }
    
  return (
    <Box sx={{position:'fixed', top: headerHeight,
              width: width, height: filterBarHeight,
              opacity:1,
              backgroundColor:'white',
              display:'flex', justifyContent:'space-between', alignItems: 'end',
              px:isSmallScreen ? 1 : 3,
              pb:1,
              boxSizing:'border-box',
              zIndex:1
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
                                    startIcon={<CheapIcon name={'update'} size={20}/>}
                                    onClick={handleUpdate}
                                    >
                        </Button>
                    </Tooltip>
                    
                </Box>
                
                <Box>
                    <Typography variant='body2'>22,334,111 items</Typography>
                    <Typography variant='body2' color={'grey'}>{ago} mins ago</Typography>
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

