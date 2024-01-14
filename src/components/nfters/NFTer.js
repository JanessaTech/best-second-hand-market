import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';

export default function NFTer() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(parseInt(searchParams.get('id')))
    console.log('nfter id =', id)
  return (
    <Box>
        {`nfter id = ${id}`}
    </Box>
  )
}

