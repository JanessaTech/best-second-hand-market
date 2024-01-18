import { Box, Container } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import { useLocation, useSearchParams } from "react-router-dom"
import Cart from '../../common/Cart'
import Header from '../../common/Header'
import CheapBottomNavigation from '../../common/BottomNavigation'
import NFTHome from './NFTHome'
import CustomSnackBar from '../../common/CustomSnackBar'

export default function NFT() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(parseInt(searchParams.get('id')))
    const [cartOpen, setCartOpen] = useState(false)
    const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') ? true : false)

    const alertCnt = useRef(0)
    const [state, setState] = useState({alerts: []})
    const handleAlert = useCallback((alerts) => {
        const newAlerts = []
        for (var i = 0; i < alerts.length; i++) {
            newAlerts.push({id: alertCnt.current, severity: alerts[i].severity, message: alerts[i].message})
            alertCnt.current = alertCnt.current + 1
        }
        setState({...state, alerts: [...state.alerts, ...newAlerts]})
    }, [state.alerts])

    const clearAlerts = () => {
        setState({...state, alerts:[]})
    }

    const notifyConnectionStatus = () => {
        setIsConnected(localStorage.getItem('isConnected') ? true : false)
    }

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
            <Header openCart={openCart} isConnected={isConnected}/>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
            <NFTHome openCart={openCart} notifyConnectionStatus={notifyConnectionStatus} handleAlert={handleAlert}/>
        </Box>
        <Box>
        {
             state.alerts && state.alerts.length > 0 && <CustomSnackBar duration={6000} timeout={1000} alerts={state.alerts} clearAlerts={clearAlerts}/>       
        }
        </Box>
        <CheapBottomNavigation openCart={openCart} isHome={location.pathname === '/'}/> 
    </Container>
  )
}

