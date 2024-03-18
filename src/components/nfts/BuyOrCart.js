import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import ByLikeView from './ByLikeView'
import logger from '../../common/Logger'
import { useSearchParams } from 'react-router-dom'
import { UnavailableHelpTip } from '../../common/TipHelpers'
import config from '../../config'
import {cart as cartClient} from '../../utils/serverClient'
import catchAsync from '../../utils/CatchAsync'

const ShowBuyOrCart = ({handleBuy, handleCart, inCart}) => {
  return (
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
    </Box>
  )
}
const BuyOrCart = ({nft, wallet, openCart, eventsBus, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
  logger.debug('[BuyOrCart] rendering...')
  logger.debug('[BuyOrCart] wallet...', wallet)
  const [searchParams, setSearchParams] = useSearchParams()
  const id = Number(searchParams.get('id'))
  const [inCart, setInCart] = useState(!!nft?.inCart)

  useEffect(() => {
    logger.debug('[BuyOrCart] add handleNFTCartStatus to eventsBus')
    eventsBus.handleNFTCartStatus = handleNFTCartStatus
  }, [])

  useEffect(() => {
    setInCart(nft?.inCart)
  }, [nft?.inCart])

  const handleNFTCartStatus = (userId, nftIds, inCart)  => {
    logger.debug('[BuyOrCart] handleNFTCartStatus. userId =', userId, 'nftIds =', nftIds, 'inCart =', inCart)
    logger.debug('[BuyOrCart] wallet =', wallet) // to-do: why wallet is undefined sometimes?
    logger.debug('[BuyOrCart] nft.id =', nft?.id) // to-do: why nft is undefined sometimes?
    logger.debug('[BuyOrCart] id =', id)
    if (nftIds.includes(id)) {
      setInCart(inCart)
    }
  }

  const handleCart = async () => {
    if (wallet) {
      logger.info('[BuyOrCart] call restful to add to cart then open the cart')    
      await catchAsync(async () => {
        if (inCart) { // to remove
          await cartClient.remove(wallet?.user?.id, [nft?.id])
          notifyAlertUpdate([{severity: 'success', message: 'Removed from cart'}])
        } else { // to add
          await cartClient.add(wallet?.user?.id, nft?.id)
          openCart()
          notifyAlertUpdate([{severity: 'success', message: 'Added to cart'}])
        }
        setInCart(!inCart)
      }, notifyAlertUpdate)
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
              (!wallet || (nft?.status === config.NFTSTATUS.On.description 
              && (nft?.owner && wallet?.user && (nft?.owner?.id !== wallet?.user?.id)))) ? 
              <ShowBuyOrCart handleBuy={handleBuy} handleCart={handleCart} inCart={inCart}/>: <UnavailableHelpTip/>
            }
        </Box>
        
    </Box>
  )
}

export default memo(BuyOrCart)

