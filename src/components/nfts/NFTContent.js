import React, { useEffect, useState } from 'react'
import NFTHome from './NFTHome'
import { GlobalVariables } from '../MainLayout'
import { useSearchParams } from 'react-router-dom'
import logger from '../../common/Logger'

export default function NFTContent() {
    logger.debug('[NFTContent] rendering ....')
    const {wallet, openCart, center, notifyAlertUpdate, notifyWalletOpen, notifyHideMenu} = React.useContext(GlobalVariables)
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
      center={center}
      notifyAlertUpdate={notifyAlertUpdate}
      notifyWalletOpen={notifyWalletOpen}/>
  )
}

