import React, { memo, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, useMediaQuery } from '@mui/material'
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from '../nfts/Overview'
import ConnectWallet from '../wallet/ConnectWallet'
import Signup from '../wallet/Signup'

function getFilter() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    return JSON.parse(filter)
  }
  return {}
}

const NFTGallery = ({menuOpen, toggleMenu, trigger, notifyFilterChanges, handleAlert}) => {
  console.log('NFTGallery rendering ...')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [walletOpen, setWalletOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const onCloseWallet = () => {
    setWalletOpen(false)
  }

  const openWallet = () => {
    setWalletOpen(true)
  }

  const onCloseSignUp = () => {
    setSignupOpen(false)
  }

  const openSignup = () => {
    console.log('setSignupOpen(true)')
    setSignupOpen(true)
  }

  useEffect(() => {
    const latestFilter = getFilter()
    console.log('[NFTGallery.trigger] fetch data based on latestFilter:', latestFilter)
  }, [trigger])

  return (
    <Box component="main" 
        sx={{ width: menuOpen && !isMediumScreen ? `calc(100% - ${drawerWidth}px)` : 1, 
            }}>
        <Box sx={{width:1, height: headerHeight + filterBarHeight}}></Box>
        <FilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterChanges={notifyFilterChanges}/>
        <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview handleAlert={handleAlert} openWallet={openWallet}/>
            </Grid>
          </Grid>
        </Box>
        <ConnectWallet onClose={onCloseWallet} open={walletOpen} openSignup={openSignup}/>   
        <Signup onClose={onCloseSignUp} open={signupOpen} handleAlert={handleAlert}/>
    </Box>  
  )
}

export default memo(NFTGallery)

