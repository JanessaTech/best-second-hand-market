import React, { memo, useEffect, useState } from 'react'
import { Box, Grid, useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart'
import NFTDetails from './NFTDetails'
import Comments from './comments/Comments'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import {getChainName, getStandard} from '../../utils/Chain'

const nftData = {
    title: 'A baby monkey',
    price: 12,
    ipfs: `ipfs://bafkreiftnbrvpu3apwgolxqlpmfea4rwqqxru6ddlcbd2msgbmsrwjcqzi`,  // returned by backned, get by chainId&address&tokenId
    chainId:1,
    chain: getChainName(1),  // get by chainId, not need returned by backend
    address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0',
    tokenId: 551,  
    tokenStandard: getStandard(1, '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'), // get by chainId &address,not needed returned by backend
    category: 'Pets',
    available: true,
    likes: 100,
    views: 2000,
    seller: 111,  // user id, returned by backned, get by chainId&address&tokenId
    img: 'mk.png',  // get by ipfs and gateway, return full url by backend
    createdTime: 'Jan 02, 2024',
    description: 'NFTs can really be anything digital (such as drawings, music, your brain downloaded and turned into an AI), but a lot of the current excitement'
}

const NFTHome = ({wallet, openCart, notifyWalletOpen}) => {
    logger.debug("[NFTHome] rendering...")
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchParams, setSearchParams] = useSearchParams()
    const [nft, setNft] = useState({})

    useEffect(() => {
      const id = searchParams.get('id')
      logger.debug('[NFTHome] call restful api to get nft details by id = ', id)
      setNft(nftData)
    }, [])

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
                    <BuyOrCart nft={nft} wallet={wallet} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

export default memo(NFTHome)



