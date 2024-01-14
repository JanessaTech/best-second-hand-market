import { Box, Divider, Typography } from '@mui/material'
import React, { memo } from 'react'

const Space = () => (<Box sx={{width:1, height:10}}></Box>)

const DetailRow = ({name, value}) => {
  return (
    <Box sx={{display:'flex', mt:1}}>
            <Typography sx={{width:130}} color='text.secondary'>{name}</Typography>
            <Typography sx={{mx:0.5}}>:</Typography>
            <Typography sx={{flex:'1 1 100px', wordBreak:'break-word',minWidth: 100}}>
              {value}</Typography>
    </Box>
  )
}
const data = [
  {name: 'Chain', value: 'Ethereum'},
  {name: 'Contract address:', value: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'},
  {name: 'Token ID', value: '702'},
  {name: 'Token standard', value: '721'},
  {name: 'Category', value: 'Pets'},
  {name: 'Created time', value: 'Jan 02, 2024'},
  {name: 'Description', value: 'NFTs can really be anything digital (such as drawings, music, your brain downloaded and turned into an AI), but a lot of the current excitement'}
]
const NFTDetails = () => {
  return (
    <Box sx={{mr:5}}>
        <Typography variant='h6'>A baby monkey</Typography>
        <Space/>
        <Divider/>
        <Space/>
        <Box sx={{display:'flex', alignItems: 'center'}}>
            <Typography color='text.secondary'>Price:</Typography>
            <Typography variant='h4'>12 CH</Typography>
        </Box>
        <Space/>
        <Divider/>
        <Space/>
        <Typography>Details:</Typography>
        {
          data.map((d) => (<DetailRow name={d.name} value={d.value}/>))
        }
        <Space/>
        <Divider/>
        <Space/>
    </Box>
  )
}

export default memo(NFTDetails)

