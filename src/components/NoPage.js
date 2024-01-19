import { Box, Typography } from '@mui/material'
import React from 'react'

export default function NoPage() {
  return (
    <Box sx={{
        width:1,
        height:'50vh',
        display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Typography variant='h4'>404 not found</Typography>
    </Box>
  )
}