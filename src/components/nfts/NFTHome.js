import React from 'react'
import { Box, Grid, useMediaQuery, Paper, styled} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {headerHeight} from '../../common/constant'
import BuyOrCart from './BuyOrCart';
import NFTDetails from './NFTDetails';
import Comments from './comments/Comments';

export default function NFTHome({openCart}) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{mb: 8, mx: isSmallScreen ? 0 : 2, width:1}}>
        <Box sx={{width:1, height: headerHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <Box sx={{mr:5}}>
                        <NFTDetails/>
                        <Comments/>
                    </Box>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart openCart={openCart}/>
                </Grid>
            </Grid>
        </Box>      
    </Box>
  )
}

