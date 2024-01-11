import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useCallback, useState } from 'react'
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

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
        setMenuWidth(0)
    }, [])

    const toggleMenu = useCallback(() => {
        if (menuOpen) {
            setMenuOpen(false)
            setMenuWidth(0)
        } else {
            setMenuOpen(true)
            setMenuWidth(drawerWidth)
        }
    }, [menuOpen])

    const toggleCart = useCallback(() => {
        setCartOpen(!cartOpen)
    }, [cartOpen])

    const openCart = useCallback(() => {
        setCartOpen(true)
    }, [])
  return (
    <Container maxWidth='false'>
        <Box sx={{ display: 'flex' }}>
            <Header openCart={openCart}/>
            <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu}/>
            <NFTGallery menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu}/>      
    </Container>
  )
}

