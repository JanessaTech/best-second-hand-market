import React, { memo, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Typography, useMediaQuery, Popper } from '@mui/material'
import { CheapIcon } from '../../utils/Svgs'

const ByLikeView = ({nftId}) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [isLike, setIsLike] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popper' : undefined
    

    const toggleLike = () => {
        setIsLike(!isLike)
    }

    const closeOverview = () => {
        console.log('closeOverview')
    }

    const toggleOverView = (event) => {
        console.log('toggleOverView')
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    
  return (
    <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Box sx={{display:'flex', alignItems:'center'}}>
            <Typography sx={{mr:1}} variant='body2'>By</Typography>
            <Typography variant='body2' color='text.secondary' 
                sx={{textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    width: isSmallScreen ? 100: undefined,
                    '&:hover':{cursor: 'pointer'}
                }}
                onMouseOver={toggleOverView}
                onMouseLeave={toggleOverView}
                >JanessaTech lab
            </Typography>
            <Popper id={id} open={open} anchorEl={anchorEl} placement={isSmallScreen ? 'bottom' : 'right-end'}>
                <Box sx={{ border: '1px solid #f5f5f5', p: 2,ml:2,bgcolor: 'background.paper', borderRadius:2}}>
                    <Typography>The content of the Popper.</Typography>
                    <Typography>The content of the Popper.</Typography>
                    <Typography>The content of the Popper.</Typography>
                    <Typography>The content of the Popper.</Typography>
                    <Typography>The content of the Popper.</Typography>
                </Box>
            </Popper>
        </Box>
        <Box sx={{display:'flex'}}>
            <Box sx={{display:'flex', alignItems:'center', mr:2}}>
                <IconButton onClick={toggleLike}>
                    <CheapIcon name={isLike ? 'my-favorite-red':'my-favorite'}/>
                </IconButton>
                <Typography variant='body2'>321</Typography>
            </Box>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <CheapIcon name='view'/>
                <Typography variant='body2' sx={{ml:1}}>11K</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default memo(ByLikeView)

