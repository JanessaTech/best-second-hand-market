import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/system'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../common/Header'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import {drawerWidth} from '../../common/constant'
import Cart from '../../common/Cart'
import CheapBottomNavigation from '../../common/BottomNavigation'
import { useLocation } from 'react-router-dom'
import CustomSnackBar from '../../common/CustomSnackBar'

export default function Home() {
    const location = useLocation()
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const alertCnt = useRef(0)

    const [menuWidth, setMenuWidth] = useState(drawerWidth)
    const [menuOpen, setMenuOpen] = useState(isMediumScreen ? false: true)
    const [cartOpen, setCartOpen] = useState(false)
    const [trigger, setTrigger] = useState(0)
    const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') ? true : false)
    const [state, setState] = useState({alerts: []})

    useEffect(() => {
        if (!isMediumScreen) {
            setMenuOpen(true)
            setMenuWidth(drawerWidth)
        }else{
            setMenuOpen(false)
            setMenuWidth(0)
        }
    }, [isMediumScreen])

    const notifyConnectionStatus = () => {
        setIsConnected(localStorage.getItem('isConnected') ? true : false)
    }
    
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

    const notifyFilterChanges = useCallback((newTrigger) => {
        setTrigger(newTrigger)
    },[trigger])

    
    
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
            <Header openCart={openCart} isConnected={isConnected}/>
            <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} notifyFilterChanges={notifyFilterChanges} handleAlert={handleAlert}/>
            <NFTGallery 
                menuOpen={menuOpen} 
                toggleMenu={toggleMenu} 
                trigger={trigger} 
                notifyFilterChanges={notifyFilterChanges} 
                handleAlert={handleAlert}
                notifyConnectionStatus={notifyConnectionStatus}
                />
            <Cart toggleCart={toggleCart} open={cartOpen}/>
        </Box>
        <Box>
        {
             state.alerts && state.alerts.length > 0 && <CustomSnackBar duration={6000} timeout={1000} alerts={state.alerts} clearAlerts={clearAlerts}/>       
        }
        </Box>
        <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu} isHome={location.pathname === '/'}/>      
    </Container>
  )
}

