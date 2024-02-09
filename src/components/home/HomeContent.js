import React, { useEffect } from 'react'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'
import logger from '../../common/Logger'

export default function HomeContent() {
    logger.debug('[HomeContent] rendering ....')
    const {wallet, menuOpen, trigger, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen, notifyShowMenu, notifyNetworkCheck} = React.useContext(GlobalVariables)

    useEffect(() => {
        logger.debug('[HomeContent] call notifyShowMenu in useEffect')
        notifyShowMenu()
    }, [])
    
    return (
        <NFTGallery 
            wallet={wallet}
            menuOpen={menuOpen} 
            toggleMenu={toggleMenu} 
            trigger={trigger} 
            notifyFilterUpdate={notifyFilterUpdate} 
            notifyAlertUpdate={notifyAlertUpdate}
            notifyWalletOpen={notifyWalletOpen}
            notifyNetworkCheck={notifyNetworkCheck}
        />
    )
}


