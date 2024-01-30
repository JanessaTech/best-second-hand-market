import { Box } from '@mui/material'
import React, { useState } from 'react'
import NFTHome from './NFTHome'
import { GlobalVariables } from '../MainLayout'
import { useSearchParams } from 'react-router-dom'
import logger from '../../common/Logger'

export default function NFTContent() {
    logger.debug('[NFTContent] rendering ....')
    const {user, openCart, notifyWalletOpen} = React.useContext(GlobalVariables)
    const [searchParams, setSearchParams] = useSearchParams()
    const [id, setId] = useState(parseInt(searchParams.get('id')))

    logger.info('[NFTContent] nft id = ', id)

  return (
    <NFTHome user={user} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
  )
}

