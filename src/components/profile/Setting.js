import React, { memo, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import { useForm } from 'react-hook-form'
import {SettingSchema} from '../../common/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import {GlobalVariables} from '../MainLayout'
import logger from '../../common/Logger'
import {user as userClient} from '../../utils/serverClient'
import {isFileImage} from '../../utils/FileUtils'
import config from '../../config'

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

const Setting = () => {
  logger.debug('[Setting] rendering...')
  const {wallet, notifyAlertUpdate, notifyWalletUpdate, notifyHideMenu} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(SettingSchema)})
  const [state, setState] = useState({
    id: '',
    name:'',
    address: '',
    intro:'',
    selectedFile: undefined
  }) // we must have a default value for gateway

  useEffect(() => {
    logger.debug('[Setting] call notifyHideMenu in useEffect')
    if (wallet?.address) {
      logger.debug('[Setting] call restful api to get user by address =', wallet?.address)
      userClient.findUserByAddress(wallet.address)
      .then((user) => {
        reset()  // we need reset before set new state. otherwise the new state cannot be registered to useForm
        setState({id: user?.id, name: user?.name, address: user.address, intro: user?.intro})
      })
      .catch((err) => {
        // there is a bug we need to fix if codes hit here except network issue
        let errMsg = ''
        if (err?.response?.data?.message) {
            errMsg = err?.response?.data?.message
        } else {
            errMsg = err?.message
        }
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      })
    }
    notifyHideMenu()
  }, [wallet])

  useEffect(() => {
    let alerts = []
    
    if (errors?.name) {
      alerts.push({severity: 'error', message: errors?.name?.message})
    }
    if (errors?.intro) {
      alerts.push({severity: 'error', message: errors?.intro?.message})
    }
    if(alerts.length > 0) {
      logger.info('[Setting] sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleUpdate = async (data) => {
    logger.debug('[Setting] data=', data)
    logger.debug('[Setting] call restful api to save user setting')
    const formData = new FormData()
    formData.append('id', state.id)
    formData.append('name', data.name)
    formData.append('intro', data.intro)
    formData.append('profile', state.selectedFile)
    try {
      const updatedUser  = await userClient.update(formData)
      var login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : undefined
      login = {...login, user: updatedUser}
      logger.debug('[Setting] login = ', login)
      localStorage.removeItem('login')  // remove the outdated data
      localStorage.setItem('login', JSON.stringify(login))
      const wallet = {address: login?.address, user: updatedUser}
      logger.debug('[Setting] call notifyWalletUpdate after update is successful')
      notifyWalletUpdate(wallet)
      notifyAlertUpdate([{severity: 'success', message: 'setting was updated successfully'}])
    } catch(err) {
      let errMsg = ''
      if (err?.response?.data?.message) {
          errMsg = err?.response?.data?.message
      } else {
          errMsg = err?.message
      }
      notifyAlertUpdate([{severity: 'error', message: errMsg}])
    }
  }

  const handleInputChanges = (e) => {
      e.preventDefault()
      setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, name: ''})
    reset()
  }

  const onFileChange = (e) => {
    logger.debug('[Setting] onFileChange')
    const file = e.target.files[0]
    logger.debug('[Setting] file name:', file?.name)
    logger.debug('[Setting] file type:', file?.type)
    logger.debug('[Setting] file size:', file.size)
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
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight}}/>
      <Container maxWidth="sm" sx={{my:5}}>
        <Box component='form'
          sx={{
            '& .MuiButtonBase-root': { my: 2},
            '& .MuiFormControl-root':{ my: 2}
          }}
          onSubmit={handleSubmit(handleUpdate)}
          noValidate
          autoComplete="off"
          encType='multipart/form-data'
          >

          <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}}}
                id='name' 
                aria-label='name'
                name='name'
                label='Display name'
                value={state?.name}
                error={errors?.name? true: false}
                placeholder='Display name' 
                {...register('name')}
                variant='outlined'
                size="small"
                fullWidth
                onChange={handleInputChanges}
          />
          <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}
                    }}
                id='wallet address' 
                aria-label='wallet address'
                name='wallet-address'
                label='wallet address'
                value={state?.address}
                placeholder='Wallet address' 
                size="small"
                fullWidth
                multiline
                InputProps={{
                  readOnly: true,
                }}
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
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                  <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Save</Button>
          </Box>
        </Box>

      </Container>

    </Box>
  )
}

export default memo(Setting)

