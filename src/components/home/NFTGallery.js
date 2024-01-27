import React, { memo, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Pagination, useMediaQuery } from '@mui/material'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from '../nfts/Overview'

function getFilter() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    return JSON.parse(filter)
  }
  return {}
}

const NFTGallery = ({user, menuOpen, toggleMenu, trigger, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen}) => {
  console.log('NFTGallery rendering ...')

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [pagination, setPagination] = useState({
    page: 1,  // the index of the current page
    pageSize: 3, // how many items are shown in one page
    pages: 10 // how many pages in total
  })

  useEffect(() => {
    const latestFilter = getFilter()
    console.log('call restful api to get the initial list of nfts based on latestFilter', latestFilter, ' user=', user)

  }, [])
  
  useEffect(() => {
    const latestFilter = getFilter()
    console.log('call restful api to get the new list of nfts based on latestFilter', latestFilter, ' and user=', user)
    
  }, [trigger])

  const handlePageChange = (e, page) => {
    setPagination({...pagination, page: page})
  }

  return (
    <Box component="main">
        <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
        <FilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate}/>
        <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                <Overview notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
            </Grid>
          </Grid>
          <Pagination 
            sx={{mt:2, display:'flex', justifyContent:'end'}} 
            count={pagination.pages} 
            page={pagination.page} 
            variant="outlined" 
            color="primary"
            boundaryCount={1}
            siblingCount={0}
            onChange={handlePageChange}/>
        </Box>
    </Box>  
  )
}

export default memo(NFTGallery)

