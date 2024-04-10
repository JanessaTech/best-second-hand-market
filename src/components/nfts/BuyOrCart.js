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
const BuyOrCart = ({nft, wallet, openCart, center, refresh, notifyAlertUpdate, notifyWalletOpen}) => {
  logger.debug('[BuyOrCart] rendering...')
  logger.debug('[BuyOrCart] wallet...', wallet)
  const [searchParams, setSearchParams] = useSearchParams()
  const id = Number(searchParams.get('id'))
  const [inCart, setInCart] = useState(!!nft?.inCart)
  const [showBuyOrPutCart, setBuyOrPutCart] = useState(true)
  const [buyData, setBuyData] = useState(undefined)

  useEffect(() => {
    logger.debug('[BuyOrCart] add handleNFTCartStatus and handleDisableBuyCart to eventsBus in center')
    center.eventsBus.handleNFTCartStatus = handleNFTCartStatus
    center.eventsBus.handleDisableBuyCart = handleDisableBuyCart
  }, [])

  useEffect(() => {
    setInCart(nft?.inCart)
  }, [nft?.inCart])

  useEffect(() => {
    if (buyData) {
      logger.debug('[BuyOrCart] add handleNetworkChangeDone to eventsBus in center')
      center.eventsBus.handleNetworkChangeDone = handleNetworkChangeDone
    }
  }, [buyData])

  const handleNetworkChangeDone = () => {
    logger.debug('[BuyOrCart] handleNetworkChangeDone')
    logger.debug('[BuyOrCart] buyData =', buyData)

    center.asyncCall('notify_erc20_balanceOf').then((balance) => {
      logger.debug('[BuyOrCart] balance = ', balance)
      const enough = Number(balance) >= buyData.totalPrice
      logger.debug('[BuyOrCart] check if balance is enough: ', enough)
      if (!enough) {
        throw new Error('Your balance is not enough. Please deposit it first.')
      }
    }).then(() => {
      const transferData = {
        tos: [buyData?.from],
        values: [buyData?.totalPrice]
      }
      logger.debug('[BuyOrCart] transferData =', transferData)
      center.asyncCall('notity_erc20_transferInBatch', transferData).then(() => {
        logger.debug('[BuyOrCart] transfer is done')
        center.asyncCall('notity_erc1115_buy', buyData).then(() => {
          setBuyOrPutCart(false)
          //refresh()  // it doesn't work// refresh nft page
          notifyAlertUpdate([{severity: 'success', message: 'The NFT is bought successfully'}])
        }).catch((err) => {
          const errMsg = err?.info?.error?.message || err?.message
          logger.error('[BuyOrCart] Failed to call buy due to ', err)
          notifyAlertUpdate([{severity: 'error', message: errMsg}])
        })
      }).catch((err) => {
        const errMsg = err?.info?.error?.message || err?.message
        logger.error('[BuyOrCart] Failed to transfer token due to ', err)
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      })
    }).catch((err) => {
      logger.error('[BuyOrCart] Failed to buy due to ', err)
      const errMsg = err?.info?.error?.message || err?.message
      notifyAlertUpdate([{severity: 'error', message: errMsg}])
    })
  }

  const handleNFTCartStatus = (userId, nftIds, inCart)  => {
    logger.debug('[BuyOrCart] handleNFTCartStatus. userId =', userId, 'nftIds =', nftIds, 'inCart =', inCart)
    logger.debug('[BuyOrCart] wallet =', wallet) // to-do: why wallet is undefined sometimes?
    logger.debug('[BuyOrCart] nft.id =', nft?.id) // to-do: why nft is undefined sometimes?
    logger.debug('[BuyOrCart] id =', id)
    if (nftIds.includes(id)) {
      setInCart(inCart)
    }
  }

  const handleDisableBuyCart = (nftIds) => {
    logger.debug('[BuyOrCart] handleDisableBuyCart')
    if (nftIds.includes(id)) {
      logger.debug('[BuyOrCart] Disable buy/cart button for nft ',  id)
      setBuyOrPutCart(false)
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
      await center.asyncCall('notifyNetworkChangeCheck', nft.chainId)
      const buyData = {
        chainId: nft?.chainId,
        address: nft?.address,
        from: nft?.owner?.address,
        to: wallet?.address,
        ids: [nft.tokenId],
        totalPrice: nft.price
      }
      setBuyData(buyData)
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
              && (nft?.owner && wallet?.user && (nft?.owner?.id !== wallet?.user?.id)) && showBuyOrPutCart)) ? 
              <ShowBuyOrCart handleBuy={handleBuy} handleCart={handleCart} inCart={inCart}/>: <UnavailableHelpTip/>
            }
        </Box>
        
    </Box>
  )
}

export default memo(BuyOrCart)

