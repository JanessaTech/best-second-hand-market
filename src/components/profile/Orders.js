import { Box } from '@mui/material'
import React from 'react'
import {HeaderHeight} from '../../common/constant'

export default function Orders() {
  return (
    <Box component="main">
      <Box sx={{width:1, height: HeaderHeight}}></Box>
      My Orders
    </Box>
  )
}

