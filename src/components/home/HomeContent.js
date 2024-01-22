import { Box } from '@mui/material'
import React from 'react'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'

export default function HomeContent() {
    console.log('HomeContent rendering ....')
    const {menuWidth, menuOpen, trigger, closeMenu, toggleMenu, notifyFilterUpdate, notifyAlertUpdate, notifyWalletOpen} = React.useContext(GlobalVariables)

    return (
        <Box sx={{display: 'flex'}}>
                <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} notifyFilterUpdate={notifyFilterUpdate} notifyAlertUpdate={notifyAlertUpdate}/>
                <NFTGallery 
                    menuOpen={menuOpen} 
                    toggleMenu={toggleMenu} 
                    trigger={trigger} 
                    notifyFilterUpdate={notifyFilterUpdate} 
                    notifyAlertUpdate={notifyAlertUpdate}
                    notifyWalletOpen={notifyWalletOpen}
                />
        </Box>
    )
}


