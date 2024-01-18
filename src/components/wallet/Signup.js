import { Box, Button, Checkbox, Dialog, FormControlLabel, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material'
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
    const {onClose, open, handleAlert,...others} = props
    const {register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [state, setState] = useState({
        name: '',
        introduction: '',
        checked: false
    })

    useEffect(() => {
        console.log('[Signup.errors]:', errors)
        if (errors?.name) {
            handleAlert('error', errors?.max?.message)
        }
        if(errors?.checked) {
            handleAlert('error', errors?.checked?.message)
        }
        if(errors?.introduction) {
            handleAlert('error', errors?.introduction?.message)
        }
    }, [errors])

    const handleClose = () => {
        onClose()
    }

    const handleClear = () => {
        reset()
        setState({...state, 'name': '', introduction:'', checked: false} )
    }

    const handleSignup = (data) => {
        console.log('data:', data)

    }

    const handleInputChanges = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleCheckBoxChange = (e) => {
        console.log('handleCheckBoxChange')
        setState({...state, 'checked': !state.checked})
    }

    return (
        <Dialog  
            sx={{'& .MuiPaper-root.MuiDialog-paper':{width:0.3, height: 'fit-content', borderRadius:5, minWidth:320}}} open={open}>
            <Box sx={{position:'relative', mx:3, my:6}}>
                <Box sx={{mb:2}}>
                    <Typography variant='h5' sx={{textAlign:'center'}}>Create an account for your wallet</Typography>
                    <Typography variant='body2' color='text.secondary' sx={{textAlign:'center'}}>Provide your personal information which will be shown when you sell your NFTs</Typography>
                    <Tooltip title='Close'>
                        <IconButton onClick={handleClose} sx={{position:'absolute', top:-40, right:-20}}>
                            <CheapIcon name={'close'}/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box 
                    component="form"
                    onSubmit={handleSubmit(handleSignup)}
                    sx={{
                        '& .MuiTextField-root': { m: 1},
                        '& .MuiButtonBase-root': { m: 1},
                        '& .MuiFormControlLabel-root':{m:1},
                        '& .MuiFormControlLabel-root > span':{m:0,p:0,pr:2}
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width:`calc(100% - 16px)`
                            }}
                        id='name' 
                        aria-label='name'
                        name='name'
                        label='Name'
                        value={state.name}
                        placeholder='Display name' 
                        {...register('name')}
                        variant='outlined'
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
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1},width:`calc(100% - 16px)`
                        }} 
                        id='introduction' 
                        aria-label='introduction'
                        name='introduction'
                        label='Introduction'
                        value={state.introduction}
                        placeholder='Your brief introduction' 
                        {...register('introduction')}
                        variant='outlined'
                        size="small"
                        multiline
                        rows={4}
                        onChange={handleInputChanges}
                        />
                    <FormControlLabel
                        control={<Checkbox {...register('checked')} checked={state.checked} name='checked' onChange={handleCheckBoxChange}/>}
                        label={<Typography color='text.secondary' variant='body2'>I have read and accept the <Link href="#" sx={{color:'primary.main'}}>Term of Service</Link> and the <Link href="#" sx={{color:'primary.main'}}>Term of Creator</Link> and confirm that I am at least 13 years old</Typography>}
                    />
                    
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none'}}>Signup</Button>
                        <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleClear}>Disconnect wallet</Button>
                    </Box>

                </Box>
            </Box>
        </Dialog>
    )
}

export default memo(Signup)

