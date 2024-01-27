import { Box, Pagination, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
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
  const [comments, setComments] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,  // the index of the current page
    pageSize: 3, // how many items are shown in one page
    pages: 0 // how many in total
  })

  useEffect(() => {
    console.log('call rest api to get comments based on page and pageSize, return result with how many in total')
    const total  = 41
    console.log('page=', pagination.page, ' pageSize=', pagination.pageSize, 'pages=', Math.ceil(total / pagination.pageSize), 'total=', total)
    setComments(data)
    setPagination({page: pagination.page, pageSize: pagination.pageSize, pages: Math.ceil(total / pagination.pageSize)})
  }, [])

  const handleChange = (e, value) => {
    console.log('call rest api to get comments based on page and pageSize, return result with how many in total')
    const total  = 41
    console.log('page=', value, ' pageSize=', pagination.pageSize, 'pages=', Math.ceil(total / pagination.pageSize), 'total=', total)
    setComments(data)
    setPagination({page:value, pageSize: pagination.pageSize, pages: Math.ceil(total / pagination.pageSize)})
  }

  return (
    <Box>
        <Typography>3 comments</Typography>
        { user && <AddComment user={user}/>}
        {
          data.map((c) => (
          <OneComment key={c.id} deep={1} comment={c} user={user}/>
          ))
        }
        <Pagination 
          sx={{mt:2, display:'flex', justifyContent:'end'}} 
          count={pagination.pages} 
          page={pagination.page} 
          variant="outlined" 
          color="primary"
          onChange={handleChange}/>
    </Box>
  )
}

export default memo(Comments)

