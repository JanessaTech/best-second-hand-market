import { Box, Button, Divider, Drawer, IconButton, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { CheapIcon } from '../utils/Svgs'
import {CartWidth, HeaderHeight} from './constant'
import { UnavailableHelpTip } from './TipHelpers'
import logger from './Logger'
import {capitalize} from '../utils/StringUtils'
import {networks} from '../utils/Chain'
import {cart as cartClient} from '../utils/serverClient'
import config from '../config'
import catchAsync from '../utils/CatchAsync'

function calcPrice(data) {
  let price = 0
  for (var i = 0; i < data.length; i++) {
    price += data[i].price
  }
  return price
}

const CartItem = (props) => {
  const {id, title, url, userId, owner, status, price, deleteFromCart} = props

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
                      src={url}
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
                          status === config.NFTSTATUS.On.description ? <Box sx={{display:'flex', alignItems:'center'}}>
                                          <Typography variant='body2' sx={{mr:1}}>By</Typography>
                                          <Typography variant='body2' color='primary.main' 
                                                sx={{textOverflow: 'ellipsis', 
                                                    whiteSpace: 'nowrap', 
                                                    overflow: 'hidden'}}
                                          >{owner?.name}</Typography>
                                      </Box> : <UnavailableHelpTip/>
                        } 
                    </Box>
                  </Box>
              </Box>
              <Box>
                <Typography variant='body2'>{status === config.NFTSTATUS.On.description ? `${price} CH` : ''}</Typography>
              </Box>
          </Box>
          <IconButton sx={{position:'absolute', right:20, bottom:5, visibility:'hidden', p:0}} onClick={() => deleteFromCart(userId, id)}>
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
                  networks().map((network) => (
                    <Tab key={network.chainId} sx={{textTransform:'none', 
                          '&.MuiButtonBase-root.MuiTab-root':{minHeight:50},
                          '&.MuiButtonBase-root.MuiTab-root span':{mr:1}
                        }} icon={<CheapIcon name={network.chainName} size={20}/>} iconPosition="start" label={capitalize(network.chainName)}/>
                  ))
                }
    </Tabs>
  )
}

const getFilteredNfts = (nfts, chainId, status) => {
  return nfts.filter((nft) => nft.chainId === chainId).filter((nft) => status ? nft.status === status : true)
}

const Cart = ({wallet, toggleCart, open, center, notifyAlertUpdate}) => {
  logger.debug('[Cart] rendering...')
  const [nfts, setNfts] = useState([])
  const [chainId, setChainId] = useState(networks()[0].chainId)
  const [buyData, setBuyData] = useState(undefined)
  
  useEffect(() => {
    (async () => {
      await catchAsync(async () => {
        if (wallet?.user.id && open) {
          logger.debug('[Cart] call restful api to get the list of nfts in cart by wallet\'s user id=', wallet?.user.id)
          const nfts = await cartClient.queryByUser(wallet?.user.id)
          setNfts(nfts)
        }
      }, notifyAlertUpdate)
    })()
  }, [wallet, open])

  useEffect(() => {
    if (buyData) {
      logger.debug('[Cart] add handleNetworkChangeDone and handleBuyDone to eventsBus in center')
      center.eventsBus.handleNetworkChangeDone = handleNetworkChangeDone
      center.eventsBus.handleBuyDone = handleBuyDone
    }
  }, [buyData])

  const handleNetworkChangeDone = () => {
    logger.debug('[Cart] handleNetworkChangeDone')
    logger.debug('[Cart] buyData =', buyData)
  }

  const handleBuyDone = () => {
    logger.debug('[Cart] handleBuyDone')

  }

  const closeCart = () => {
    toggleCart()
  }

  const clearCart = async () => {
    logger.info('[Cart] call restful apis to clear cart by wallet\'s user id', wallet?.user?.id)

    await catchAsync(async () => {
      const nftIds = nfts.filter((nft) => nft.chainId === chainId).map((nft) => nft.id)
      await cartClient.remove(wallet?.user.id, nftIds)
      setNfts(nfts.filter((nft) => nft.chainId !== chainId))
      center.call('notifyNFTCartStatusUpdate', wallet?.user.id, nftIds, false)
    }, notifyAlertUpdate)
  }

  const deleteFromCart = async (userId, nftId) => {
    logger.info('[Cart] Cart call restful api to delete a cart item by userId', userId, 'and nftId ', nftId)

    await catchAsync(async () => {
      await cartClient.remove(userId, [nftId])
      const newNfts = nfts.filter((nft) => nft.id !== nftId)
      setNfts(newNfts)
      center.call('notifyNFTCartStatusUpdate', userId, [nftId], false)
    }, notifyAlertUpdate)
  }

  const getChainId = (tab) => {
    const chains = networks()
    if (tab >= chains.length) return chains[0].chainId
    return chains[tab].chainId
  }

  const handleTabChanges = (tab) => {
    const chainId = getChainId(tab)
    setChainId(chainId)
  }

  const handleBuy = async () => {
    const filteredNFTs = getFilteredNfts(nfts, chainId, config.NFTSTATUS.On.description)
    await center.asyncCall('notifyNetworkChangeCheck', chainId)
    const buyData = {
      froms: '',
      to: wallet?.address,
      idss: '',
      totalPrice: 11
    }
    setBuyData(buyData)
    //notifyNetworkCheckAndBuy(chainId, filteredNFTs.map(nft => nft.id), filteredNFTs.map(nft => nft.price))
  }

  logger.debug('[Cart] chainId=', chainId)

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
                <Typography>{getFilteredNfts(nfts, chainId).length} items</Typography>
                <Box sx={{cursor:'pointer', '&:hover':{color:'black'}}} onClick={clearCart}>
                      <Typography>Clear all</Typography>
                </Box>
            </Box>
            {getFilteredNfts(nfts, chainId).map((nft) =>
            (
              <Box key={nft.id}>
                  <CartItem {...nft} userId={ wallet?.user.id} deleteFromCart={deleteFromCart}/>
                  <Divider sx={{my: 2}}/>
              </Box>
            ))}
            
            <Box sx={{display:'flex', justifyContent:'space-between', mt:3}}>
              <Typography variant='h6'>Total price</Typography>
              <Typography variant='h6'>{calcPrice(getFilteredNfts(nfts, chainId, config.NFTSTATUS.On.description))} CH</Typography>
            </Box>
            <Button 
              color='customBlack' 
              variant='contained' 
              disabled={getFilteredNfts(nfts, chainId, config.NFTSTATUS.On.description).length === 0}
              sx={{textTransform:'none', borderRadius:'50vh', my:3, width:1}}
              onClick={handleBuy}
              >
                <Typography variant='h6'>Buy now</Typography>
            </Button>
        </Box>
    </Drawer>
  )
}

export default memo(Cart)

