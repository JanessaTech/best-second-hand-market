import { Box, Button, Checkbox, Dialog, FormControl, FormControlLabel, FormHelperText, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { yupResolver } from "@hookform/resolvers/yup"
import {SignupSchema} from '../../common/Schemas'
import { useForm } from "react-hook-form"
import { CheapIcon } from '../../utils/Svgs'
import { styled } from '@mui/material/styles'
import logger from '../../common/Logger'

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

const Signup = ({onClose, open, notifyAlertUpdate, notifyWalletUpdate, notifyUserUpdate, notifyDisconnectWallet}) => {
    logger.debug('[Signup] rendering... ')
    const {register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [state, setState] = useState({
        name: '',
        introduction: '',
        checked: false
    })

    useEffect(() => {
        let alerts = []
        if (errors?.name) {
            alerts.push({severity: 'error', message: errors?.name?.message})
        }
        if(errors?.checked) {
            alerts.push({severity: 'error', message: errors?.checked?.message})
        }
        if(errors?.introduction) {
            alerts.push({severity: 'error', message: errors?.introduction?.message})
        }
        if(alerts.length > 0) {
            logger.debug('[Signup]sending alerts = ', alerts)
            notifyAlertUpdate(alerts)
        }    
    }, [errors])

    const handleClose = () => {
        onClose()
    }

    const handleDisConnected = () => {
        reset()
        setState({...state, 'name': '', introduction:'', checked: false} )
        localStorage.removeItem('user')
        onClose()
        notifyUserUpdate()
        notifyDisconnectWallet()
    }

    const handleSignup = (data) => {
        logger.info('data:', data)
        logger.info('[Signup] call restful api to signup ...')
        onClose()
        const user = {id: 111, name: 'JanessaTech lab'}
        localStorage.setItem('user', JSON.stringify(user))
        notifyUserUpdate()
        
    }

    const handleInputChanges = (e) => {
        e.preventDefault()
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleCheckBoxChange = (e) => {
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
                        '& .MuiTextField-root': { my: 1},
                        '& .MuiButtonBase-root': { my: 1},
                        '& .MuiFormControlLabel-root':{my:1},
                        '& .MuiFormControlLabel-root > span':{ pr:2}
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}
                            }}
                        id='name' 
                        aria-label='name'
                        name='name'
                        label='Display name'
                        value={state.name}
                        error={errors?.name? true: false}
                        placeholder='Display name' 
                        {...register('name')}
                        variant='outlined'
                        size="small"
                        fullWidth
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
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}
                        }} 
                        id='introduction' 
                        aria-label='introduction'
                        name='introduction'
                        label='Introduction'
                        value={state.introduction}
                        error={errors?.introduction? true: false}
                        placeholder='Your brief introduction' 
                        {...register('introduction')}
                        variant='outlined'
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={handleInputChanges}
                        />
                    <FormControl
                        error={errors?.checked? true: false}
                    >
                        <FormControlLabel                         
                            control={<Checkbox 
                                        {...register('checked')} 
                                        checked={state.checked} 
                                        name='checked' 
                                        onChange={handleCheckBoxChange} 
                                        />
                                    }
                            label={<Typography color='text.secondary' variant='body2'>I have read and accept the <Link href="#" sx={{color:'primary.main'}}>Term of Service</Link> and the <Link href="#" sx={{color:'primary.main'}}>Term of Creator</Link> and confirm that I am at least 13 years old</Typography>}
                        />
                        <FormHelperText sx={{height:20, width:1, m:0}}>{ errors?.checked && 'Please tick the checkbox'} </FormHelperText>

                    </FormControl>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none'}}>Signup</Button>
                        <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleDisConnected}>Disconnect wallet</Button>
                    </Box>

                </Box>
            </Box>
        </Dialog>
    )
}

export default memo(Signup)

