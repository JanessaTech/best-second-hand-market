import { Box } from '@mui/material'
import React, { memo } from 'react'
import ByLikeView from './ByLikeView'

const BuyOrCart = () => {
  return (
    <Box>
        <ByLikeView/>
        Buy or put it into Cart
    </Box>
  )
}

export default memo(BuyOrCart)

