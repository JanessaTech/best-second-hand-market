import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {Link as RouterLink } from "react-router-dom"
import { Box, IconButton, Typography, useMediaQuery, Link } from '@mui/material'
import { CheapIcon } from '../../utils/Svgs'
import NfterOverview from '../nfters/NfterOverview'
import CustomPopper from '../../common/CustomPopper'
import logger from '../../common/Logger'
import {user as userClient, like as likeClient} from '../../utils/serverClient'
import catchAsync from '../../utils/CatchAsync'

const ByLikeView = ({wallet, nft, notifyAlertUpdate}) => {
    logger.debug('[ByLikeView] rendering...')

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [isLike, setIsLike] = useState(nft?.isLike)
    const [likes, setLikes] = useState(nft?.likes)
    const [anchorEl, setAnchorEl] = useState(null)
    const [ownerOverview, setOwnerOverview] = useState(null)

    useEffect(() => {       
            (async () => {
                if (nft?.owner?.id) {
                        logger.debug('[ByLikeView] call restful api to get Overview of owner by user id =', nft?.owner.id)
                        await catchAsync(async () => {
                        const overview = await userClient.getOverViewById(nft?.owner.id)
                        logger.debug('[ByLikeView] overview =', overview)
                        setOwnerOverview(overview)
                    }, notifyAlertUpdate)
                }
            })()
    }, [nft?.owner?.id])

    useEffect(() => {
        setIsLike(nft?.isLike)
        setLikes(nft?.likes)
    }, [nft?.isLike, nft?.likes])

    const toggleLike = async () => {
        if (wallet?.user?.id) {
            logger.debug('[ByLikeView] call restful api to add/remove like for user id=', wallet?.user?.id)
            if (isLike) {
                await catchAsync(async () => {
                    await likeClient.unlike(wallet?.user?.id, nft?.id)
                    setIsLike(false)
                    setLikes(likes - 1)
                }, notifyAlertUpdate)
            } else {
                await catchAsync(async () => {
                    await likeClient.like(wallet?.user?.id, nft?.id)
                    setIsLike(true)
                    setLikes(likes + 1)
                }, notifyAlertUpdate)
            }
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
                    <Link component={RouterLink} to={`/nfters?id=${nft?.owner?.id}`} 
                        sx={{
                            '&:hover':{color:'primary.main'},
                            '&:active':{color:'primary.dark'}
                           }}>{nft?.owner?.name}</Link>
            </Typography>
            <CustomPopper 
                idPrefix='nfter-intro-popper' 
                anchorEl={anchorEl} width={250} 
                placement={isSmallScreen ? 'bottom' : 'right-end'} 
                content={<NfterOverview overview={ownerOverview}/>} />
        </Box>
        <Box sx={{display:'flex'}}>
            {
                wallet ? 
                <Box sx={{display:'flex', alignItems:'center', mr:2}}>
                    <IconButton onClick={toggleLike} sx={{p:0}}>
                        <CheapIcon name={isLike ? 'my-favorite-red':'my-favorite'} size={25}/>
                    </IconButton>
                    <Typography variant='body2'>{likes}</Typography>
                </Box> : <Box/>
            }
            <Box sx={{display:'flex', alignItems:'center'}}>
                <CheapIcon name='view' size={25}/>
                <Typography variant='body2' sx={{ml:1}}>{nft?.view}</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default memo(ByLikeView)

