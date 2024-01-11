import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CheapIcon } from '../utils/Svgs';
import { useTheme } from '@mui/material/styles';

const CheapBottomNavigation = ({openCart, toggleMenu}) => {
    console.log('rending CheapBottomNavigation ...')
    const theme = useTheme()
    const [value, setValue] = React.useState(0);
  return (
    <Box sx={{[theme.breakpoints.up('md')]:{display:'none'}}}>
         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <Tooltip title='Filter'>
                  <BottomNavigationAction label="Filter" icon={<CheapIcon name={'filter'}/>} onClick={toggleMenu}/>
                </Tooltip>
                <Tooltip title='Mint your NFT'>
                  <BottomNavigationAction label="Mint" icon={<CheapIcon name={'mint-nft'}/>} />
                </Tooltip>
                <Tooltip title='Open cart'>
                  <BottomNavigationAction label="Cart" icon={<CheapIcon name={'cart-s'}/>} onClick={openCart}/>
                </Tooltip>
            </BottomNavigation>
         </Paper>
        
    </Box>
  )
}

export default memo(CheapBottomNavigation)

