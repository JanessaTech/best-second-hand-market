import React, { memo } from 'react'
import { Box, Grid, useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart';
import NFTDetails from './NFTDetails';
import Comments from './comments/Comments';

const NFTHome = ({user, openCart, notifyWalletOpen}) => {
    console.log("NFTHome rendering ...")
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box sx={{mb: 8, mx: isSmallScreen ? 0 : 2, width:1}}>
        <Box sx={{width:1, height: HeaderHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <Box sx={{mr:5}}>
                        <NFTDetails/>
                        <Comments user={user}/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart user={user} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

export default memo(NFTHome)



