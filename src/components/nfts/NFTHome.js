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

const NFTHome = ({wallet, openCart, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
    logger.debug("[NFTHome] rendering...")
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchParams, setSearchParams] = useSearchParams()
    const [nft, setNft] = useState({})

    useEffect(() => {
      const id = searchParams.get('id')
      logger.debug('[NFTHome] call restful api to get nft details by id = ', id)
      nftClient.findNFTById(id, wallet?.user?.id)
      .then((NFT) => {
        logger.debug('[NFTHome] NFT = ', NFT)
        setNft(NFT)
      })
      .catch ((err) => {
        let errMsg = ''
        if (err?.response?.data?.message) {
            errMsg = err?.response?.data?.message
        } else {
            errMsg = err?.message
        }
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      })
    }, [wallet])

  return (
    <Box sx={{mb: 8, mx: isSmallScreen ? 0 : 2, width:1}}>
        <Box sx={{width:1, height: HeaderHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <Box sx={{mr:5}}>
                        <NFTDetails nft={nft}/>
                        <Comments wallet={wallet}/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart nft={nft} wallet={wallet} openCart={openCart} notifyWalletOpen={notifyWalletOpen} notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

export default memo(NFTHome)



