import { Box, Popper } from '@mui/material'
import React from 'react'

export default function CustomPopper(props) {
    const {idPrefix, anchorEl, width, placement, content,...others} = props
    const open = Boolean(anchorEl)
    const id = open ? idPrefix : undefined

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Box sx={{ width: width, border: '1px solid #f5f5f5', p: 2,ml:2,bgcolor: '#eee', borderRadius:2}}>
            {content}
        </Box>      
    </Popper>
  )
}

