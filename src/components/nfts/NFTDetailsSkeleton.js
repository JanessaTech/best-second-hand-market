import { Box, Divider, Skeleton, Typography } from '@mui/material'
import React from 'react'


const Space = () => (<Box sx={{width:1, height:10}}></Box>)
const DetailRow = () => {
    return (
      <Box sx={{display:'flex', mt:1}}>
              <Skeleton sx={{width:130, fontSize: '2rem'}} variant="text"/>
              <Typography sx={{mx:1}}>:</Typography>
              <Skeleton sx={{flex:'1 1 100px', wordBreak:'break-word',minWidth: 100}} variant="text"/>
      </Box>
    )
  }

export function NFTDetailsSkeleton() {

    return (
        <Box sx={{width:1}}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Space/>
            <Divider/>
            <Space/>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                <Typography color='text.secondary'>Price:</Typography>
                <Skeleton variant="text" sx={{ fontSize: '2rem', width:100}} />
            </Box>
            <Space/>
            <Divider/>
            <Space/>
            <Typography>Details:</Typography>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <DetailRow/>
            <Space/>
            <Divider/>
            <Space/>
        </Box>
    )
}