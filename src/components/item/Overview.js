import { Box, Link, Typography } from '@mui/material'
import React from 'react'

export default function Overview() {
  return (
    <Link href='nft?id=123'>
        <Box sx={{border:'1px solid #f5f5f5', borderRadius:4, '&:hover':{border:'2px solid #f5f5f5', cursor:'pointer'}}}>
            <Box sx={{width:1, backgroundColor:'white', borderRadius:4}}>
                <Box
                  component='img'
                  sx={{width: 1, borderRadius:'16px 16px 0 0'}}
                  alt='A baby money'
                  src='imgs/items/mk.png'
                />
                <Box sx={{mx:2, mb:1}}>
                    <Typography variant='h6'>A baby monkey</Typography>
                    <Typography color='text.secondary' variant='subtitle2'>JanessaTech lab</Typography>
                    <Box sx={{display: 'flex', mt:1}}>
                      <Box component='img' sx={{width:15, mr:1}} src='imgs/ethereum.svg'/>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h6'>12</Typography>
                        <Typography sx={{ml:1}}>CH</Typography>
                      </Box>
                    </Box>
                </Box>
            </Box>
        </Box> 
    </Link>
    
  )
}

