import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import {HeaderHeight, FilterBarHeight, PageSizeInGallery, BatchSizeInGallery} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from './Overview'
import OverviewSkeleton from './OverviewSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../../config'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'

function createData(id, img, title, seller, network, price, incart) {
  return {id, img, title, seller, network, price, incart}
}

function generateData(start, count) {
  var res = []
  for (var i = start; i < start + count; i++) {
    const data = createData(i, 'mk.png', `A baby money${i}`, `JanessaTech lab${i}`, 'ethereum', i, true)
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

const NFTGallery = ({wallet, menuOpen, toggleMenu, trigger, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen}) => {
  logger.debug('[NFTGallery] rendering ...')

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [searchParams, setSearchParams] = useSearchParams()

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
    const search = searchParams.get('search')
    logger.debug('[NFTGallery] call restful api to get the new list of nfts by trigger, latestFilter or search')
    logger.debug('[NFTGallery] trigger=', trigger)
    logger.debug('[NFTGallery] search=', search)
    logger.debug('[NFTGallery] latestFilter=', latestFilter)
    logger.debug('[NFTGallery] page=', 1)
    const total = 403
    const nftsInOnePage = generateData(0, pagination.pageSize)  // assume we get back the first 100 nft for the first page
    logger.debug('[NFTGallery] nftsInOnePage length', nftsInOnePage.length)
    setBufferedNfts(nftsInOnePage)
    logger.debug('[NFTGallery] nftsInOnePage.slice(0, BatchSizeInGallery).length', nftsInOnePage.slice(0, BatchSizeInGallery).length)
    setNfts(nftsInOnePage.slice(0, BatchSizeInGallery))
    setHasMore(true)
    setTotal(total)
    setPagination({...pagination, pages: Math.ceil(total / pagination.pageSize), page: 1})
    window.scrollTo(0, 0)
  }, [trigger, searchParams])

  
  const fetchMoreData  = () => {
    logger.debug('[NFTGallery] fetchMoreData in page=', pagination.page)
    const moreNfts = bufferedNfts.slice(nfts.length, nfts.length + BatchSizeInGallery)
    setNfts([...nfts, ...moreNfts])
    if (nfts.length + moreNfts.length >= Math.min(100, total - (pagination.page - 1) * pagination.pageSize)) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }

  const handlePageChange = (e, page) => {
    logger.debug('[NFTGallery] handlePageChange page=', page)
    setPagination({...pagination, page: page})
    const latestFilter = getFilter()
    logger.debug('[NFTGallery] call restful api to get new list of nfts based on page and latestFilter', latestFilter, ' and page=', page)
    logger.debug('[NFTGallery] generateData from ', (page - 1) * pagination.pageSize, ' by count =', Math.min(pagination.pageSize, total - (page - 1) * pagination.pageSize))
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

  const handleUpdate = useCallback(() => {
    logger.debug('[NFTGallery] handleUpdate...')
    const latestFilter = getFilter()
    logger.debug('[NFTGallery] call restful api to get the new list of nfts based on latestFilter', latestFilter, ' and wallet=', wallet, ' and page=', 1)
    const total = 504
    const nftsInOnePage = generateData((pagination.page - 1) * pagination.pageSize, Math.min(100, total - (pagination.page - 1) * pagination.pageSize))
    setBufferedNfts(nftsInOnePage)
    setNfts(nftsInOnePage.slice(0, BatchSizeInGallery))
    setHasMore(true)
    setTotal(total)
    setPagination({...pagination, pages: Math.ceil(total / pagination.pageSize), page: 1})
    window.scrollTo(0, 0)
    localStorage.removeItem('filter')
  }, [pagination])

  logger.info('config:', config)
  logger.debug('nfts', nfts)
  return (
    <Box component="main" sx={{width:1}}>
        <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
        <FilterBar
           menuOpen={menuOpen} 
           toggleMenu={toggleMenu} 
           notifyFilterUpdate={notifyFilterUpdate} 
           handleSummary={handleSummary} 
           handleUpdate={handleUpdate}/>
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
                  <Grid key={nft.id} item xs={6} sm={4} md={3} lg={2} xl={2}>
                      <Overview wallet={wallet} nft={nft} notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen}/>
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

