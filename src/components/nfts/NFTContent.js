import { Box } from '@mui/material'
import React, { useState } from 'react'
import NFTHome from './NFTHome'
import { GlobalVariables } from '../MainLayout'
import { useSearchParams } from 'react-router-dom'

export default function NFTContent() {
    console.log('NFTContent rendering ....')
    const {user, openCart, notifyWalletOpen} = React.useContext(GlobalVariables)
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(parseInt(searchParams.get('id')))

    console.log('[NFTContent]nft id = ', id)

  return (
    <Box sx={{ display: 'flex' }}>
            <NFTHome user={user} openCart={openCart} notifyWalletOpen={notifyWalletOpen}/>
    </Box>
  )
}

