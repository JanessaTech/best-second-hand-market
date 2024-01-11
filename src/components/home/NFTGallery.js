import React, { memo } from 'react'
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Paper, styled, useMediaQuery } from '@mui/material'
import {headerHeight, drawerWidth, filterBarHeight} from '../../common/constant'
import FilterBar from './FilterBar'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const NFTGallery = ({menuOpen, toggleMenu}) => {
  const theme = useTheme()
  console.log('rending NFTGallery ...')
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box component="main" 
        sx={{ width: menuOpen ? `calc(100% - ${drawerWidth}px)` : 1, height: 1300, 
            }}>
        <Box sx={{width:1, height: headerHeight + filterBarHeight}}></Box>
        <Box sx={{}}>
            <FilterBar menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            <Box sx={{backgroundColor:'pink', mt:1, mx: isSmallScreen ? 1: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Item>xs=4</Item>
                </Grid>
              </Grid>
            </Box>
        </Box>        
    </Box>  
  )
}

export default memo(NFTGallery)

