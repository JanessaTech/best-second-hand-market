import { Box, Link, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'

export default function Overview({handleAlert}) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  
  const [state, setState] = useState({
    inCart: false
  })

  useEffect(() => {
    if (state.inCart) {
      console.log('call restful api to put to cart..')
    } else {
      console.log('call restful api to remove from cart ...')
    }
  }, [state.inCart])

  const toggleCart = (e) => {
    e.preventDefault()
    if(!state.inCart){
      handleAlert('success', 'Added to shopping cart')
    } else{
      handleAlert('success', 'Removed from shopping cart')
    }
    setState({...state, inCart: !state.inCart})
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    console.log('handleBuyNow...')
  }

  return (
    <Link href='nft?id=123'>
            <Box sx={{border:'1px solid #f5f5f5', 
                      borderRadius:4, 
                      '&:hover':{border:'2px solid #f5f5f5', cursor:'pointer'}, 
                      '&:hover div:last-child':{visibility:'visible'},
                      position: 'relative'}}>
                <Box sx={{width:1, backgroundColor:'white', borderRadius:4}}>
                    <Box
                      component='img'
                      sx={{width: 1, borderRadius:'16px 16px 0 0'}}
                      alt='A baby money'
                      src='imgs/nfts/mk.png'
                    />
                    <Box sx={{mx: isSmallScreen ? 1 : 2, mb:1, }}>
                        <Typography variant='h6'>A baby monkey</Typography>
                        <Typography color='text.secondary' variant='subtitle2'>JanessaTech lab</Typography>
                        <Box sx={{display: 'flex', mt:1}}>
                          <Tooltip title='Ethereum'>
                            <Box component='img' sx={{width:15, mr:1}} src='imgs/ethereum.svg'/>
                          </Tooltip>
                          <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant='h6'>12</Typography>
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
                                        <Typography color='white' variant='body2'>{state.inCart ? 'Remove from cart': 'Add to cart'}</Typography>
                            </Box>
                </Box>
                
            </Box> 
      </Link>
  )
}

