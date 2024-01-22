import { Box } from '@mui/material'
import React from 'react'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'

export default function HomeContent() {
    console.log('HomeContent rendering ....')
    const {menuOpen, trigger, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen} = React.useContext(GlobalVariables)

    return (
        <NFTGallery 
            menuOpen={menuOpen} 
            toggleMenu={toggleMenu} 
            trigger={trigger} 
            notifyFilterUpdate={notifyFilterUpdate} 
            notifyAlertUpdate={notifyAlertUpdate}
            notifyWalletOpen={notifyWalletOpen}
        />
    )
}


