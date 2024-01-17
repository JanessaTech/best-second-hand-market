import { Box, Button, Dialog, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { yupResolver } from "@hookform/resolvers/yup"
import {SignupSchema} from '../../common/Schemas'
import { useForm } from "react-hook-form"
import { CheapIcon } from '../../utils/Svgs'
import { styled } from '@mui/material/styles'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Signup = (props) => {
    const {onClose, open, ...others} = props
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [state, setState] = useState({
        name: '',
        introduction: ''
    })

    useEffect(() => {

    }, [errors])

    const handleClose = () => {
        onClose()
    }

    const handleClear = () => {
        reset()
        setState({...state, 'name': '', introduction: ''} )
    }

    const handleSignup = (data) => {
        console.log(data)

    }

    const handleInputChanges = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setState({...state, [e.target.name]: e.target.value})
    }

    return (
        <Dialog  
            sx={{'& .MuiPaper-root.MuiDialog-paper':{width:0.3, height: 'fit-content', borderRadius:5, minWidth:320}}} open={open}>
            <DialogTitle sx={{position:'relative', mt:3}}>
                <Typography variant='h5' sx={{textAlign:'center'}}>Create an account for your wallet</Typography>
                <Typography variant='body2' color='text.secondary' sx={{textAlign:'center'}}>Provide your personal information which will be shown when you sell your NFTs</Typography>
                <Tooltip title='Close'>
                    <IconButton onClick={handleClose} sx={{position:'absolute', top:-20, right:10}}>
                        <CheapIcon name={'close'}/>
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <Box 
                    component="form"
                    onSubmit={handleSubmit(handleSignup)}
                    sx={{
                        p:3,
                        '& .MuiTextField-root': { m: 1},
                        '& .MuiButtonBase-root': { m: 1},
                    }}
                    noValidate
                    autoComplete="off">
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}
                        }}
                    id='name' 
                    aria-label='name'
                    name='name'
                    label='Name'
                    value={state.name}
                    placeholder='Display name' 
                    {...register('name')}
                    variant='outlined'
                    fullWidth
                    size="small"
                    onChange={handleInputChanges}
                    />
                <Button sx={{textTransform: 'none'}}
                        component="label" 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />} 
                        color='customBlack'>
                    Upload your profile image file
                    <VisuallyHiddenInput type="file" />
                </Button>
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1},
                         '& input':{pl:4}
                       }} 
                    id='introduction' 
                    aria-label='introduction'
                    name='introduction'
                    label='Introduction'
                    value={state.introduction}
                    placeholder='Your brief introduction' 
                    {...register('introduction')}
                    variant='outlined'
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    onChange={handleInputChanges}
                    />
                <Box sx={{display:'flex', justifyContent:'space-around'}}>
                    <Button variant='outlined' color='customBlack' onClick={handleClear}>Clear</Button>
                    <Button variant='contained' color='customBlack' type="submit">Signup</Button>
                </Box>
                
            </Box>

        </Dialog>
    )
}

export default memo(Signup)

