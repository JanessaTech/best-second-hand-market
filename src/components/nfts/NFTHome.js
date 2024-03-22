import React, { memo, useEffect, useState } from 'react'
import { Box, Grid, useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart'
import NFTDetails from './NFTDetails'
import Comments from './comments/Comments'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import {nft as nftClient} from '../../utils/serverClient/'
import catchAsync from '../../utils/CatchAsync'
import { NFTDetailsSkeleton } from './NFTDetailsSkeleton'

const NFTHome = ({wallet, openCart, eventsBus, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
    logger.debug("[NFTHome] rendering...")
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchParams, setSearchParams] = useSearchParams()
    const [nft, setNft] = useState({})

    useEffect(() => {
      (async () => {
        const id = searchParams.get('id')
        logger.debug('[NFTHome] call restful api to get nft details by id = ', id)
        await catchAsync(async () => {
          const NFT = await nftClient.findNFTById(id, wallet?.user?.id)
          logger.debug('[NFTHome] NFT = ', NFT)
          setNft(NFT)
        }, notifyAlertUpdate)
      })()
    }, [wallet])

  return (
    <Box sx={{mb: 8, mx: isSmallScreen ? 0 : 2, width:1}}>
        <Box sx={{width:1, height: HeaderHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <Box sx={{mr:5}}>
                        {Object.keys(nft).length === 0 ? <NFTDetailsSkeleton /> : <NFTDetails nft={nft}/>}
                        <Comments wallet={wallet} nftId={nft?.id} notifyAlertUpdate={notifyAlertUpdate}/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart 
                      nft={nft} 
                      wallet={wallet} 
                      openCart={openCart} 
                      eventsBus={eventsBus}
                      notifyAlertUpdate={notifyAlertUpdate}
                      notifyWalletOpen={notifyWalletOpen} 
                      notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

export default memo(NFTHome)



