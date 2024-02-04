import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Typography, useMediaQuery, Link } from '@mui/material'
import { CheapIcon } from '../../utils/Svgs'
import NfterOverview from '../nfters/NfterOverview'
import CustomPopper from '../../common/CustomPopper'
import logger from '../../common/Logger'

const sellerData = {
    id: 111,
    name: 'JanessaTech lab',
    login: 'Jan 01 2024 10:31 AM',
    intro: 'Hi, I\'m JanessaTech a big fan of NFT. Weclome to my lab to check more NFTs on sale',
    sales: 10,
    orders: 20
}

const ByLikeView = ({wallet, nft}) => {
    logger.debug('[ByLikeView] rendering...')

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [isLike, setIsLike] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [seller, setSeller] = useState(sellerData)

    useEffect(() => {
        if (nft?.seller) {
            logger.debug('[ByLikeView] get Overview of seller by id =', nft?.seller)
            setSeller(sellerData)
        }
    }, [nft?.seller])
    
    const toggleLike = () => {
        if (wallet?.user?.id) {
            logger.debug('[ByLikeView] call restful api to add/remove like for user id=', wallet?.user?.id)
            setIsLike(!isLike)
        }  
    }

    const closeOverview = () => {
        setAnchorEl(null);
    }

    const openOverview = (e) => {
        setAnchorEl(e.currentTarget);
    }
    
  return (
    <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Box sx={{display:'flex', alignItems:'center', flex:'1 1 50px', minWidth:50}}>
            <Typography sx={{mr:1}} variant='body2'>Sold by</Typography>
            <Typography variant='body2' color='text.secondary' 
                sx={{textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    '&:hover':{cursor: 'pointer'}
                }}
                onMouseOver={openOverview}
                onMouseLeave={closeOverview}
                >
                    <Link href={`/nfters?id=${seller?.id}`} 
                        sx={{
                            '&:hover':{color:'primary.main'},
                            '&:active':{color:'primary.dark'}
                           }}>{seller?.name}</Link>
            </Typography>
            <CustomPopper 
                idPrefix='nfter-intro-popper' 
                anchorEl={anchorEl} width={250} 
                placement={isSmallScreen ? 'bottom' : 'right-end'} 
                content={<NfterOverview nfter={seller}/>} />
        </Box>
        <Box sx={{display:'flex'}}>
            {
                wallet ? 
                <Box sx={{display:'flex', alignItems:'center', mr:2}}>
                    <IconButton onClick={toggleLike} sx={{p:0}}>
                        <CheapIcon name={isLike ? 'my-favorite-red':'my-favorite'} size={25}/>
                    </IconButton>
                    <Typography variant='body2'>{nft?.likes}</Typography>
                </Box> : <Box/>
            }
            <Box sx={{display:'flex', alignItems:'center'}}>
                <CheapIcon name='view' size={25}/>
                <Typography variant='body2' sx={{ml:1}}>{nft?.views}</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default memo(ByLikeView)

