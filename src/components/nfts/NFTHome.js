import React, { memo, useEffect, useState } from 'react'
import { Box, Grid, useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart';
import NFTDetails from './NFTDetails';
import Comments from './comments/Comments'
import logger from '../../common/Logger';
import { useSearchParams } from 'react-router-dom';

const nftData = {
    title: 'A baby monkey',
    price: 12,
    cid: 'bafybeifvpojdj4ar5wiawksem3lifksiituu4jdwsr53uopuy7dmish6va',
    chain: 'ethereum',
    address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0',
    tokenId: 551,
    tokenStandard: '721',
    category: 'Pets',
    available: true,
    likes: 100,
    views: 2000,
    seller: 111,
    img: 'mk.png',
    createdTime: 'Jan 02, 2024',
    description: 'NFTs can really be anything digital (such as drawings, music, your brain downloaded and turned into an AI), but a lot of the current excitement'
}

const NFTHome = ({user, openCart, notifyWalletOpen}) => {
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
                        <Comments user={user}/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart nft={nft} user={user} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

export default memo(NFTHome)



