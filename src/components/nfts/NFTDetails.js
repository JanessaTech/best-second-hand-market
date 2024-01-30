import { Box, Divider, Typography } from '@mui/material'
import React, { memo} from 'react'
import logger from '../../common/Logger'

const Space = () => (<Box sx={{width:1, height:10}}></Box>)

const DetailRow = ({name, value}) => {
  return (
    <Box sx={{display:'flex', mt:1}}>
            <Typography sx={{width:130}} color='text.secondary'>{name}</Typography>
            <Typography sx={{mx:1}}>:</Typography>
            <Typography sx={{flex:'1 1 100px', wordBreak:'break-word',minWidth: 100}}>
              {value}</Typography>
    </Box>
  )
}

const NFTDetails = ({nft}) => {
  logger.debug('[NFTDetails] rendering...')
 
  return (
    <Box>
        <Typography variant='h6'>{nft?.title}</Typography>
        <Space/>
        <Divider/>
        <Space/>
        <Box sx={{display:'flex', alignItems: 'center'}}>
            <Typography color='text.secondary'>Price:</Typography>
            <Typography variant='h4'>{nft?.price} CH</Typography>
        </Box>
        <Space/>
        <Divider/>
        <Space/>
        <Typography>Details:</Typography>
          <DetailRow key='CID' name='CID' value={nft?.cid}/>
          <DetailRow key='Chain' name='Chain' value={nft?.chain}/>
          <DetailRow key='Contract address' name='Contract address' value={nft?.address}/>
          <DetailRow key='Token ID' name='Token ID' value={nft?.tokenId}/>
          <DetailRow key='Token standard' name='Token standard' value={nft?.tokenStandard}/>
          <DetailRow key='Category' name='Category' value={nft?.category}/>
          <DetailRow key='Created time' name='Created time' value={nft?.createdTime}/>
          <DetailRow key='Description' name='Description' value={nft?.description}/>
        <Space/>
        <Divider/>
        <Space/>
    </Box>
  )
}

export default memo(NFTDetails)

