import { Box, Dialog, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'

const Signup = (props) => {
    const {onClose, open, ...others} = props
    const [state, setState] = useState({
        name: '',
        email: '',
        code:''
    })

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog  
            sx={{'& .MuiPaper-root.MuiDialog-paper':{width:0.3, height: 'fit-content', borderRadius:5, minWidth:310}}} open={open}>
            <DialogTitle sx={{position:'relative', mt:3}}>
                <Typography variant='h5' sx={{textAlign:'center'}}>Associate your email with your wallet</Typography>
                <Typography variant='body2' color='text.secondary' sx={{textAlign:'center'}}>Choose a display name and enter your email address to updates related to your NFTs</Typography>
                <Tooltip title='Close'>
                    <IconButton onClick={handleClose} sx={{position:'absolute', top:-20, right:10}}>
                        <CheapIcon name={'close'}/>
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <Box sx={{p:3}}>
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:'50vh'},
                         '& input':{pl:4}
                        }}
                    name='name'
                    placeholder='Display name' 
                    variant='outlined'
                    fullWidth
                    />
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:'50vh'},
                         '& input':{pl:4}
                       }} 
                    name='email'
                    placeholder='Display name' 
                    variant='outlined'
                    fullWidth
                    />
            </Box>

        </Dialog>
    )
}

export default memo(Signup)

