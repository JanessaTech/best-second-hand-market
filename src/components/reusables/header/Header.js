import { Box } from '@mui/material'
import React from 'react'
import {headerHeight} from '../../../common/constant'

export default function Header() {
  return (
    <Box sx={{
        width: 1, height: headerHeight, 
        backgroundColor: 'black', 
        position: 'fixed', top: 0, left: 0, 
        zIndex: (theme) => theme.zIndex.drawer + 1}}>      
    </Box>
  )
}

