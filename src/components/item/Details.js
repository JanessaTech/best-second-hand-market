import React from 'react'
import { Box, Grid, useMediaQuery, Paper, styled} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {headerHeight} from '../../common/constant'
import ByLikeView from './ByLikeView';
import NFTInfo from './NFTInfo';
import Comments from './Comments';
import BuyOrCart from './BuyOrCart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function Details() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{mb: 7, mx: isSmallScreen ? 0 : 2, backgroundColor:'pink', width:1, height:1000}}>
        <Box sx={{width:1, height: headerHeight}}></Box>
        <Box sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <ByLikeView/>
                    <NFTInfo/>
                    <Comments/>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <BuyOrCart/>
                </Grid>
            </Grid>
        </Box>
        
    </Box>
  )
}

