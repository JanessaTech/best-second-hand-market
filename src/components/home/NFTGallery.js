import React, { memo, useCallback, useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import {HeaderHeight, FilterBarHeight, PageSizeInGallery, BatchSizeInGallery} from '../../common/constant'
import FilterBar from './FilterBar'
import Overview from './Overview'
import OverviewSkeleton from './OverviewSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import {getFilter} from '../../utils/LocalStorage'
import catchAsync from '../../utils/CatchAsync'
import {nft as nftClient} from '../../utils/serverClient'

const NFTGallery = ({wallet, menuOpen, toggleMenu, eventsBus, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
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
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    (async () => {
      logger.debug('[NFTGallery] add handleFilterUpdate to eventsBus')
      eventsBus.handleFilterUpdate = handleFilterUpdate
      const toPage = 1
      await fetchData(toPage)
    })()
  }, [searchParams, wallet])

  const handleFilterUpdate = async () => {
    logger.debug('[NFTGallery] handleFilterUpdate')
    const toPage = 1
    await fetchData(toPage)
  }

  const fetchData = async (toPage) => {
    await catchAsync(async () => {
      logger.debug('[NFTGallery] call restful api to get the new list of nfts by latestFilter or search')
      const latestFilter = getFilter()
      const search = searchParams.get('search')
      logger.debug('[NFTGallery] search=', search)
      logger.debug('[NFTGallery] latestFilter=', latestFilter)
      logger.debug('[NFTGallery] page=', toPage)
      const chainId = latestFilter?.chainId
      const category = latestFilter?.categories
      const prices = latestFilter?.prices
      const sortBy = latestFilter?.sortBy
      const userId = wallet?.user?.id
      const res = await nftClient.queryNFTs(userId, toPage, pagination.pageSize, sortBy, chainId, category, prices)
      const {nfts, totalPages, totalResults} = res
      setBufferedNfts(nfts)
      setNfts(nfts.slice(0, BatchSizeInGallery))
      setHasMore(true)
      setTotal(totalResults)
      setPagination({...pagination, pages: totalPages, page: toPage})
      setIsLoading(false)
      logger.debug('[NFTGallery] page=', toPage, ' limit =', pagination.pageSize, 'sortBy =', sortBy, 'pages=', totalPages, 'total=', totalResults )
      window.scrollTo(0, 0)
    }, notifyAlertUpdate)
  }

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

  const handlePageChange = async (e, page) => {
    logger.debug('[NFTGallery] handlePageChange page=', page)
    const toPage = Number(page)
    await fetchData(toPage)
  }

  const handleSummary = useCallback(() => {
    return (
      <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body2'>{total} items</Typography>
      </Box>
    )
  }, [total])

  const handleUpdate = useCallback(async () => {
    logger.debug('[NFTGallery] handleUpdate...')
    const toPage = 1
    await fetchData(toPage)
    //localStorage.removeItem('filter')  // for test purpose
  }, [pagination])

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
                      <Overview wallet={wallet} nft={nft} eventsBus={eventsBus} notifyAlertUpdate={notifyAlertUpdate} notifyWalletOpen={notifyWalletOpen} notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}/>
                  </Grid>
                ))
               : Array.from(new Array(20)).map((dummy, index) => (
                <Grid key={index} item xs={6} sm={4} md={3} lg={2} xl={2}>
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

