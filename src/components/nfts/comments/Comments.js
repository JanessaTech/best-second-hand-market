import { Box, Pagination, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import AddComment from './AddComment'
import OneComment from './OneComment'
import logger from '../../../common/Logger'
import {PageSizeInComments} from '../../../common/constant'
import { useSearchParams } from 'react-router-dom'

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
  logger.debug('[Comments] rendering')
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [comments, setComments] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,  // the index of the current page
    pageSize: PageSizeInComments, // how many items are shown in one page
    pages: 0 // how many pages in total
  })

  useEffect(() => {
    logger.info('[Comments] useEffect. call rest api to get comments based on nft id, page, pageSize and return result with how many in total')
    logger.debug('[Comments] nft id=', id)
    logger.debug('[Comments] page=', 1)
    logger.debug('[Comments] pageSize=', pagination.pageSize)
    const total  = 41
    logger.debug('page=', 1, ' pageSize=', pagination.pageSize, 'pages=', Math.ceil(total / pagination.pageSize), 'total=', total)
    setComments(data)
    setTotal(total)
    setPagination({page: 1, pageSize: pagination.pageSize, pages: Math.ceil(total / pagination.pageSize)})
  }, [])

  const handleChange = (e, value) => {
    logger.info('[Comments] handleChange. call rest api to get comments based on nft id, page, pageSize, return result with how many in total')
    logger.debug('[Comments] nft id=', id)
    logger.debug('[Comments] page=', value)
    logger.debug('[Comments] pageSize=', pagination.pageSize)
    const total  = 41
    logger.debug('page=', value, ' pageSize=', pagination.pageSize, 'pages=', Math.ceil(total / pagination.pageSize), 'total=', total)
    setComments(data)
    setPagination({page:value, pageSize: pagination.pageSize, pages: Math.ceil(total / pagination.pageSize)})
  }

  return (
    <Box>
        <Typography>{total} comments</Typography>
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
          boundaryCount={1}
          siblingCount={0}
          onChange={handleChange}/>
    </Box>
  )
}

export default memo(Comments)

