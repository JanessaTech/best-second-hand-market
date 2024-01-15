import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import AddComment from './AddComment'
import OneComment from './OneComment'

const data = [
  {
    id : 1111, 
    img: 'p1.png', 
    byName: 'Lesfiya', 
    createdTime: '1 day ago', 
    content: 'Hi, Janessa, are you availble? it looks nice, could you make it cheaper?Hi, Janessa, are you availble? it looks nice, could you make it cheaper?',
    repliedComments: [
      {
        id : 2222, 
        img: 'p2.png', 
        byName: 'Tony', 
        createdTime: '1 day ago', 
        content: 'god'
      },
      {
        id : 3333, 
        img: 'p3.png', 
        byName: 'Jonha', 
        createdTime: '1 day ago', 
        content: 'nice'
      }
    ],
  },
  {
    id : 4444, 
    img: 'p4.png', 
    byName: 'Tooxxx', 
    createdTime: '4 days ago', 
    content: 'Hi, JanessaTech lab'
  }
]
const Comments = ()=> {
  return (
    <Box>
        <Typography>3 comments</Typography>
        <AddComment/>
        {
          data.map((c) => (
          <OneComment key={c.id} deep={1} comment={c}/>
          ))
        }
    </Box>
  )
}

export default memo(Comments)

