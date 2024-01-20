import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, useMediaQuery } from '@mui/material'
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from '../nfts/Overview'

function getFilter() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    return JSON.parse(filter)
  }
  return {}
}

const NFTGallery = ({menuOpen, toggleMenu, trigger, notifyFilterChanges, handleAlert, openWallet}) => {
  console.log('NFTGallery rendering ...')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  
  useEffect(() => {
    const latestFilter = getFilter()
    console.log('[NFTGallery.trigger] fetch data based on latestFilter:', latestFilter)
  }, [trigger])

  return (
    <Box component="main">
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
        {/* <ConnectWallet 
          onClose={onCloseWallet} 
          open={walletOpen} 
          openSignup={openSignup} 
          cbUrl={location.pathname}
          notifyConnectionStatus={notifyConnectionStatus}
          />   
        <Signup 
          onClose={onCloseSignUp} 
          open={signupOpen} 
          handleAlert={handleAlert} 
          cbUrl={location.pathname}
          notifyConnectionStatus={notifyConnectionStatus}
          /> */}
    </Box>  
  )
}

export default memo(NFTGallery)

