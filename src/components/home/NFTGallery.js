import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from '../nfts/Overview'
import OverviewSkeleton from '../nfts/comments/OverviewSkeleton'

function createData(id, img, title, seller, network, price) {
  return {id, img, title, seller, network, price}
}

const nftData = [
  createData(1, 'mk.png', 'A baby money1', 'JanessaTech lab', 'ethereum', 11),
  createData(2, 'mk.png', 'A baby money2', 'JanessaTech lab', 'ethereum', 12),
  createData(3, 'mk.png', 'A baby money3', 'JanessaTech lab', 'ethereum', 13),
  createData(4, 'mk.png', 'A baby money4', 'JanessaTech lab', 'ethereum', 14),
  createData(5, 'mk.png', 'A baby money5', 'JanessaTech lab', 'ethereum', 15),
  createData(6, 'mk.png', 'A baby money6', 'JanessaTech lab', 'ethereum', 16),
  createData(7, 'mk.png', 'A baby money7', 'JanessaTech lab', 'ethereum', 17),
  createData(8, 'mk.png', 'A baby money8', 'JanessaTech lab', 'ethereum', 18),
  createData(9, 'mk.png', 'A baby money9', 'JanessaTech lab', 'ethereum', 19),
  createData(10, 'mk.png', 'A baby money10', 'JanessaTech lab', 'ethereum', 20)
]

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
  const [nfts, setNfts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,  // the index of the current page
    pageSize: 3, // how many items are shown in one page
    pages: 10 // how many pages in total
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const latestFilter = getFilter()
    console.log('call restful api to get the initial list of nfts based on latestFilter', latestFilter, ' user=', user)
    setNfts(nftData)
  }, [])
  
  useEffect(() => {
    const latestFilter = getFilter()
    console.log('call restful api to get the new list of nfts based on latestFilter', latestFilter, ' and user=', user)
  }, [trigger])

  const handlePageChange = (e, page) => {
    setPagination({...pagination, page: page})
    const latestFilter = getFilter()
    console.log('call restful api to get new list of nfts based on page and latestFilter', latestFilter, ' and page=', page)
  }

  const handleSummary = useCallback(() => {
    return (
      <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body2'>{nfts.length} items</Typography>
      </Box>
    )
  }, [nfts])

  //console.log("nfts", nfts)

  return (
    <Box component="main" sx={{width:1}}>
        <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
        <FilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate} handleSummary={handleSummary}/>
        <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
          <Grid container spacing={2}>
            {
              !isLoading ? nfts.map( (nft) => (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                    <Overview nft={nft} notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
                </Grid>
              )) : Array.from(new Array(nfts.length)).map((dummyNft) => (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                  <OverviewSkeleton/>
                </Grid>
              ))
              
            }
            
            {/* <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
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
            </Grid> */}
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

