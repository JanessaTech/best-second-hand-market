import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import {HeaderHeight, DrawerWidth, FilterBarHeight} from '../../common/constant'
import { CheapIcon } from '../../utils/Svgs';
import CustomSelect from '../../common/CustomSelect';

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

const FilterBar = ({menuOpen, toggleMenu, notifyFilterUpdate}) => {
    console.log('FilterBar rendering ...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const margin = isSmallScreen ? 32 : 48
    const width = menuOpen && !isMediumScreen? `calc(100% - ${DrawerWidth + margin}px)` :`calc(100% - ${margin}px)`
    const sortOptions = ['Recent activity', 'aa','bb','ccc', 'ddddd','eeee','ffff', 'gggg','hhhhh']
    const [sortBy, setSortBy] = useState(getSortByFromLocalStorage())
    const [ago, setAgo] = useState(0)

    useEffect(() => {
        setAgo(getMins())
    }, [])

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
        console.log('[FilterBar] store filter:', filter)
        notifyFilterUpdate(Math.random())
    }

    const handleUpdate = (e) => {
      e.preventDefault()
      console.log('handleUpdate ...')
      const newAgo = getMins()
      setAgo(newAgo)
      localStorage.removeItem('filter')
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
                
                <Box>
                    <Typography variant='body2'>22,334,111 items</Typography>
                    <Typography variant='body2' color={'grey'}>{ago} mins ago</Typography>
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

export default memo(FilterBar)



