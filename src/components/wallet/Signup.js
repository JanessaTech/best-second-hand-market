import { Box, Button, Checkbox, Dialog, FormControl, FormControlLabel, FormHelperText, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { yupResolver } from "@hookform/resolvers/yup"
import {SignupSchema} from '../../common/Schemas'
import { useForm } from "react-hook-form"
import { CheapIcon } from '../../utils/Svgs'
import { styled } from '@mui/material/styles'
import logger from '../../common/Logger'
import {isFileImage} from '../../utils/FileUtils'
import config from '../../config'
import {user} from '../../utils/serverClient'


  const VisuallyHiddenInput = styled(props => {
    const {type, onChange} = props
    return <input
        id='profile' 
        name='profile'
        type={type} 
        onChange={onChange}/>
  })({
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
const Signup = ({onClose, open, notifyAlertUpdate, notifyWalletUpdate}) => {
    logger.debug('[Signup] rendering... ')
    const {register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [state, setState] = useState({
        name: '',
        intro: '',
        checked: false,
        selectedFile: undefined
    })

    useEffect(() => {
        let alerts = []
        //logger.debug('[useEffect] errors = ', errors)
        if (errors?.name) {
            alerts.push({severity: 'error', message: errors?.name?.message})
        }
        if(errors?.checked) {
            alerts.push({severity: 'error', message: errors?.checked?.message})
        }
        if(errors?.intro) {
            alerts.push({severity: 'error', message: errors?.intro?.message})
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
        setState({...state, 'name': '', intro:'', checked: false} )
        localStorage.removeItem('login')
        onClose()
        notifyWalletUpdate(undefined)
    }

    const handleSignup = async (data) => {
        logger.info('data:', data)
        var login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : undefined
        logger.debug('[Signup] handleSignup login = ', login)
        if (!login || !(login?.address)) {
            logger.error('[Signup] error. Cannot find login in localStorage or login does not have the address sigined')
        } else {
            logger.debug('[Signup] call restful api to register user: associcate a new user with the wallet address =', login?.address)
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('address', login?.address)
            formData.append('intro', data.intro)
            formData.append('profile', state.selectedFile)
            try {
                const registeredUser = await user.register(formData)
                login = {...login, user: registeredUser}
                logger.debug('[Signup] login = ', login)
                localStorage.removeItem('login')  // remove the outdated data
                localStorage.setItem('login', JSON.stringify(login))
                const wallet = {address: login?.address, user: registeredUser}
                logger.debug('[Signup] call notifyWalletUpdate after registeration is successful')
                onClose()
                notifyWalletUpdate(wallet)
            } catch (err) {
                let errMsg = ''
                if (err?.response?.data?.message) {
                    errMsg = err?.response?.data?.message
                } else {
                    errMsg = err?.message
                }
                notifyAlertUpdate([{severity: 'error', message: errMsg}])
            }
        }
    }

    const handleInputChanges = (e) => {
        e.preventDefault()
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleCheckBoxChange = (e) => {
        setState({...state, 'checked': !state.checked})
    }

    const onFileChange = (e) => {
        logger.debug('[Signup] onFileChange')
        const file = e.target.files[0]
        logger.debug('[Signup] file name:', file?.name)
        logger.debug('[Signup] file type:', file?.type)
        logger.debug('[Signup] file size:', file.size)
        if (file && !isFileImage(file)) {
            notifyAlertUpdate([{severity: 'error', message: 'Please choose an image. We support png, jpg and gif only'}])
            return
        }
        if (file && file.size > config.multer.fileSize) {
            notifyAlertUpdate([{severity: 'error', message: 'The file chosen should be less than 1M '}]) 
            return
        }
        setState({...state, selectedFile: e.target?.files[0]})
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
                    autoComplete="off"
                    encType='multipart/form-data'
                    >
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
                    <Box>
                        <Button sx={{textTransform: 'none'}}
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                color='customBlack'>
                            Upload your profile image file
                            <VisuallyHiddenInput type="file" onChange={onFileChange}/>
                        </Button>
                        <Typography variant='body2' sx={{height:20, width:1}}>{state?.selectedFile?.name}</Typography>
                    </Box>
                    
                    <TextField
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}
                        }} 
                        id='introduction' 
                        aria-label='introduction'
                        name='intro'
                        label='Introduction'
                        value={state.intro}
                        error={errors?.intro? true: false}
                        placeholder='Your brief introduction' 
                        {...register('intro')}
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

