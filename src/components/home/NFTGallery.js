import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import {HeaderHeight, FilterBarHeight, PageSizeInGallery, BatchSizeInGallery} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from '../nfts/Overview'
import OverviewSkeleton from '../nfts/comments/OverviewSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

function createData(id, img, title, seller, network, price) {
  return {id, img, title, seller, network, price}
}
/*
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
]*/

function generateData(start, count) {
  var res = []
  for (var i = start; i < start + count; i++) {
    const data = createData(i, 'mk.png', `A baby money${i}`, `JanessaTech lab${i}`, 'ethereum', i)
    res.push(data)
  }
  return res
}

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
  const [bufferedNfts, setBufferedNfts] = useState([])
  const [nfts, setNfts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,  // the index of the current page
    pageSize: PageSizeInGallery, // how many items are shown in one page
    pages: 0 // how many pages in total
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const latestFilter = getFilter()
    console.log('call restful api to get the new list of nfts based on latestFilter', latestFilter, ' and user=', user, ' and page=', 1)
    const total = 56
    const nftsInOnePage = generateData(0, pagination.pageSize)  // assume we get back the first 100 nft for the first page
    setBufferedNfts(nftsInOnePage)
    setNfts(nftsInOnePage.slice(0, BatchSizeInGallery))
    setHasMore(true)
    setTotal(total)
    setPagination({...pagination, pages: Math.ceil(total / pagination.pageSize), page: 1})
    window.scrollTo(0, 0)
  }, [trigger])

  
  const fetchMoreData  = () => {
    console.log('fetchMoreData in page=', pagination.page)
    const moreNfts = bufferedNfts.slice(nfts.length, nfts.length + BatchSizeInGallery)
    setNfts([...nfts, ...moreNfts])
    if (nfts.length + moreNfts.length >= Math.min(100, total - (pagination.page - 1) * pagination.pageSize)) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }

  const handlePageChange = (e, page) => {
    console.log('handlePageChange page=', page)
    setPagination({...pagination, page: page})
    const latestFilter = getFilter()
    console.log('call restful api to get new list of nfts based on page and latestFilter', latestFilter, ' and page=', page)
    console.log('generateData from ', (page - 1) * pagination.pageSize, ' by count =', Math.min(pagination.pageSize, total - (page - 1) * pagination.pageSize))
    const nftsInOnePage = generateData((page - 1) * pagination.pageSize, Math.min(100, total - (page - 1) * pagination.pageSize))

    setBufferedNfts(nftsInOnePage)
    setNfts(nftsInOnePage.slice(0, BatchSizeInGallery))
    setHasMore(true)
    window.scrollTo(0, 0)
  }

  const handleSummary = useCallback(() => {
    return (
      <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body2'>{total} items</Typography>
      </Box>
    )
  }, [total])

  //console.log("nfts", nfts)

  return (
    <Box component="main" sx={{width:1}}>
        <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
        <FilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate} handleSummary={handleSummary}/>
        <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
        <InfiniteScroll
                  dataLength={nfts.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
        ></InfiniteScroll>
        <Grid container spacing={2}>
            {
              !isLoading ?  
                nfts.map( (nft) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                      <Overview nft={nft} notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
                  </Grid>
                ))
               : Array.from(new Array(20)).map((dummy) => (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                  <OverviewSkeleton/>
                </Grid>
              ))         
            }
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

