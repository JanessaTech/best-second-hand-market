import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import AddComment from './AddComment'
import OneComment from './OneComment'

const data = [
  {
    id : 1, 
    img: 'p1.png', 
    commenterId:1111, 
    commenterName: 'Lesfiya', 
    createdTime: '1 day ago', 
    content: 'Hi, Janessa, are you availble? it looks nice, could you make it cheaper?Hi, Janessa, are you availble? it looks nice, could you make it cheaper?',
    repliedComments: [
      {
        id : 2, 
        img: 'p2.png',
        commenterId:2222, 
        commenterName: 'Tony', 
        createdTime: '1 day ago', 
        content: 'god'
      },
      {
        id : 3, 
        img: 'p3.png', 
        commenterId:3333, 
        commenterName: 'Jonha', 
        createdTime: '1 day ago', 
        content: 'nice'
      }
    ],
  },
  {
    id : 4, 
    img: 'p4.png', 
    commenterId:4444, 
    commenterName: 'Tooxxx', 
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

