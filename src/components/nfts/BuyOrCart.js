import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import ByLikeView from './ByLikeView'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import { UnavailableHelpTip } from '../../common/TipHelpers'
import config from '../../config'
import {cart as cartClient} from '../../utils/serverClient'

const BuyOrCart = ({nft, wallet, openCart, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
  logger.debug('[BuyOrCart] rendering...')
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [inCart, setInCart] = useState(!!nft?.inCart)

  useEffect(() => {
    setInCart(nft?.inCart)
  }, [nft?.inCart])

  const handleCart = async () => {
    if (wallet) {
      logger.info('[BuyOrCart] call restful to add to cart then open the cart')
      try {
        if (inCart) { // to remove
          await cartClient.remove(wallet?.user?.id, nft?.id)
        } else { // to add
          await cartClient.add(wallet?.user?.id, nft?.id)
        }
        setInCart(!inCart)
        openCart()
      } catch (err) {
        let errMsg = ''
        if (err?.response?.data?.message) {
            errMsg = err?.response?.data?.message
        } else {
            errMsg = err?.message
        }
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      }
    } else {
      notifyWalletOpen()
    }
  }

  const handleBuy = async () => {
    if (wallet) {
      logger.debug('[BuyOrCart] call wallet to by the nft by address and token id')
      logger.debug('[BuyOrCart] once the buying is done successffuly, we should call restful to log an order as the history')
      notifyNetworkCheckAndBuy(nft?.chainId, [nft.id], [nft.price])
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
          src={nft?.url}
        >
        </Box>
        <ByLikeView wallet={wallet} nft={nft} notifyAlertUpdate={notifyAlertUpdate}/>
        <Box>
            {
              nft?.status === config.NFTSTATUS.On.description ? 
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

