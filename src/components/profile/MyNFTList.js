import { Box } from '@mui/material'
import React from 'react'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'

export default function MyNFTList() {
  const {menuOpen, toggleMenu, notifyFilterUpdate} = React.useContext(GlobalVariables)
  return (
    <Box component="main">
      <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
      <ProfileFilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate}/>
    </Box>
  )
}

