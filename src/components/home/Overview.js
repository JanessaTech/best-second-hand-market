import { Box, Link, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { memo, useEffect, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import logger from '../../common/Logger'
import config from '../../config'
import catchAsync from '../../utils/CatchAsync'
import {cart as cartClient} from '../../utils/serverClient'
import { capitalize } from '../../utils/StringUtils'

const BuyOrPutCart = ({handleBuyNow, toggleCart, inCart}) => {
  return (
    <Box sx={{position:'absolute', width: 1, height: 70, bottom:0,
                          borderRadius:'0 0 16px 16px',
                          visibility: 'hidden',
                          display:'flex'
                          }}>
                <Box sx={{width:0.4, height:1, px:1, borderRadius:'0 0 0 16px', 
                          borderRight:'1px solid #fff',
                          boxSizing:'border-box',
                          '&:hover':{ backgroundColor:'#424242'},
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          backgroundColor:'rgba(0, 0, 0, 1)'}} onClick={handleBuyNow}>
                      <Typography color='white' variant='body2'>Buy</Typography>
                </Box>
                <Box sx={{width:0.6, height:1, px:1, borderRadius:'0 0 16px 0', 
                          '&:hover':{ backgroundColor:'#424242'},
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          backgroundColor:'rgba(0, 0, 0, 1)'}} onClick={toggleCart}>
                            <Typography color='white' variant='body2'>{inCart ? 'Remove from cart': 'Add to cart'}</Typography>
                </Box>
      </Box>
  )
}

const Overview = ({wallet, nft, eventsBus, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
  logger.debug('[Overview] rendering')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [inCart, setInCart] = useState(!!nft?.inCart)

  useEffect(() => {
    if (wallet) {
      logger.debug('[Overview] add handleNFTCartStatus to eventsBus')
      if (!eventsBus.overview) {
        eventsBus.overview = new Map([])
      }
      eventsBus.overview.set(nft.id, handleNFTCartStatus)
    }
    
  }, [wallet])

  useEffect(() => {
    setInCart(nft?.inCart)
  }, [nft?.inCart])

  const handleNFTCartStatus = (userId, nftIds, inCart)  => {
    //logger.debug('[Overview] handleNFTCartStatus. userId =', userId, 'nftIds =', nftIds, 'inCart =', inCart)
    //logger.debug('[Overview] wallet =', wallet) // 
    //logger.debug('[Overview] nft.id =', nft?.id) //
    if (nftIds.includes(nft?.id)) {
      if (inCart) {
        logger.debug('[Overview] nft ', nft?.id, ' is added from cart')
      } else {
        logger.debug('[Overview] nft ', nft?.id, ' is removed from cart')
      }
      setInCart(inCart)
    }
  }

  const toggleCart = async (e) => {
    e.preventDefault()
    if (!wallet) {
      notifyWalletOpen()
    } else {
      await catchAsync(async () => {
        if(!inCart){ //add
          logger.info('[Overview] putToCart')
          logger.info('[Overview] call restful api to put nft id=', nft.id, ' to cart')
          await cartClient.add(wallet?.user?.id, nft?.id)
          notifyAlertUpdate([{severity: 'success', message: 'Added to cart'}]) // when successful
        } else { //remove
          logger.info('[Overview] removeFromCart')
          logger.info('[Overview] call restful api to remove nft id=', nft.id, ' from cart')
          await cartClient.remove(wallet?.user?.id, [nft?.id])
          notifyAlertUpdate([{severity: 'success', message: 'Removed from cart'}]) // when successful
        }
        setInCart(!inCart)
      }, notifyAlertUpdate)
    } 
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    if (!wallet) {
      notifyWalletOpen()
    } else {
      notifyNetworkCheckAndBuy(nft?.chainId, [nft.id], [nft.price])
    }
  }

  return (
    <Link component={RouterLink} to={`/nft?id=${nft?.id}`}>
            <Box sx={{border:'1px solid #f5f5f5', 
                      borderRadius:4, 
                      '&:hover':{border:'2px solid #f5f5f5', cursor:'pointer'}, 
                      '&:hover div:last-child':{visibility:'visible'},
                      position: 'relative'}}>
                <Box sx={{width:1, backgroundColor:'white', borderRadius:4}}>
                    <Box
                      component='img'
                      sx={{width: 1, borderRadius:'16px 16px 0 0'}}
                      alt={nft?.title}
                      src={nft?.url}
                    />
                    <Box sx={{mx: isSmallScreen ? 1 : 2, mb:1, }}>
                        <Typography variant='h6'>{nft?.title}</Typography>
                        <Typography color='text.secondary' variant='subtitle2'>{nft?.owner?.name}</Typography>
                        <Box sx={{display: 'flex', mt:1}}>
                          <Tooltip title={`${capitalize(nft?.chainName)}`}>
                            <Box component='img' sx={{width:15, mr:1}} src={`/imgs/networks/${nft?.chainName}.svg`}/>
                          </Tooltip>
                          <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant='h6'>{nft?.price}</Typography>
                            <Typography sx={{ml:1}}>CH</Typography>
                          </Box>
                        </Box>  
                    </Box>
                    
                </Box>
                {
                (!wallet || (nft?.status === config.NFTSTATUS.On.description 
                  && (nft?.owner && wallet?.user && (nft?.owner?.id !== wallet?.user?.id)))) && 
                  <BuyOrPutCart handleBuyNow={handleBuyNow} toggleCart={toggleCart} inCart={inCart}/>
                }
            </Box> 
      </Link>
  )
}

export default memo(Overview)

