import React from 'react'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'

export default function HomeContent() {
    console.log('HomeContent rendering ....')
    const {user, menuOpen, trigger, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen} = React.useContext(GlobalVariables)

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


