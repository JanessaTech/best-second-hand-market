import { Box, Link, Typography } from '@mui/material'
import React from 'react'

export default function NoPage() {
  return (
    <Box sx={{
        width:1,
        height:'50vh',
        display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <Typography variant='subtitle1'>404 not found</Typography>
      <Link href='/'><Typography variant='h6' color='primary'>Explore more NFTs</Typography></Link>
    </Box>
  )
}