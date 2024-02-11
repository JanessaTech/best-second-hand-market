import { Box, Link, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { memo, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import logger from '../../common/Logger'

const Overview = ({wallet, nft, notifyAlertUpdate, notifyWalletOpen, notifyNetworkCheckAndBuy}) => {
  logger.debug('[Overview] rendering')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [incart, setIncart] = useState(nft.incart)

  const putToCart = () => {
    logger.info('[Overview] putToCart')
    logger.info('[Overview] call restful api to put nft id=', nft.id, ' to cart')
    setIncart(true)
    notifyAlertUpdate([{severity: 'success', message: 'Added to shopping cart'}]) // when successful
  }

  const removeFromCart = () => {
    logger.info('[Overview] removeFromCart')
    logger.info('[Overview] call restful api to remove nft id=', nft.id, ' from cart')
    setIncart(false)
    notifyAlertUpdate([{severity: 'success', message: 'Removed from shopping cart'}]) // when successful
  }

  const toggleCart = (e) => {
    e.preventDefault()
    if (!wallet) {
      notifyWalletOpen()
    } else {
      if(!incart){
        putToCart()
      } else{
        removeFromCart()
      }
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
                      src={`/imgs/nfts/${nft?.img}`}
                    />
                    <Box sx={{mx: isSmallScreen ? 1 : 2, mb:1, }}>
                        <Typography variant='h6'>A baby monkey</Typography>
                        <Typography color='text.secondary' variant='subtitle2'>{nft?.seller}</Typography>
                        <Box sx={{display: 'flex', mt:1}}>
                          <Tooltip title='Ethereum'>
                            <Box component='img' sx={{width:15, mr:1}} src={`/imgs/networks/${nft?.network}.svg`}/>
                          </Tooltip>
                          <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant='h6'>{nft?.price}</Typography>
                            <Typography sx={{ml:1}}>CH</Typography>
                          </Box>
                        </Box>  
                    </Box>
                    
                </Box>
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
                                        <Typography color='white' variant='body2'>{incart ? 'Remove from cart': 'Add to cart'}</Typography>
                            </Box>
                </Box>
            </Box> 
      </Link>
  )
}

export default memo(Overview)

