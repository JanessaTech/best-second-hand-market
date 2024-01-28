import { Box, Skeleton, useMediaQuery } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'

export default function OverviewSkeleton() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box sx={{borderRadius:4}}>
        <Box sx={{width:1, borderRadius:4}}>
            <Skeleton variant="rectangular" width={'100%'} height={150} sx={{borderRadius:4}} />
            <Box sx={{mx: isSmallScreen ? 1 : 2, mb:1, }}>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton width="40%" />
            </Box>
        </Box>
    </Box>
  )
}

