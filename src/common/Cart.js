import { Box, Button, Divider, Drawer, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { CheapIcon } from '../utils/Svgs'
import {cartWidth, headerHeight} from './constant'
import CustomPopper from './CustomPopper';


const data = [
  {
    nftId: 1,
    title: 'The most fasionable shoes',
    img: 'shoes.jpeg',
    nfter: 'Fashion lab',
    available: true,
    price: 12.69
  },
  {
    nftId: 2,
    title: 'The most fasionable Phone',
    img: 'phone.webp',
    nfter: 'Phone lab',
    available: true,
    price: 123.6},
  {
    nftId: 3,
    title: 'A baby monkey',
    img: 'mk.png',
    nfter: 'JanessaTech lab',
    available: false,
    price: 100.3}
]

function calcPrice(data) {
  let price = 0.0
  for (var i = 0; i < data.length; i++) {
    if (data[i].available) {
      price += data[i].price
    }
  }
  return price.toFixed(3)  // maybe a bug
}

const HelpContent = () => {
  return (
    <Box>
      <Typography variant='body2'>The item is unavailable because it has been purchased by someone else, the seller has removed the listing or the order has expired </Typography>
    </Box>
  )
}

const CartItem = (props) => {
  const {nftId, title, img, nfter, available, price, deleteFromCart, ...others} = props

  const [anchorEl, setAnchorEl] = React.useState(null)

  const openHelp = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closeHelp = () => {
    setAnchorEl(null)
  }


  return (
    <Box sx={{
        border:'1px solid #fff', 
        '&:hover':{borderColor:'#9e9e9e'},
        '&:hover button':{visibility:'visible'},
        py:'10px', px:'6px', 
        borderRadius:3, 
        position:'relative',
        cursor:'pointer'}}>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Box sx={{display:'flex'}}>
                  <Box
                      sx={{width:60, height:60, borderRadius:3}}
                      component='img'
                      alt={title}
                      src={`imgs/nfts/${img}`}
                  />
                  <Box sx={{ml:1, width:130}}>
                    <Typography 
                      sx={{textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden',
                          fontWeight:'bold'
                        }}>{title}</Typography>
                    <Box sx={{mt:1}}>
                        {
                          available ? <Box sx={{display:'flex', alignItems:'center'}}>
                                        <Typography variant='body2' sx={{mr:1}}>By</Typography>
                                        <Typography variant='body2' color='primary.main' 
                                              sx={{textOverflow: 'ellipsis', 
                                                   whiteSpace: 'nowrap', 
                                                   overflow: 'hidden'}}
                                        >{nfter}</Typography>
                                      </Box> : <Box sx={{display:'flex', alignItems:'center'}}>
                                                    <Typography variant='body2'>Not available</Typography>
                                                    <Box onMouseOver={openHelp} onMouseLeave={closeHelp}>
                                                        <CheapIcon name='help' size={16}/>
                                                    </Box>
                                                    <CustomPopper idPrefix='nft-unavailable' anchorEl={anchorEl} width={250} placement={'top'} content={<HelpContent/>} />
                                                </Box>
                        }
                        
                    </Box>
                  </Box>
              </Box>
              <Box>
                <Typography variant='body2'>{available ? `${price} CH` : ''}</Typography>
              </Box>
          </Box>
          <IconButton sx={{position:'absolute', right:20, bottom:5, visibility:'hidden', p:0}} onClick={() => deleteFromCart(nftId)}>
                  <DeleteIcon />
          </IconButton>
    </Box>
  )
}

const Cart = ({toggleCart, open, nfterId}) => {
  console.log('Cart rendering ...')

  const fetchItems = () => {
    if(open) {
      console.log('call restful api to get latest items in cart by nfterId')
    }
    return data
  }
  
  const [state, setState] = useState({
    nfts: fetchItems(),
    price: 0.000
  })

  const closeCart = () => {
    toggleCart()
  }

  const clearCart = () => {
    console.log('call restful apis to clear cart for nfterId')
    setState({nfts: [], price: 0.000})
  }

  const deleteFromCart = (nftId) => {
    console.log('call restful api to delete a nft by nftId')
    const newNfts = state.nfts.filter((nft) => nft.nftId !== nftId)
    setState({nfts: newNfts, price: calcPrice(newNfts)})
  }

  return (
    <Drawer
        sx={{'& .MuiDrawer-paper': {
            width: cartWidth,
            top: headerHeight + 10,
            height:'80%',
            borderRadius:2
        }}}
        anchor='right'
        open={open}
        onClose={toggleCart}
        disableScrollLock={true}
    >
        <Box sx={{py:3, px:3}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography variant='h6'>My Cart</Typography>
              <Tooltip title='Close cart' placement="left">
                    <IconButton onClick={closeCart}>
                        <CheapIcon name={'close'}/>
                    </IconButton>
              </Tooltip>
            </Box>
            <Divider sx={{my:2}}/>
            <Box sx={{display: 'flex', justifyContent:'space-between', my:2}}>
                <Typography>{state.nfts.length} items</Typography>
                <Box sx={{cursor:'pointer', '&:hover':{color:'black'}}} onClick={clearCart}>
                      <Typography>Clear all</Typography>
                </Box>
            </Box>
            {state.nfts.map((nft) =>
            (
              <Box key={nft.nftId}>
                  <CartItem {...nft} deleteFromCart={deleteFromCart}/>
                  <Divider sx={{my: 2}}/>
              </Box>
            ))}
            
            <Box sx={{display:'flex', justifyContent:'space-between', mt:3}}>
              <Typography variant='h6'>Total price</Typography>
              <Typography variant='h6'>{state.price} CH</Typography>
            </Box>
            <Button color='customBlack' variant='contained' disabled={state.nfts.filter((nft) => nft.available).length === 0}
                sx={{textTransform:'none', borderRadius:'50vh', my:3, width:1}}>
                <Typography variant='h6'>Buy now</Typography>
            </Button>
        </Box>
    </Drawer>
  )
}

export default memo(Cart)

