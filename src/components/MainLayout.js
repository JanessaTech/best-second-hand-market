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
import logger from '../common/Logger'
import {ethers} from 'ethers'
import DisconnectWallet from './wallet/DisconnectWallet'

const GlobalVariables = React.createContext({})
export {GlobalVariables}

function isShowMenu(location) {
    for (var i = 0; i < MenuUrls.length; i++) {
        if (MenuUrls[i] === location) return true
    }
    return false
}

const MainLayout = () => {
    logger.debug('[MainLayout] rendering...')
    const outlet = useOutlet()
    const location = useLocation()
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const alertCnt = useRef(0)
    
    // state variables
    const [cartOpen, setCartOpen] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const [walletAddressChange, setWalletAddressChange] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined)
    const [menu, setMenu] = useState({
        open: isMediumScreen ? false : true,
        width: isMediumScreen ? 0 : DrawerWidth
    })
    // we need to refactor the way how to communicatte between components
    const [trigger, setTrigger] = useState(0) // to notify the changes of filter options
    const [refresh, setRefresh] = useState(0)  // to notify to reset/refresh menu
    const [walletTrigger, setWalletTrigger] = useState(0)  // to notify to disconnect wallet

    useEffect(() => {
        if(!isMediumScreen) {
            setMenu({open: true, width: DrawerWidth})
        } else {
            setMenu({open: false, width: 0})
        }
    }, [isMediumScreen])

    useEffect(() => {
        if (window.ethereum) {
            logger.debug('[MainLayout] add handleWalletAddressChanged to monitor the change of wallet address')
            window.ethereum.on('accountsChanged', handleWalletAddressChanged)
        }
        return () => {
            if(window.ethereum) { 
                logger.debug('[MainLayout] remove handleWalletAddressChanged')
                window.ethereum.removeListener('accountsChanged', handleWalletAddressChanged);
            }
        }
    }, [])

    const handleWalletAddressChanged = (accounts) => {
        const normalizedAccounts = accounts.map((a) => ethers.getAddress(a))
        logger.debug('[MainLayout] handleWalletAddressChanged normalizedAccounts', normalizedAccounts)
        setWalletAddressChange(true)
    }

    const notifyUserUpdate = useCallback(() => {  
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined
        logger.info('[MainLayout], notifyUserUpdate. user = ', user)   
        setUser(user)
    }, [])

    
    // for alerts
    const notifyAlertUpdate = useCallback((_alerts) => {
        logger.info('[MainLayout] notifyAlertUpdate, alerts=', _alerts)
        const newAlerts = []
        for (var i = 0; i < _alerts.length; i++) {
            newAlerts.push({id: alertCnt.current, severity: _alerts[i].severity, message: _alerts[i].message})
            alertCnt.current = alertCnt.current + 1
        }
        setAlerts(newAlerts)
    }, [])

    const notifyFilterUpdate = useCallback((newTrigger) => {
        setTrigger(newTrigger)
    },[])

    const notifyFilterRefresh = useCallback(() => {
        setRefresh(Math.random())
    })

    const notifyDisconnectWallet = useCallback(() => {
        setWalletTrigger(Math.random())
    })

    const clearAlerts = useCallback(() => {
        setAlerts([])
    }, [])

    const closeMenu = useCallback(() => {
        setMenu({open: false, width: 0})
    }, [])
        
    const toggleMenu = useCallback(() => {
        logger.info('[MainLayout] toggleMenu is clicked')
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

    // for wallet address changes
    const onCloseWalletChange = useCallback(() => {
        setWalletAddressChange(false)
    }, [])

    // for signup
    const onCloseSignUp = useCallback(() => {
        setSignupOpen(false)
    }, [])

    const openSignup = useCallback(() => {
        setSignupOpen(true)
    }, [])

    logger.debug('location: ', location.pathname)
    return (
        <Container maxWidth='false'>
            <Header 
                openCart={openCart} 
                user={user}
                notifyWalletOpen={notifyWalletOpen}
                notifyUserUpdate={notifyUserUpdate}
                notifyFilterRefresh={notifyFilterRefresh}
                notifyDisconnectWallet={notifyDisconnectWallet} 
                />
            <GlobalVariables.Provider 
                value={{
                    user: user,
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
                            refresh={refresh}
                            notifyFilterUpdate={notifyFilterUpdate} 
                            notifyAlertUpdate={notifyAlertUpdate}/>
                    }
                    {outlet}
                </Box>
                
            </GlobalVariables.Provider>
            <Cart user={user} toggleCart={toggleCart} open={cartOpen}/>
            {
                    alerts && alerts.length > 0 && 
                        <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlerts={clearAlerts}/>       
            }
            <ConnectWallet
                onClose={onCloseWallet} 
                open={walletOpen} 
                walletTrigger={walletTrigger}
                openSignup={openSignup} 
                notifyUserUpdate={notifyUserUpdate}
                notifyAlertUpdate={notifyAlertUpdate}
            />  
            <DisconnectWallet 
                onClose={onCloseWalletChange}
                open={walletAddressChange}
                notifyDisconnectWallet={notifyDisconnectWallet}
                notifyUserUpdate={notifyUserUpdate}
                /> 
            <Signup
                onClose={onCloseSignUp} 
                open={signupOpen} 
                notifyAlertUpdate={notifyAlertUpdate}
                notifyUserUpdate={notifyUserUpdate}
                notifyDisconnectWallet={notifyDisconnectWallet}
            />
            <CheapBottomNavigation 
                openCart={openCart} 
                toggleMenu={toggleMenu} 
                isShowMenu={isShowMenu(location.pathname)} 
                user={user}
                notifyWalletOpen={notifyWalletOpen}
                />
        </Container>
    )
}

export default memo(MainLayout)

