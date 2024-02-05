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
import DisconnectWallet from './wallet/DisconnectWallet'
import {GetCurrentWallet} from '../utils/Wallet'

const GlobalVariables = React.createContext({})
export {GlobalVariables}

function isShowMenu(location) {
    for (var i = 0; i < MenuUrls.length; i++) {
        if (MenuUrls[i] === location) return true
    }
    return false
}

const MainLayout = (props) => {
    logger.debug('[MainLayout] rendering...')
    
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const alertCnt = useRef(0)
    const location = window.location.pathname  // do not use useLocation because it causes rerendering
    
    // state variables
    const [cartOpen, setCartOpen] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const [walletAddressChange, setWalletAddressChange] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [wallet, setWallet] = useState(undefined)
    const [menu, setMenu] = useState({
        open: isMediumScreen ? false : true,
        width: isMediumScreen ? 0 : DrawerWidth
    })
    const [showMenu, setShowMenu] = useState(isShowMenu(location))

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

    useEffect(() => {  // it shows how to call async fun in useEffect
        (async () => {
            try {
                const currentWallet = await GetCurrentWallet()
                logger.debug('[MainLayout] currentWallet=', currentWallet)
                setWallet(currentWallet)
            } catch (e) {
                logger.debug('[MainLayout] Failed to call GetCurrentWallet in useEffect due to ', e)
            }    
        })()
    }, [])

    const notifyWalletAddressChange = useCallback(() => {  // we don't allow wallet addres to be updated once it is updated by notifyWalletUpdate
        setWalletAddressChange(true)
    }, [])

    const notifyWalletUpdate = useCallback((newWallet) => { // for the first time we update wallet address
        setWallet(newWallet)
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
    }, [])

    const notifyDisconnectWallet = useCallback(() => {
        setWalletTrigger(Math.random())
    }, [])

    const notifyShowMenu = useCallback(() => {
        setShowMenu(true)
    },[])

    const notifyHideMenu = useCallback(() => {
        setShowMenu(false)
    }, [])

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

    logger.debug('[MainLayout] location: ', location)
    logger.debug('[MainLayout] wallet:', wallet)
    return (
        <Container maxWidth='false'>
            <Header 
                 openCart={openCart} 
                 wallet={wallet}
                 notifyWalletOpen={notifyWalletOpen}
                 notifyFilterRefresh={notifyFilterRefresh}
                 notifyDisconnectWallet={notifyDisconnectWallet} 
                 notifyWalletUpdate={notifyWalletUpdate}
                />
             <GlobalVariables.Provider 
                value={{
                    wallet: wallet,
                    menuOpen: menu.open, 
                    trigger: trigger,
                    toggleMenu: toggleMenu,
                    openCart: openCart,
                    notifyFilterUpdate: notifyFilterUpdate,
                    notifyAlertUpdate: notifyAlertUpdate,
                    notifyWalletOpen: notifyWalletOpen,
                    notifyShowMenu: notifyShowMenu,
                    notifyHideMenu: notifyHideMenu
                    }}>
                <Box sx={{display: 'flex'}}>
                    {
                    showMenu && 
                        <FilterMenu 
                            width={menu.width} 
                            menuOpen={menu.open} 
                            closeMenu={closeMenu} 
                            refresh={refresh}
                            notifyFilterUpdate={notifyFilterUpdate} 
                            notifyAlertUpdate={notifyAlertUpdate}/>
                    }
                    {props.children}
                </Box>
                
            </GlobalVariables.Provider>
           <Cart wallet={wallet} toggleCart={toggleCart} open={cartOpen}/>
            {
                    alerts && alerts.length > 0 && 
                        <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlerts={clearAlerts}/>       
            }
            <ConnectWallet
                onClose={onCloseWallet} 
                open={walletOpen} 
                wallet={wallet}
                walletTrigger={walletTrigger}
                openSignup={openSignup} 
                notifyAlertUpdate={notifyAlertUpdate}
                notifyWalletUpdate={notifyWalletUpdate}
                notifyWalletAddressChange={notifyWalletAddressChange}
            />  
            <DisconnectWallet 
                onClose={onCloseWalletChange}
                open={walletAddressChange}
                notifyDisconnectWallet={notifyDisconnectWallet}
                notifyWalletUpdate={notifyWalletUpdate}
                /> 
           
            <Signup
                onClose={onCloseSignUp} 
                open={signupOpen} 
                notifyAlertUpdate={notifyAlertUpdate}
                notifyWalletUpdate={notifyWalletUpdate}
                notifyDisconnectWallet={notifyDisconnectWallet}
            />
            <CheapBottomNavigation 
                wallet={wallet}
                openCart={openCart} 
                toggleMenu={toggleMenu} 
                isShowMenu={showMenu} 
                notifyWalletOpen={notifyWalletOpen}
            />
        </Container>
    )
}

export default memo(MainLayout)

