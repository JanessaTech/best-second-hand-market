import { Avatar, Box, Typography } from '@mui/material'
import React, { memo } from 'react'

const NfterOverview = () => {
  return (
    <Box>
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
            <Typography variant='subtitle2'>About the NFTer:</Typography>
            <Typography variant='body2'>10 NFTs on sale</Typography>
            <Typography variant='body2'>21 NFTs were bought</Typography>
        </Box>
    </Box>
  )
}

export default memo(NfterOverview)

