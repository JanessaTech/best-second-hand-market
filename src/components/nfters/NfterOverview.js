import { Avatar, Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import logger from '../../common/Logger'

const NfterOverview = ({nfter}) => {
    logger.debug('[NfterOverview] rendering...')

  return (
    <Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
            <Avatar alt={nfter?.name} src={`/imgs/nfters/${nfter?.id}/me.png`}/>
            <Box sx={{ml:1}}>
                <Typography variant='subtitle1'>{nfter?.name}</Typography>
                <Typography color='text.secondary' variant='body2'>Last login: {nfter?.login} </Typography>
            </Box>
        </Box>
        <Box sx={{my:1}}>
            <Typography>{nfter?.intro}</Typography>
        </Box>
        <Box>
            <Typography variant='subtitle2'>About the NFTer:</Typography>
            <Typography variant='body2'>{nfter?.sales} NFTs on sale</Typography>
            <Typography variant='body2'>{nfter?.orders} NFTs were bought</Typography>
        </Box>
    </Box>
  )
}

export default memo(NfterOverview)

