import { Avatar, Box, Link, Typography } from '@mui/material'
import React from 'react'

export default function NfterOverview() {
  return (
    <Box sx={{ width: 250, border: '1px solid #f5f5f5', p: 2,ml:2,bgcolor: 'background.paper', borderRadius:2}}>
        <Box sx={{display:'flex', alignItems:'center'}}>
            <Avatar alt='JanessaTech lab' src='imgs/nfters/me.png'/>
            <Box sx={{ml:1}}>
                <Typography variant='subtitle1'>JanessaTech lab</Typography>
                <Typography color='text.secondary' variant='body2'>Last login: Jan 01 2024 10:31 AM </Typography>
            </Box>
        </Box>
        <Box sx={{my:1}}>
            <Typography>Hi, I'm JanessaTech a big fan of NFT. Weclome to my lab to check more NFTs on sale</Typography>
        </Box>
        <Box>
            <Typography variant='subtitle2'>About NFTer:</Typography>
            <Typography variant='body2'>10 NFTs on sale</Typography>
            <Typography variant='body2'>21 NFTs were bought</Typography>
        </Box>
    </Box>
  )
}

