import { Box, Container } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useLocation, useSearchParams } from "react-router-dom"
import Cart from '../../common/Cart'
import Header from '../../common/Header'
import CheapBottomNavigation from '../../common/BottomNavigation'
import Details from './Details'

export default function NFT() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(parseInt(searchParams.get('id')))
    const [cartOpen, setCartOpen] = useState(false)

    const openCart = useCallback(() => {
        setCartOpen(true)
    }, [])

    const toggleCart = useCallback(() => {
        setCartOpen(!cartOpen)
    }, [cartOpen])

    console.log('nft id = ', id)

  return (
    <Container maxWidth='false'>
        <Box sx={{ display: 'flex' }}>
            <Header openCart={openCart}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
            <Details/>
        </Box>
        <CheapBottomNavigation openCart={openCart} isHome={location.pathname === '/'}/> 
    </Container>
  )
}

