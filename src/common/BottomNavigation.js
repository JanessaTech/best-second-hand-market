import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CheapIcon } from '../utils/Svgs';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CheapBottomNavigation = ({openCart, toggleMenu, isHome, isConnected}) => {
    console.log('rending CheapBottomNavigation ...')
    const theme = useTheme()
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0)

    const goHome = () => {
      console.log('goHome ...')
      navigate('/')
    }
    
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
               {
                isHome ? <Tooltip title='Filter'>
                            <BottomNavigationAction label="Filter" icon={<CheapIcon name={'filter'}/>} onClick={toggleMenu}/>
                         </Tooltip> : <Tooltip title='Home'>
                                         <BottomNavigationAction label="Home" icon={<CheapIcon name={'home'}/>} onClick={goHome}/>
                                      </Tooltip>
               }
                <Tooltip title='Mint your NFT'>
                  <BottomNavigationAction label="Mint" icon={<CheapIcon name={'mint-nft'}/>} />
                </Tooltip>
                <Tooltip title={isConnected ? 'Open cart' : 'Connect to wallet'}>
                  <BottomNavigationAction label={isConnected ? 'Cart' : 'Wallet'} icon={<CheapIcon name={isConnected ? 'cart-black': 'my-balance'}/>} onClick={openCart}/>
                </Tooltip>
            </BottomNavigation>
         </Paper>
        
    </Box>
  )
}

export default memo(CheapBottomNavigation)

