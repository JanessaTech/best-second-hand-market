import React, { useState } from 'react'
import NFTHome from './NFTHome'
import { GlobalVariables } from '../MainLayout'
import { useSearchParams } from 'react-router-dom'
import logger from '../../common/Logger'
import { Box } from '@mui/material'

export default function NFTContent() {
    logger.debug('[NFTContent] rendering ....')
    const {wallet, openCart, notifyWalletOpen} = React.useContext(GlobalVariables)
    const [searchParams, setSearchParams] = useSearchParams()
    const [id, setId] = useState(parseInt(searchParams.get('id')))

    logger.info('[NFTContent] nft id = ', id)

  return (
    <NFTHome wallet={wallet} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
  )
}

