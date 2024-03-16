import { Box, Pagination, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import AddComment from './AddComment'
import OneComment from './OneComment'
import logger from '../../../common/Logger'
import {PageSizeInComments} from '../../../common/constant'
import { useSearchParams } from 'react-router-dom'
import {comment as commentClient} from '../../../utils/serverClient'
import catchAsync from '../../../utils/CatchAsync'

const Comments = ({wallet, nftId, notifyAlertUpdate})=> {
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
    (async () => {
      logger.info('[Comments] useEffect. call rest api to get comments based on nft id, page, pageSize and return result with how many in total')
      logger.debug('[Comments] nft id=', id)
      logger.debug('[Comments] page=', 1)
      logger.debug('[Comments] pageSize=', pagination.pageSize)

      await catchAsync(async () => {
        const res = await commentClient.queryCommentsByNftId(id, 1, pagination.pageSize, undefined)
        const {comments, totalPages, totalResults} = res
        logger.debug('page=', 1, ' pageSize=', pagination.pageSize, 'pages=', totalPages, 'total=', totalResults)
        setComments(comments)
        setTotal(totalResults)
        setPagination({page: 1, pageSize: pagination.pageSize, pages: totalPages})
      }, undefined, '[Comments] Failed to fetch comments due to')
    })()
  }, [])

  const handlePageChange = async (e, value) => {
    logger.info('[Comments] handlePageChange. call rest api to get comments based on nft id, page, pageSize, return result with how many in total')
    logger.debug('[Comments] nft id=', id)
    logger.debug('[Comments] page=', value)
    logger.debug('[Comments] pageSize=', pagination.pageSize)
    await catchAsync(async () => {
      const res = await commentClient.queryCommentsByNftId(id, value, pagination.pageSize, undefined)
      const {comments, totalPages, totalResults} = res
      logger.debug('page=', value, ' pageSize=', pagination.pageSize, 'pages=', totalPages, 'total=', totalResults)
      setComments(comments)
      setTotal(totalResults)
      setPagination({page: value, pageSize: pagination.pageSize, pages: totalPages})
    }, undefined, '[Comments] Failed to fetch comments due to')
  }

  const handleAfterCommentAdded = async (isReply) => {
    logger.debug('[Comments] handleAfterCommentAdded. call rest api to get comments based on nft id, page, pageSize, return result with how many in total')
    const toPage = isReply? pagination.page : 1 // which page we should go: 1. For the reply, we stag where it is  2. For adding new comment, got to the first page
    logger.debug('[Comments] nft id=', id)
    logger.debug('[Comments] page=', toPage)
    logger.debug('[Comments] pageSize=', pagination.pageSize)
    logger.debug('[Comments] isReply=', isReply)

    await catchAsync(async () => {
      const res = await commentClient.queryCommentsByNftId(id, toPage, pagination.pageSize, undefined)
      const {comments, page, limit, totalPages, totalResults} = res
      logger.debug('page=', toPage, ' pageSize=', pagination.pageSize, 'pages=', totalPages, 'total=', totalResults)
      setComments(comments)
      setTotal(totalResults)
      setPagination({page: toPage, pageSize: pagination.pageSize, pages: totalPages})
    }, undefined, '[Comments] Failed to fetch comments due to')
  }
  return (
    <Box>
        <Typography>{total} comments</Typography>
        { wallet && <AddComment wallet={wallet} nftId={nftId} 
                      notifyAlertUpdate={notifyAlertUpdate} 
                      handleAfterCommentAdded={handleAfterCommentAdded}/>}
        {
          comments.map((c) => (
          <OneComment 
            key={c.id} deep={1} comment={c} 
            wallet={wallet} 
            notifyAlertUpdate={notifyAlertUpdate} 
            handleAfterCommentAdded={handleAfterCommentAdded}/>
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
          onChange={handlePageChange}/>
    </Box>
  )
}

export default memo(Comments)

