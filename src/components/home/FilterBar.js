import { Box, Button, Tooltip, useMediaQuery } from '@mui/material'
import React, { memo, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, DrawerWidth, FilterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'

function getSortByFromLocalStorage() {
    let filter = localStorage.getItem('filter')
    if (filter) {
      filter = JSON.parse(filter)
      if (filter.sortBy) return filter.sortBy
    }
    return 'Recent activity'
  }

const FilterBar = ({menuOpen, toggleMenu, notifyFilterUpdate, handleSummary, handleUpdate}) => {
    logger.debug('[FilterBar] rendering ...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${DrawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    const sortOptions = ['Recent activity', 'aa','bb','ccc', 'ddddd','eeee','ffff', 'gggg','hhhhh']
    const [sortBy, setSortBy] = useState(getSortByFromLocalStorage())

    const handleSortChange = (sort) => {
        setSortBy(sort)
        let filter = localStorage.getItem('filter')
        if (filter) {
            filter = JSON.parse(filter)
            filter.sortBy = sort
        } else {
            filter = {sortBy: sort}
        }
        localStorage.setItem('filter', JSON.stringify(filter))
        logger.info('[FilterBar] store filter:', filter)
        notifyFilterUpdate(Math.random())
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
                {handleSummary()}
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

export default memo(FilterBar)



