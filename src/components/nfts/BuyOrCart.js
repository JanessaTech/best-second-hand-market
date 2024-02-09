import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import ByLikeView from './ByLikeView'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import { UnavailableHelpTip } from '../../common/TipHelpers'


const BuyOrCart = ({nft, wallet, openCart, notifyWalletOpen, notifyNetworkCheck}) => {
  logger.debug('[BuyOrCart] rendering...')
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [inCart, setInCart] = useState(false)

  const handleCart = () => {
    if (wallet) {
      logger.info('[BuyOrCart] call restful to add to cart then open the cart')
      setInCart(!inCart)
      openCart()
    } else {
      notifyWalletOpen()
    }
  }

  const handleBuy = async () => {
    if (wallet) {
      logger.debug('[BuyOrCart] call wallet to by the nft by address and token id')
      logger.debug('[BuyOrCart] once the buying is done successffuly, we should call restful to log an order as the history')
      notifyNetworkCheck(nft?.chainId)
    } else {
      notifyWalletOpen()
    }
    
  }

  return (
    <Box>
        <Box 
          sx={{width:1, borderRadius:2, mb:1}}
          component='img'
          alt={nft?.title}
          src={`/imgs/nfts/${nft.img}`}
        >
        </Box>
        <ByLikeView wallet={wallet} nft={nft}/>
        <Box>
            {
              nft?.available ? 
              <Box sx={{mt:1, display: 'flex', justifyContent:'center'}}>
                  <Button sx={{textTransform:'none', borderRadius:'50vh', width:150, py:0, mr:4}} 
                          color='customBlack' 
                          variant='contained'
                          onClick={handleBuy}
                          >
                            <Typography variant='h6'>Buy now</Typography>
                  </Button>
                  <IconButton sx={{p:0, position:'relative'}} onClick={handleCart}>
                      <Tooltip title={inCart ? 'Remove from cart' : 'Add to cart'}>
                        <Box><CheapIcon name='cart-black' size={50}/></Box>
                      </Tooltip>
                      {inCart && <CheapIcon name='minus' size={20} sx={{position:'absolute', top:0, right:0}}/>}
                  </IconButton> 
              </Box> : <UnavailableHelpTip/>
            }
        </Box>
        
    </Box>
  )
}

export default memo(BuyOrCart)

