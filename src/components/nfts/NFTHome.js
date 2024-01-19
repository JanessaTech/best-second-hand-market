import React, { useCallback, useState } from 'react'
import { Box, Grid, useMediaQuery, Paper, styled} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {headerHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart';
import NFTDetails from './NFTDetails';
import Comments from './comments/Comments';
import { useLocation } from 'react-router-dom';
import ConnectWallet from '../wallet/ConnectWallet';
import Signup from '../wallet/Signup';

export default function NFTHome({user, openCart, notifyConnectionStatus, handleAlert}) {
    console.log("NFTHome rendering ...")
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const location = useLocation()

    const [walletOpen, setWalletOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
    const onCloseWallet = useCallback(() => {
      setWalletOpen(false)
    }, [walletOpen])
  
    const openWallet = useCallback(() => {
      setWalletOpen(true)
    }, [walletOpen])
  
    const onCloseSignUp = useCallback(() => {
      setSignupOpen(false)
    }, [signupOpen])
  
    const openSignup = useCallback(() => {
      setSignupOpen(true)
    }, [signupOpen])
  return (
    <Box sx={{mb: 8, mx: isSmallScreen ? 0 : 2, width:1}}>
        <Box sx={{width:1, height: headerHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <Box sx={{mr:5}}>
                        <NFTDetails/>
                        <Comments user={user}/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart user={user} openCart={openCart} openWallet={openWallet}/>
                </Grid>
            </Grid>
            <ConnectWallet 
            onClose={onCloseWallet} 
            open={walletOpen} 
            openSignup={openSignup} 
            cbUrl={`${location.pathname}${location.search}`}
            notifyConnectionStatus={notifyConnectionStatus}
            />
            <Signup 
            onClose={onCloseSignUp} 
            open={signupOpen} 
            handleAlert={handleAlert} 
            cbUrl={`${location.pathname}${location.search}`}
            notifyConnectionStatus={notifyConnectionStatus}
            /> 
        </Box>      
    </Box>
  )
}

