import { Avatar, Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import logger from '../../common/Logger'
import config from '../../config'

const NfterOverview = ({overview}) => {
    logger.debug('[NfterOverview] rendering...')

  return (
    <Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
            <Avatar alt={overview?.name} src={`${config.BACKEND_ADDR}/${overview?.profile}`}/>
            <Box sx={{ml:1}}>
                <Typography variant='subtitle1'>{overview?.name}</Typography>
                <Typography color='text.secondary' variant='body2'>Last login: {overview?.loginTime} </Typography>
            </Box>
        </Box>
        <Box sx={{my:1}}>
            <Typography>{overview?.intro}</Typography>
        </Box>
        <Box>
            <Typography variant='subtitle2'>About the NFTer:</Typography>
            <Typography variant='body2'>{overview?.countNft} NFTs on sale</Typography>
            <Typography variant='body2'>{overview?.countOrder} NFTs were bought</Typography>
        </Box>
    </Box>
  )
}

export default memo(NfterOverview)

