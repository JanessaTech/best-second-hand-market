import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom"

export default function NFT() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(parseInt(searchParams.get('id')))

    console.log('nft id = ', id)
  return (
    <Box>
        This is the detail for a NFT
    </Box>
  )
}

