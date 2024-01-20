import React, { useCallback, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useOutlet } from 'react-router-dom'
import { Container } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { Box, useMediaQuery } from '@mui/material'
import Header from '../common/Header'
import Cart from '../common/Cart'
import CustomSnackBar from '../common/CustomSnackBar'
import {drawerWidth} from '../common/constant'
import CheapBottomNavigation from '../common/BottomNavigation'
import ConnectWallet from './wallet/ConnectWallet'
import Signup from './wallet/Signup'

const GlobalVariables = React.createContext({})
export {GlobalVariables}

export default function MainLayout() {
    const outlet = useOutlet()
    const location = useLocation()
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const alertCnt = useRef(0)

    const [cartOpen, setCartOpen] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)

    const [state, setState] = useState({
        isConnected: localStorage.getItem('isConnected') ? true : false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined,
        menuOpen: isMediumScreen ? false: true,
        menuWidth: drawerWidth,
        alerts: [],
        trigger: 0, // to notify the changes of filter options
    })

    const notifyConnectionStatus = () => {    
        const isConnected = localStorage.getItem('isConnected') ? true : false
        console.log('notifyConnectionStatus. isConnected=', isConnected)
        if (isConnected) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined
            setState({...state, user: user, isConnected: isConnected})
        } else {
            setState({...state, isConnected: isConnected, user: undefined})
        }
    }
    
    const handleAlert = useCallback((alerts) => {
        console.log('home layout handleAlert, alerts=', alerts)
        const newAlerts = []
        for (var i = 0; i < alerts.length; i++) {
            newAlerts.push({id: alertCnt.current, severity: alerts[i].severity, message: alerts[i].message})
            alertCnt.current = alertCnt.current + 1
        }
        setState({...state, alerts: [...state.alerts, ...newAlerts]})
    }, [state.alerts, state.isConnected])

    const notifyFilterChanges = useCallback((newTrigger) => {
        setState({...state, trigger: newTrigger})
    },[state.trigger, state.isConnected])

    const closeMenu = useCallback(() => {
        setState({...state, menuOpen: false, menuWidth: 0})}, [state.menuOpen, state.isConnected])

    const toggleMenu = useCallback(() => {
        console.log('toggleMenu is clicked')
        if (state.menuOpen) {
            setState({...state, menuOpen: false, menuWidth: 0})
        } else {
            setState({...state, menuOpen: true, menuWidth: drawerWidth})
        }
    }, [state.menuOpen, state.isConnected])

    const toggleCart = useCallback(() => {
        setCartOpen(!cartOpen)
    }, [cartOpen])

    const openCart = useCallback(() => {
        setCartOpen(true)
    }, [cartOpen])

    const clearAlerts = () => {
        setState({...state, alerts:[]})
    }

    const onCloseWallet = useCallback(() => {
        setWalletOpen(false)
    }, [walletOpen])

    const openWallet = useCallback(() => {
        setWalletOpen(true)
    }, [walletOpen])

    const onCloseSignUp = useCallback(() => {
        setSignupOpen(false)
    }, [signupOpen])

    const openSignup = useCallback(() => {
        setSignupOpen(true)
    }, [signupOpen])

    return (
        <Container maxWidth='false'>
            <Header openCart={openCart} isConnected={state.isConnected} user={state.user}/>
            <GlobalVariables.Provider 
                value={{
                    user: state.user,
                    menuWidth: state.menuWidth, 
                    menuOpen: state.menuOpen, 
                    trigger: state.trigger,
                    closeMenu: closeMenu,
                    toggleMenu: toggleMenu,
                    openCart: openCart,
                    notifyFilterChanges: notifyFilterChanges,
                    handleAlert: handleAlert,
                    notifyConnectionStatus: notifyConnectionStatus,
                    openWallet: openWallet
                    }}>
                {outlet}
            </GlobalVariables.Provider>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
            <Box>
                {
                    state.alerts && state.alerts.length > 0 && 
                        <CustomSnackBar duration={6000} timeout={1000} alerts={state.alerts} clearAlerts={clearAlerts}/>       
                }
            </Box>
            <ConnectWallet
                onClose={onCloseWallet} 
                open={walletOpen} 
                openSignup={openSignup} 
                cbUrl={`${location.pathname}${location.search}`}
                notifyConnectionStatus={notifyConnectionStatus}
            />   
            <Signup
                onClose={onCloseSignUp} 
                open={signupOpen} 
                handleAlert={handleAlert} 
                cbUrl={`${location.pathname}${location.search}`}
                notifyConnectionStatus={notifyConnectionStatus}
            />
            <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu} isHome={location.pathname === '/'}/>
        </Container>
    )
}

