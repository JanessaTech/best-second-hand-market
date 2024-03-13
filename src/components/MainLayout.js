import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
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
import ChangeWalletNetwork from './wallet/ChangeWalletNetwork'

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
    const [walletNetworkChange, setWalletNetworkChange] = useState(false)
    const [newNetwork, setNewNetwork] = useState(undefined)
    const [signupOpen, setSignupOpen] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [wallet, setWallet] = useState(undefined)
    const [menu, setMenu] = useState({
        open: isMediumScreen ? false : true,
        width: isMediumScreen ? 0 : DrawerWidth
    })
    const [showMenu, setShowMenu] = useState(isShowMenu(location))
    const [eventsBus, setEventsBus] = useState({})
   
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

    // for wallet address changes
    const notifyWalletAddressChange = useCallback(() => {  // once user is connected to a wallet, changing wallet address will lead to user to be forced to logout
        setWalletAddressChange(true)
    }, [])

    const onCloseWalletChange = useCallback(() => {
        setWalletAddressChange(false)
    }, [])

    const notifyWalletNetworkChange = useCallback((chainId) => {
        setWalletNetworkChange(true)
        setNewNetwork(chainId)
    }, [])

    const onCloseWalletNetworkChange = useCallback(() => {
        setWalletNetworkChange(false)
        setNewNetwork(undefined)
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

    const notifyFilterUpdate = () => {
        logger.debug('[MainLayout] notifyFilterUpdate', eventsBus)
        if (eventsBus?.handleFilterUpdate) {
            eventsBus.handleFilterUpdate()
        }
    }

    const notifyFilterMenuReset = () => {
        logger.debug('[MainLayout] notifyFilterMenuReset', eventsBus)
        if (eventsBus?.handleNetworkFilterReset){
            eventsBus.handleNetworkFilterReset()
        }
        if (eventsBus?.handleCategoryFilterReset){
            eventsBus.handleCategoryFilterReset()
        }
        if (eventsBus?.handlePriceFilterReset) {
            eventsBus.handlePriceFilterReset()
        }
    }

    /**
     * We only conduct checking when nftIds and prices are empty or undefined
     * When nftIds and prices are not empty, we first check if the network is consistent,
     * it not, we switch the network first when you click the first buy button.
     * Once the switching is done, we trigger the buying process when you click the buy button again
     * @param {*} chainId - The chainId the list of nfts belong to
     * @param {*} nftIds  - The list of nfts we will buy
     * @param {*} prices - The list of prices of each nft above
     */
    const notifyNetworkCheckAndBuy = async (chainId, nftIds, prices) => {
        logger.debug('[MainLayout] notifyNetworkCheckAndBuy', eventsBus)
        if (eventsBus.networkCheckAndBuy) {
            eventsBus.networkCheckAndBuy(chainId, nftIds, prices)
        }
    }

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
                 notifyFilterMenuReset={notifyFilterMenuReset}
                 notifyWalletUpdate={notifyWalletUpdate}
                 notifyAlertUpdate={notifyAlertUpdate}
                />
             <GlobalVariables.Provider 
                value={{
                    wallet: wallet,
                    menuOpen: menu.open,
                    eventsBus: eventsBus,
                    toggleMenu: toggleMenu,
                    openCart: openCart,
                    notifyFilterUpdate: notifyFilterUpdate,
                    notifyAlertUpdate: notifyAlertUpdate,
                    notifyWalletOpen: notifyWalletOpen,
                    notifyShowMenu: notifyShowMenu,
                    notifyHideMenu: notifyHideMenu,
                    notifyNetworkCheckAndBuy: notifyNetworkCheckAndBuy
                    }}>
                <Box sx={{display: 'flex'}}>
                    {
                    showMenu && 
                        <FilterMenu 
                            width={menu.width} 
                            menuOpen={menu.open} 
                            closeMenu={closeMenu}
                            eventsBus={eventsBus}
                            notifyFilterUpdate={notifyFilterUpdate} 
                            notifyAlertUpdate={notifyAlertUpdate}
                            />
                    }
                    {props.children}
                </Box>
                
            </GlobalVariables.Provider>
           <Cart wallet={wallet} toggleCart={toggleCart} open={cartOpen} notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}/>
            {
                    alerts && alerts.length > 0 && 
                        <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlerts={clearAlerts}/>       
            }
            <ConnectWallet
                onClose={onCloseWallet} 
                open={walletOpen} 
                wallet={wallet}
                openSignup={openSignup} 
                notifyAlertUpdate={notifyAlertUpdate}
                notifyWalletUpdate={notifyWalletUpdate}
                notifyWalletAddressChange={notifyWalletAddressChange}
                notifyWalletNetworkChange={notifyWalletNetworkChange}
                eventsBus={eventsBus}
            />  
            <DisconnectWallet 
                onClose={onCloseWalletChange}
                open={walletAddressChange}
                notifyWalletUpdate={notifyWalletUpdate}
            />
            <ChangeWalletNetwork
                newNetwork={newNetwork}
                onClose={onCloseWalletNetworkChange}
                open={walletNetworkChange}
                notifyAlertUpdate={notifyAlertUpdate}
            />
           
            <Signup
                onClose={onCloseSignUp} 
                open={signupOpen} 
                notifyAlertUpdate={notifyAlertUpdate}
                notifyWalletUpdate={notifyWalletUpdate}
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

