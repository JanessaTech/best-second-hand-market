import { Box } from '@mui/material'
import React from 'react'
import FilterMenu from '../../common/menu/FilterMenu'
import NFTGallery from './NFTGallery'
import { GlobalVariables } from '../MainLayout'

export default function HomeContent() {
    console.log('HomeContent rendering ....')
    const {menuWidth, menuOpen, trigger, closeMenu, toggleMenu, notifyFilterChanges, handleAlert, notifyConnectionStatus} = React.useContext(GlobalVariables)

    return (
        <Box sx={{display: 'flex'}}>
                <FilterMenu width={menuWidth} menuOpen={menuOpen} closeMenu={closeMenu} notifyFilterChanges={notifyFilterChanges} handleAlert={handleAlert}/>
                <NFTGallery 
                    menuOpen={menuOpen} 
                    toggleMenu={toggleMenu} 
                    trigger={trigger} 
                    notifyFilterChanges={notifyFilterChanges} 
                    handleAlert={handleAlert}
                    notifyConnectionStatus={notifyConnectionStatus}
                />
        </Box>
    )
}


