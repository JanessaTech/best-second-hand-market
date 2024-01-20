import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import AddComment from './AddComment'
import OneComment from './OneComment'

const data = [
  {
    id : 2, 
    commenterId:222, 
    commenterName: 'Lesfiya', 
    createdTime: '1 day ago', 
    content: 'Hi, Janessa, are you availble? it looks nice, could you make it cheaper?Hi, Janessa, are you availble? it looks nice, could you make it cheaper?',
    repliedComments: [
      {
        id : 3, 
        commenterId:333, 
        commenterName: 'Tony', 
        createdTime: '1 day ago', 
        content: 'god'
      },
      {
        id : 4, 
        commenterId:444, 
        commenterName: 'Jonha', 
        createdTime: '1 day ago', 
        content: 'nice'
      }
    ],
  },
  {
    id : 5, 
    commenterId:555, 
    commenterName: 'Tooxxx', 
    createdTime: '4 days ago', 
    content: 'Hi, JanessaTech lab'
  }
]
const Comments = ({user})=> {
  console.log('Comments rendering')
  return (
    <Box>
        <Typography>3 comments</Typography>
        { user && <AddComment user={user}/>}
        {
          data.map((c) => (
          <OneComment key={c.id} deep={1} comment={c} user={user}/>
          ))
        }
    </Box>
  )
}

export default memo(Comments)

