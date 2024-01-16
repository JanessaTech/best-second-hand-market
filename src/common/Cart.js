import { Box, Button, Divider, Drawer, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { CheapIcon } from '../utils/Svgs'
import {cartWidth, headerHeight} from './constant'

const CartItem = (props) => {
  const {title, img, nfter, price, ...others} = props

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
                    <Box sx={{display:'flex',mt:1}}>
                        <Typography variant='body2' sx={{mr:1}}>By</Typography>
                        <Typography variant='body2' color='primary.main'>{nfter}</Typography>
                    </Box>
                  </Box>
              </Box>
              <Box>
                <Typography variant='body2'>{price} CH</Typography>
              </Box>
          </Box>
          <IconButton sx={{position:'absolute', right:20, bottom:5, visibility:'hidden',p:0}}>
                  <DeleteIcon />
          </IconButton>
    </Box>
  )
}

const data = {
  title: 'The most fasionable shoes',
  img: 'shoes.jpeg',
  nfter: 'Fashion lab',
  price: '12.690'
}

const Cart = ({toggleCart, open}) => {
  console.log('Cart rendering ...')

  const closeCart = () => {
    toggleCart()
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
                <Typography>3 items</Typography>
                <Box sx={{cursor:'pointer', '&:hover':{color:'black'}}}>
                      <Typography>Clear all</Typography>
                </Box>
            </Box>
            <CartItem {...data}/>
            <Divider sx={{my: 2}}/>
            <CartItem {...data}/>
            <Divider sx={{my: 2}}/>
            <CartItem {...data}/>
            <Divider sx={{my: 2}}/>
            <CartItem {...data}/>
            <Divider sx={{my: 2}}/>
            <CartItem {...data}/>
            <Divider sx={{my: 2}}/>
            <CartItem {...data}/>
            <Button color='customBlack' variant='contained' 
                sx={{textTransform:'none', borderRadius:'50vh', mt:4, width:1}}>
                <Typography variant='h6'>Buy now</Typography>
            </Button>
        </Box>
    </Drawer>
  )
}

export default memo(Cart)

