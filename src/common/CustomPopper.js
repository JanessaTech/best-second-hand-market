import { Box, Popper } from '@mui/material'
import React from 'react'

export default function CustomPopper({idPrefix, anchorEl, width, placement, content,bgcolor ='#eee', color = 'black'}) {
    const open = Boolean(anchorEl)
    const id = open ? idPrefix : undefined

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Box sx={{ width: width, border: '1px solid #f5f5f5', p: 2,ml:2,bgcolor: bgcolor, borderRadius:2, color: color}}>
            {content}
        </Box>      
    </Popper>
  )
}

