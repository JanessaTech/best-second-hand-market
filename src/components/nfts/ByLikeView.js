import React, { memo, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Typography, useMediaQuery, Popper, Link } from '@mui/material'
import { CheapIcon } from '../../utils/Svgs'
import NfterOverview from '../nfters/NfterOverview'

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
        setAnchorEl(null);
    }

    const openOverview = (e) => {
        console.log('openOverview')
        setAnchorEl(e.currentTarget);
    }
    
  return (
    <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Box sx={{display:'flex', alignItems:'center', flex:'1 1 50px', minWidth:50}}>
            <Typography sx={{mr:1}} variant='body2'>By</Typography>
            <Typography variant='body2' color='text.secondary' 
                sx={{textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    '&:hover':{cursor: 'pointer'}
                }}
                onMouseOver={openOverview}
                onMouseLeave={closeOverview}
                >
                    <Link href='/nfters?id=111' 
                        sx={{
                            '&:hover':{color:'primary.main'},
                            '&:active':{color:'primary.dark'}
                           }}>JanessaTech lab</Link>
            </Typography>
            <Popper id={id} open={open} anchorEl={anchorEl} placement={isSmallScreen ? 'bottom' : 'right-end'}>
                <NfterOverview />
            </Popper>
        </Box>
        <Box sx={{display:'flex'}}>
            <Box sx={{display:'flex', alignItems:'center', mr:2}}>
                <IconButton onClick={toggleLike} sx={{p:0}}>
                    <CheapIcon name={isLike ? 'my-favorite-red':'my-favorite'} size={25}/>
                </IconButton>
                <Typography variant='body2'>321</Typography>
            </Box>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <CheapIcon name='view' size={25}/>
                <Typography variant='body2' sx={{ml:1}}>11K</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default memo(ByLikeView)

