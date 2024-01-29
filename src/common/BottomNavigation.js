import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { CheapIcon } from '../utils/Svgs'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import logger from './Logger'

const CheapBottomNavigation = ({openCart, toggleMenu, isShowMenu, isConnected, notifyWalletOpen}) => {
    logger.info('[CheapBottomNavigation] rendering...')
    const theme = useTheme()
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0)

    const goHome = () => {
      logger.debug('[CheapBottomNavigation] goHome ...')
      navigate('/')
    }

    const handleMintBut = () => {
      logger.debug('[CheapBottomNavigation] handleMintBut')
      if (isConnected) {
        logger.info('[CheapBottomNavigation] go to to /profile/mint')
      navigate('/profile/mint')
      } else {
          notifyWalletOpen()
      }
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
                isShowMenu ? <Tooltip title='Filter'>
                            <BottomNavigationAction label="Filter" icon={<CheapIcon name={'filter'}/>} onClick={toggleMenu}/>
                         </Tooltip> : <Tooltip title='Home'>
                                         <BottomNavigationAction label="Home" icon={<CheapIcon name={'home'}/>} onClick={goHome}/>
                                      </Tooltip>
               }
                <Tooltip title='Mint your NFT'>
                  <BottomNavigationAction label="Mint" icon={<CheapIcon name={'mint-nft'}/>} onClick={handleMintBut} />
                </Tooltip>
                <Tooltip title={isConnected ? 'Open cart' : 'Connect to wallet'}>
                  <BottomNavigationAction label={isConnected ? 'Cart' : 'Wallet'} icon={<CheapIcon name={isConnected ? 'cart-black': 'my-balance'}/>} onClick={isConnected ? openCart: notifyWalletOpen}/>
                </Tooltip>
            </BottomNavigation>
         </Paper>
        
    </Box>
  )
}

export default memo(CheapBottomNavigation)

