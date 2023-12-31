import { Box, Paper } from '@mui/material'
import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CheapIcon } from '../../utils/Svgs';
import { useTheme } from '@mui/material/styles';

export default function CheapBottomNavigation({openCart, toggleMenu}) {
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
                <BottomNavigationAction label="Filter" icon={<CheapIcon name={'filter'}/>} onClick={toggleMenu}/>
                <BottomNavigationAction label="Favorites" icon={<CheapIcon name={'my-favorite'}/>} />
                <BottomNavigationAction label="Cart" icon={<CheapIcon name={'cart-s'}/>} onClick={openCart}/>
            </BottomNavigation>
         </Paper>
        
    </Box>
  )
}

