import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useCallback, useState } from 'react'
import Header from '../../common/Header'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import {drawerWidth} from '../../common/constant'
import Cart from '../../common/Cart'
import CheapBottomNavigation from '../../common/BottomNavigation'

export default function Home() {
    const [menuWidth, setMenuWidth] = useState(drawerWidth)
    const [menuOpen, setMenuOpen] = useState(true)
    const [cartOpen, setCartOpen] = useState(false)
    const [filters, setFilters] = useState({'network': 'Ethereum'})
    
    const handleFilters = (key, value) => {
        setFilters({...filters, [key]: value})
    }

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
            <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} handleFilters={handleFilters}/>
            <NFTGallery menuOpen={menuOpen} toggleMenu={toggleMenu} filters={filters}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu}/>      
    </Container>
  )
}

