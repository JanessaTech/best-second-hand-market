import React, { useCallback, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Header from '../../common/Header'
import CheapBottomNavigation from '../../common/BottomNavigation'

export default function Setting() {
    const location = useLocation()
    const [cartOpen, setCartOpen] = useState(false)
    const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') ? true : false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const openCart = useCallback(() => {
        setCartOpen(true)
    }, [])

  return (
    <Container maxWidth='false'>
        <Box sx={{ display: 'flex' }}>
            <Header openCart={openCart} isConnected={isConnected} user={user}/>
        </Box>
        <CheapBottomNavigation openCart={openCart} isHome={location.pathname === '/'}/>
    </Container>
  )
}

