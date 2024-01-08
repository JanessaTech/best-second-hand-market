import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import Header from '../reusables/header/Header'
import FilterMenu from '../reusables/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import {drawerWidth} from '../../common/constant'
import Cart from '../reusables/cart/Cart'
import CheapBottomNavigation from '../footer/BottomNavigation'

export default function Home() {
    const [menuWidth, setMenuWidth] = useState(drawerWidth)
    const [menuOpen, setMenuOpen] = useState(true)
    const [cartOpen, setCartOpen] = useState(false)

    const closeMenu = () => {
        setMenuOpen(false)
        setMenuWidth(0)
    }

    const openMenu = () => {
        setMenuOpen(true)
        setMenuWidth(drawerWidth)
    }

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false)
            setMenuWidth(0)
        } else {
            setMenuOpen(true)
            setMenuWidth(drawerWidth)
        }
    }

    const toggleCart = () => {
        setCartOpen(!cartOpen)
    }
    const openCart = () => {
        setCartOpen(true)
    }
  return (
    <Container maxWidth='false'>
        <Box sx={{ display: 'flex' }}>
            <Header openCart={openCart}/>
            <FilterMenu width={menuWidth} menuOpen={menuOpen}/>
            <NFTGallery closeMenu={closeMenu} openMenu={openMenu} menuOpen={menuOpen} toggleCart={toggleCart} toggleMenu={toggleMenu}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu}/>      
    </Container>
  )
}

