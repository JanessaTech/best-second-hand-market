import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
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
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        console.log('setting init filter at home page[we should get this form backend]')
        const filter = {'network': 'Ethereum'}
        localStorage.setItem('filter', JSON.stringify(filter))
    }, [])

    const notifyFilterChanges = (newTrigger) => {
        setTrigger(newTrigger)
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
            <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} notifyFilterChanges={notifyFilterChanges}/>
            <NFTGallery menuOpen={menuOpen} toggleMenu={toggleMenu} trigger={trigger} notifyFilterChanges={notifyFilterChanges}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu}/>      
    </Container>
  )
}

