import { Avatar, Box, Button, TextField } from '@mui/material'
import React, { memo, useState } from 'react'
import logger from '../../../common/Logger'
import config from '../../../config'
import {comment as commentClient} from '../../../utils/serverClient'
import catchAsync from '../../../utils/CatchAsync'

const AddComment = ({wallet, isReply, nftId, parentId, notifyAlertUpdate, handleCancelReply, handleAfterCommentAdded}) => {
    logger.debug('[AddComment] rendering...')

    const [state, setState] = useState({
        comment: '',
        cancled: false,
        showBut: false
    })

    const profileSize = isReply ? 30: 40

    const handleCommentChanges = (e) => {
        e.preventDefault()
        if (e.target?.value === '' || (e.target?.value && e.target?.value.length <= 200)) {
            setState({...state, comment: e.target.value, showBut: true})
        }else {
            logger.debug('[AddComment] handleCommentChanges  e.target?.value:', e.target?.value)
        }
    }

    const handleCancel = () => {
        setState({...state, comment: '', showBut: false})
        if (handleCancelReply) {
            handleCancelReply()
        }
    }

    const handleLeaveComment = async () => {
        logger.info('[AddComment] handleLeaveComment. call restful api to submit comment...:', state.comment)
        const comment = {
            content: state.comment,
            user: wallet?.user?.id
        }
        if (nftId) {
            comment.nftId = nftId
        }
        if (parentId) {
            comment.parentId = parentId
        }
        await catchAsync(async () => {
            await commentClient.create(comment)
            handleAfterCommentAdded(isReply)
            setState({...state, comment: ''})
        }, notifyAlertUpdate)
    }

  return (
    <Box sx={{display:'flex', mt:1}}>
        <Avatar alt="Remy Sharp" src={`${config.BACKEND_ADDR}/${wallet?.user?.profile}`} sx={{width: profileSize, height: profileSize}}/>
        <Box sx={{width: 1, ml:2}}>
            <TextField 
                id="cheap-addcomment-input" 
                placeholder='Leave your comments here'
                value={state.comment}
                variant="standard" fullWidth multiline maxRows={2}
                onChange={handleCommentChanges}
                >
            </TextField>
            <Box sx={{mt:1, display: state.showBut? 'flex': 'none', justifyContent:'end'}}>
                <Button sx={{textTransform:'none', borderRadius:'50vh'}} 
                        color='customGrey' 
                        variant='contained'
                        onClick={handleCancel}
                        >Cancel</Button>
                <Button sx={{textTransform:'none', borderRadius:'50vh', ml:2}} 
                        variant='contained' 
                        color='customBlack' 
                        disabled={state.comment.length === 0}
                        onClick={handleLeaveComment}
                        >Leave comment</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default memo(AddComment)

