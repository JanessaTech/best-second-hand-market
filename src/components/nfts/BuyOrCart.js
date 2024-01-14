import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { memo } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import ByLikeView from './ByLikeView'

const BuyOrCart = () => {
  return (
    <Box>
        <Box 
          sx={{width:1, borderRadius:2, mb:1}}
          component='img'
          alt='A baby money'
          src='imgs/nfts/mk.png'
        >
        </Box>
        <ByLikeView/>
        <Box sx={{mt:1, display: 'flex', justifyContent:'center'}}>
          <Button sx={{textTransform:'none', borderRadius:4, width:150, py:0,mr:4}} 
                  color='customBlack' 
                  variant='contained'>
                    <Typography variant='h6'>Buy</Typography>
          </Button>
          <IconButton sx={{p:0}}>
             <CheapIcon name='cart-black' size={50}/>
          </IconButton>
        </Box>
    </Box>
  )
}

export default memo(BuyOrCart)
