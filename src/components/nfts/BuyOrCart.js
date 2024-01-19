import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import ByLikeView from './ByLikeView'

const BuyOrCart = ({user, openCart, openWallet}) => {
  const [inCart, setInCart] = useState(false)

  const handleCart = () => {
    const isConnected = localStorage.getItem('isConnected')
    if (isConnected) {
      console.log('[BuyOrCart]call restful to add to cart then open the cart')
      setInCart(!inCart)
      openCart()
    } else {
      openWallet()
    }
  }

  return (
    <Box>
        <Box 
          sx={{width:1, borderRadius:2, mb:1}}
          component='img'
          alt='A baby money'
          src='imgs/nfts/mk.png'
        >
        </Box>
        <ByLikeView user={user}/>
        <Box sx={{mt:1, display: 'flex', justifyContent:'center'}}>
          <Button sx={{textTransform:'none', borderRadius:'50vh', width:150, py:0, mr:4}} 
                  color='customBlack' 
                  variant='contained'>
                    <Typography variant='h6'>Buy now</Typography>
          </Button>
          <IconButton sx={{p:0, position:'relative'}} onClick={handleCart}>
              <Tooltip title={inCart ? 'Remove from cart' : 'Add to cart'}>
                <Box><CheapIcon name='cart-black' size={50}/></Box>
              </Tooltip>
              {inCart && <CheapIcon name='minus' size={20} sx={{position:'absolute', top:0, right:0}}/>}
          </IconButton>
        </Box>
    </Box>
  )
}

export default memo(BuyOrCart)

