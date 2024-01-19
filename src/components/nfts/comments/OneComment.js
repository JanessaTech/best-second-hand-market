import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

const OneComment = ({deep, comment, user}) => {
  const profileSize = deep === 1 ?  40 : 30
  const [state, setState] = useState({
    cancelReply: true
  })

  const toggleReply = () => {
    setState({...state, cancelReply: !state.cancelReply})
  }

  const handleCancelReply = () => {
    setState({...state, cancelReply: true})
  }
  if (deep <= 2) {
        return (
          <Box sx={{mt:2, display:'flex'}}>
              <IconButton sx={{p:0, height:profileSize}} component={Link} to={`/nfters?id=${comment.commenterId}`}>
                  <Avatar alt='' src={`imgs/nfters/${comment?.commenterId}/me.png`} sx={{width: profileSize, height: profileSize}}/>
              </IconButton>
              <Box sx={{ml:2, width: `calc(100% - ${profileSize + 16}px)`}}>
                  <Box sx={{display:'flex', alignItems:'center'}}>
                    <Typography sx={{mr:2}}>@{comment?.commenterName}</Typography>
                    <Typography color='text.secondary' variant='body2'>{comment?.createdTime}</Typography>
                  </Box>
                  <Box sx={{mt:1}}>
                    <Typography>{comment?.content}
                      {deep === 1 && user && <Button sx={{ml:2, borderRadius:'50vh', textTransform:'none'}} 
                                             color='customBlack' variant='contained'
                                             onClick={toggleReply}>
                                        <Typography variant='body2'>{state.cancelReply ? 'Reply' : 'Cancel reply'}</Typography>
                                     </Button>
                      }
                    </Typography>
                    {!state.cancelReply && <AddComment isReply={true} handleCancelReply={handleCancelReply} user={user}/>}
                    { comment?.repliedComments && 
                      <Box>
                        {
                          comment?.repliedComments.map((c) => (<OneComment key={c.id} deep={deep + 1} comment={c}/>))
                        } 
                      </Box>
                    }
                  </Box>
              </Box>
          </Box>
        )
  }
  return <Box></Box>
}

export default memo(OneComment)



