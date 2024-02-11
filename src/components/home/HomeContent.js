import React, { useEffect } from 'react'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'
import logger from '../../common/Logger'

export default function HomeContent() {
    logger.debug('[HomeContent] rendering ....')
    const {wallet, menuOpen, eventsBus, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen, notifyShowMenu, notifyNetworkCheckAndBuy} = React.useContext(GlobalVariables)

    useEffect(() => {
        logger.debug('[HomeContent] call notifyShowMenu in useEffect')
        notifyShowMenu()
    }, [])
    
    return (
        <NFTGallery 
            wallet={wallet}
            menuOpen={menuOpen} 
            toggleMenu={toggleMenu} 
            eventsBus={eventsBus}
            notifyFilterUpdate={notifyFilterUpdate} 
            notifyAlertUpdate={notifyAlertUpdate}
            notifyWalletOpen={notifyWalletOpen}
            notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}
        />
    )
}


