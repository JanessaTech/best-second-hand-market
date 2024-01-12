import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../common/Header'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import {drawerWidth} from '../../common/constant'
import Cart from '../../common/Cart'
import CheapBottomNavigation from '../../common/BottomNavigation'

export default function Home() {
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

    const [menuWidth, setMenuWidth] = useState(drawerWidth)
    const [menuOpen, setMenuOpen] = useState(isMediumScreen ? false: true)
    const [cartOpen, setCartOpen] = useState(false)
    const [trigger, setTrigger] = useState(0)

    const notifyFilterChanges = (newTrigger) => {
        setTrigger(newTrigger)
    }

    useEffect(() => {
        if (!isMediumScreen) {
            setMenuOpen(true)
        }
    }, [isMediumScreen])
    
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
            <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} notifyFilterChanges={notifyFilterChanges}/>
            <NFTGallery menuOpen={menuOpen} toggleMenu={toggleMenu} trigger={trigger} notifyFilterChanges={notifyFilterChanges}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu}/>      
    </Container>
  )
}

