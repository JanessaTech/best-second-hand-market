import { Box, Button, Divider, Drawer, IconButton, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { CheapIcon } from '../utils/Svgs'
import {CartWidth, HeaderHeight} from './constant'
import { UnavailableHelpTip } from './TipHelpers'
import {NETWORKS} from '../common/constant'
import logger from './Logger'
import {capitalize} from '../utils/StringUtils'

const data = [
  {
    id: 1,
    title: 'The most fasionable shoes',
    img: 'shoes.jpeg',
    sellerName: 'Fashion lab',
    network: 'ethereum',
    available: true,
    price: 12.69
  },
  {
    id: 2,
    title: 'The most fasionable Phone',
    img: 'phone.webp',
    sellerName: 'Phone lab',
    network: 'ethereum',
    available: true,
    price: 123.6
  },
  {
    id: 3,
    title: 'A baby monkey',
    img: 'mk.png',
    sellerName: 'JanessaTech lab',
    network: 'ethereum',
    available: false,
    price: 100.3
  },
  {
    id: 4,
    title: 'test1 for polygon',
    img: 'mk.png',
    sellerName: 'Hsddds',
    network: 'polygon',
    available: true,
    price: 20.5
  },
  {
    id: 5,
    title: 'test2 for polygon',
    img: 'mk.png',
    sellerName: 'Jniffer',
    network: 'polygon',
    available: true,
    price: 201.1
  },
  {
    id: 6,
    title: 'test1 for avalanche',
    img: 'mk.png',
    sellerName: 'aks',
    network: 'avalanche',
    available: true,
    price: 50.4
  },
  {
    id: 7,
    title: 'test2 for avalanche',
    img: 'mk.png',
    sellerName: 'laniddd',
    network: 'avalanche',
    available: true,
    price: 11.5
  }, 
  {
    id: 8,
    title: 'test1 for solana',
    img: 'mk.png',
    sellerName: 'fffff',
    network: 'solana',
    available: true,
    price: 52.4
  },
  {
    id: 9,
    title: 'test2 for solana',
    img: 'mk.png',
    sellerName: 'xxxxxx',
    network: 'solana',
    available: true,
    price: 22.4}, 
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

const CartItem = (props) => {
  const {id, title, img, sellerName, available, price, deleteFromCart} = props

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
                      src={`/imgs/nfts/${img}`}
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
                                          >{sellerName}</Typography>
                                      </Box> : <UnavailableHelpTip/>
                        } 
                    </Box>
                  </Box>
              </Box>
              <Box>
                <Typography variant='body2'>{available ? `${price} CH` : ''}</Typography>
              </Box>
          </Box>
          <IconButton sx={{position:'absolute', right:20, bottom:5, visibility:'hidden', p:0}} onClick={() => deleteFromCart(id)}>
                  <DeleteIcon />
          </IconButton>
    </Box>
  )
}

const CartTab = (props) => {
  const {handleTabChanges, ...others} = props
  const [tab, setTab] = useState(0)

  const tabChanges = (event, newValue) => {
    setTab(newValue)
    handleTabChanges(newValue)
  }
  
  return (
    <Tabs value={tab} 
                  onChange={tabChanges} 
                  aria-label="network tabs in cart"
                  variant="scrollable"
                  scrollButtons="auto"
                  >
                {
                  NETWORKS.map((network) => (
                    <Tab key={network} sx={{textTransform:'none', 
                          '&.MuiButtonBase-root.MuiTab-root':{minHeight:50},
                          '&.MuiButtonBase-root.MuiTab-root span':{mr:1}
                        }} icon={<CheapIcon name={network} size={20}/>} iconPosition="start" label={capitalize(network)}/>
                  ))
                }
    </Tabs>
  )
}

const getFilteredNfts = (nfts, network) => {
  return nfts.filter((nft) => nft.network === network)
}

const Cart = ({wallet, toggleCart, open}) => {
  logger.debug('[Cart] rendering...')
  const [nfts, setNfts] = useState([])
  const [network, setNetwork] = useState(NETWORKS[0])
  
  useEffect(() => {
    if (wallet?.user.id && open) {
      logger.debug('[Cart] call restful api to get the list of nfts in cart by wallet\'s user id=', wallet?.user.id)
      setNfts(data)
    }
  }, [wallet, open])

  const closeCart = () => {
    toggleCart()
  }

  const clearCart = () => {
    logger.info('[Cart] call restful apis to clear cart by wallet\'s user id', wallet?.user?.id)
    setNfts(nfts.filter((nft) => nft.network !== network))
  }

  const deleteFromCart = (id) => {
    logger.info('[Cart] Cart call restful api to delete a nft by nft id:', id)
    const newNfts = nfts.filter((nft) => nft.id !== id)
    setNfts(newNfts)
  }

  const getNetworkName = (tab) =>{
    if (tab >= NETWORKS.length) return NETWORKS[0]
    return NETWORKS[tab]
  }

  const handleTabChanges = (tab) => {
    const network = getNetworkName(tab)
    setNetwork(network)
  }

  return (
    <Drawer
        sx={{'& .MuiDrawer-paper': {
            width: CartWidth,
            top: HeaderHeight + 10,
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
            <CartTab handleTabChanges={handleTabChanges}/>

            <Box sx={{display: 'flex', justifyContent:'space-between', my:2}}>
                <Typography>{getFilteredNfts(nfts, network).length} items</Typography>
                <Box sx={{cursor:'pointer', '&:hover':{color:'black'}}} onClick={clearCart}>
                      <Typography>Clear all</Typography>
                </Box>
            </Box>
            {getFilteredNfts(nfts, network).map((nft) =>
            (
              <Box key={nft.id}>
                  <CartItem {...nft} deleteFromCart={deleteFromCart}/>
                  <Divider sx={{my: 2}}/>
              </Box>
            ))}
            
            <Box sx={{display:'flex', justifyContent:'space-between', mt:3}}>
              <Typography variant='h6'>Total price</Typography>
              <Typography variant='h6'>{calcPrice(getFilteredNfts(nfts, network))} CH</Typography>
            </Box>
            <Button color='customBlack' variant='contained' disabled={getFilteredNfts(nfts, network).filter((nft) => nft.available).length === 0}
                sx={{textTransform:'none', borderRadius:'50vh', my:3, width:1}}>
                <Typography variant='h6'>Buy now</Typography>
            </Button>
        </Box>
    </Drawer>
  )
}

export default memo(Cart)

