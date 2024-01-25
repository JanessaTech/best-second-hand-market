import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, Tooltip, useMediaQuery, Typography} from '@mui/material'
import {DrawerWidth, HeaderHeight, FilterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs'
import CustomSelect from '../../common/CustomSelect'

export default function ProfileFilterBar({menuOpen, toggleMenu, notifyFilterUpdate}) {
    console.log('FilterBar rendering ...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${DrawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    const sortOptions = ['Created time', 'Name','Price','View', 'Favorites']
    const [sortBy, setSortBy] = useState('Created time')
    const [stat, setStat] = useState({
        total: 100,
        sold: 23,
        unsold: 77
    })
    
    const handleSortChange = (sort) => {
        setSortBy(sort)
    }

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
                
                <Box sx={{display:'flex'}}>
                    <Typography ><strong>{stat.total}</strong> items: </Typography>
                    <Typography><strong>{stat.sold}</strong> on sales</Typography>
                </Box>
            </Box>
            <Box>
                <CustomSelect 
                    label={'Sort'} 
                    showInputLabel={false} 
                    value={sortBy} 
                    handleChange={handleSortChange} 
                    options={sortOptions} 
                    width={200}/>
            </Box>

    </Box>
  )
}

