import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'

import Header from '../reusables/header/Header'
import FilterMenu from '../reusables/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import {drawerWidth} from '../../common/constant'
import Cart from '../reusables/cart/Cart'

export default function Home() {
    const [menuWidth, setMenuWidth] = useState(drawerWidth)
    const [menuOpen, setMenuOpen] = useState(true)
    const [cartOpen, setCartOpen] = useState(true)

    const closeMenu = () => {
        setMenuOpen(false)
        setMenuWidth(0)
    }

    const openMenu = () => {
        setMenuOpen(true)
        setMenuWidth(drawerWidth)
    }

    const toggleCart = () => {
        setCartOpen(!cartOpen)
    }
  return (
    <Container maxWidth='false'>
        <Box sx={{ display: 'flex' }}>
            <Header/>
            <FilterMenu width={menuWidth} menuOpen={menuOpen}/>
            <NFTGallery closeMenu={closeMenu} openMenu={openMenu} menuOpen={menuOpen} toggleCart={toggleCart}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>      
    </Container>
  )
}

