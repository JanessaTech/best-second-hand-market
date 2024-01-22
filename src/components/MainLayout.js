import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useOutlet } from 'react-router-dom'
import { Container } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { Box, useMediaQuery } from '@mui/material'
import Header from '../common/Header'
import Cart from '../common/Cart'
import CustomSnackBar from '../common/CustomSnackBar'
import {DrawerWidth, MenuUrls} from '../common/constant'
import CheapBottomNavigation from '../common/BottomNavigation'
import ConnectWallet from './wallet/ConnectWallet'
import Signup from './wallet/Signup'
import FilterMenu from '../common/menu/FilterMenu'

const GlobalVariables = React.createContext({})
export {GlobalVariables}

function isShowMenu(location) {
    for (var i = 0; i < MenuUrls.length; i++) {
        if (MenuUrls[i] === location) return true
    }
    return false
}

const MainLayout = () => {
    const outlet = useOutlet()
    const location = useLocation()
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const alertCnt = useRef(0)

    const [cartOpen, setCartOpen] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [login, setLogin] = useState({
        isConnected: localStorage.getItem('isConnected') ? true : false, 
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined})
    const [menu, setMenu] = useState({
        open: isMediumScreen ? false : true,
        width: isMediumScreen ? 0 : DrawerWidth
    })

    useEffect(() => {
        if(!isMediumScreen) {
            setMenu({open: true, width: DrawerWidth})
        }
    }, [isMediumScreen])

    const [trigger, setTrigger] = useState(0) // to notify the changes of filter options

    const notifyLoginUpdate = useCallback(() => {    
        const isConnected = localStorage.getItem('isConnected') ? true : false
        console.log('[MainLayout] notifyLoginUpdate. isConnected=', isConnected)
        if (isConnected) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined
            setLogin({isConnected: true, user: user })
        } else {
            setLogin({isConnected: false, user: undefined})
        }
    }, [])
    
    // for alerts
    const notifyAlertUpdate = useCallback((_alerts) => {
        console.log('[MainLayout] notifyAlertUpdate, alerts=', _alerts)
        const newAlerts = []
        for (var i = 0; i < _alerts.length; i++) {
            newAlerts.push({id: alertCnt.current, severity: _alerts[i].severity, message: _alerts[i].message})
            alertCnt.current = alertCnt.current + 1
        }
        setAlerts(newAlerts)
    }, [])

    const clearAlerts = useCallback(() => {
        setAlerts([])
    }, [])

    const notifyFilterUpdate = useCallback((newTrigger) => {
        setTrigger(newTrigger)
    },[])

    const closeMenu = useCallback(() => {
        setMenu({open: false, width: 0})
    }, [])
        

    const toggleMenu = useCallback(() => {
        console.log('[MainLayout] toggleMenu is clicked')
        if (menu.open) {
            setMenu({open: false, width: 0})
        } else {
            setMenu({open: true, width: DrawerWidth})
        }
    }, [menu.open])

    const toggleCart = useCallback(() => {
        setCartOpen(!cartOpen)
    }, [cartOpen])

    const openCart = useCallback(() => {
        setCartOpen(true)
    }, [])

    // for wallet
    const onCloseWallet = useCallback(() => {
        setWalletOpen(false)
    }, [])

    const notifyWalletOpen = useCallback(() => {
        setWalletOpen(true)
    }, [])

    // for signup
    const onCloseSignUp = useCallback(() => {
        setSignupOpen(false)
    }, [])

    const openSignup = useCallback(() => {
        setSignupOpen(true)
    }, [])

    console.log('location: ', location.pathname)
    return (
        <Container maxWidth='false'>
            <Header openCart={openCart} isConnected={login.isConnected} user={login.user} notifyWalletOpen={notifyWalletOpen} />
            <GlobalVariables.Provider 
                value={{
                    user: login.user,
                    menuOpen: menu.open, 
                    trigger: trigger,
                    toggleMenu: toggleMenu,
                    openCart: openCart,
                    notifyFilterUpdate: notifyFilterUpdate,
                    notifyAlertUpdate: notifyAlertUpdate,
                    notifyWalletOpen: notifyWalletOpen
                    }}>
                <Box sx={{display: 'flex'}}>
                    {
                    isShowMenu(location.pathname) && 
                        <FilterMenu 
                            width={menu.width} 
                            menuOpen={menu.open} 
                            closeMenu={closeMenu} 
                            notifyFilterUpdate={notifyFilterUpdate} 
                            notifyAlertUpdate={notifyAlertUpdate}/>
                    }
                    {outlet}
                </Box>
                
            </GlobalVariables.Provider>
            <Cart toggleCart={toggleCart} open={cartOpen}/>
            {
                    alerts && alerts.length > 0 && 
                        <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlerts={clearAlerts}/>       
            }
            <ConnectWallet
                onClose={onCloseWallet} 
                open={walletOpen} 
                openSignup={openSignup} 
                notifyLoginUpdate={notifyLoginUpdate}
            />   
            <Signup
                onClose={onCloseSignUp} 
                open={signupOpen} 
                notifyAlertUpdate={notifyAlertUpdate} 
                notifyLoginUpdate={notifyLoginUpdate}
            />
            <CheapBottomNavigation openCart={openCart} toggleMenu={toggleMenu} isShowMenu={isShowMenu(location.pathname)} isConnected={login.isConnected}/>
        </Container>
    )
}

export default memo(MainLayout)

