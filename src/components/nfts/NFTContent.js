import React, { useEffect, useState } from 'react'
import NFTHome from './NFTHome'
import { GlobalVariables } from '../MainLayout'
import { useSearchParams } from 'react-router-dom'
import logger from '../../common/Logger'

export default function NFTContent() {
    logger.debug('[NFTContent] rendering ....')
    const {wallet, openCart, eventsBus, notifyAlertUpdate, notifyWalletOpen, notifyHideMenu, notifyNetworkCheckAndBuy} = React.useContext(GlobalVariables)
    const [searchParams, setSearchParams] = useSearchParams()
    const [id, setId] = useState(parseInt(searchParams.get('id')))

    useEffect(() => {
      logger.debug('[NFTContent] call notifyHideMenu in useEffect')
      notifyHideMenu()
    }, [])

    logger.info('[NFTContent] nft id = ', id)

  return (
    <NFTHome 
      wallet={wallet} 
      openCart={openCart} 
      eventsBus={eventsBus}
      notifyAlertUpdate={notifyAlertUpdate}
      notifyWalletOpen={notifyWalletOpen} 
      notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}/>
  )
}

