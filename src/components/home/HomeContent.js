import React from 'react'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'
import logger from '../../common/Logger'

export default function HomeContent() {
    logger.debug('[HomeContent] rendering ....')
    const {user, menuOpen, trigger, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen, notifyDisconnectWallet} = React.useContext(GlobalVariables)

    return (
        <NFTGallery 
            user={user}
            menuOpen={menuOpen} 
            toggleMenu={toggleMenu} 
            trigger={trigger} 
            notifyFilterUpdate={notifyFilterUpdate} 
            notifyAlertUpdate={notifyAlertUpdate}
            notifyWalletOpen={notifyWalletOpen}
        />
    )
}


