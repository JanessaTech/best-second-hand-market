import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { CheapIcon } from '../utils/Svgs'
import { useTheme } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import logger from './Logger'

const CheapBottomNavigation = ({ wallet, openCart, toggleMenu, isShowMenu, notifyWalletOpen}) => {
    logger.info('[CheapBottomNavigation] rendering...')
    const theme = useTheme()
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0)

    const handleMintBut = () => {
      logger.debug('[CheapBottomNavigation] handleMintBut')
      if (wallet) {
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
                                         <BottomNavigationAction label="Home" icon={<CheapIcon name={'home'}/>} component={Link} to="/"/>
                                      </Tooltip>
               }
                <Tooltip title='Mint your NFT'>
                  <BottomNavigationAction label="Mint" icon={<CheapIcon name={'mint-nft'}/>} onClick={handleMintBut} />
                </Tooltip>
                <Tooltip title={wallet ? 'Open cart' : 'Connect to wallet'}>
                  <BottomNavigationAction label={wallet ? 'Cart' : 'Wallet'} icon={<CheapIcon name={wallet ? 'cart-black': 'my-balance'}/>} onClick={wallet ? openCart: notifyWalletOpen}/>
                </Tooltip>
            </BottomNavigation>
         </Paper>
        
    </Box>
  )
}

export default memo(CheapBottomNavigation)

