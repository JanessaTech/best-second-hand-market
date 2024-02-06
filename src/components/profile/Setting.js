import React, { useEffect, useState } from 'react'
import { Box, Button, Container, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import { useForm } from 'react-hook-form'
import {SettingSchema} from '../../common/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import {GlobalVariables} from '../MainLayout'
import CustomSelect from '../../common/CustomSelect'
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

const userData = {
  id: 111,
  name: 'Janessatech',
  gateway: 'bbb',
  intro: 'This is me'
}

export default function Setting() {
  logger.debug('[Setting] rendering...')
  const {wallet, notifyAlertUpdate, notifyHideMenu} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(SettingSchema)})
  const gatewayOptions = ['aaa', 'bbb','ccc','ddd']
  const [state, setState] = useState({gateway: 'aaa'}) // we must have a default value for gateway

  useEffect(() => {
    logger.debug('[Setting] call notifyHideMenu in useEffect')
    logger.debug('[Setting] call restful api to get user by the wallet address=', wallet?.address)
    setState({...userData, walletAddress: wallet?.address})
    notifyHideMenu()
  }, [])

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

  const handleUpdate = (data) => {
    logger.debug('[Setting] data=', data)
    logger.debug('[Setting] call restful api to save user setting')
  }

  const handleInputChanges = (e) => {
      e.preventDefault()
      setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, name: ''})
    reset()
  }

  const handleGatewayChange = (gateway) => {
    setState({...state, gateway: gateway})
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
          autoComplete="off">

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
                value={state?.walletAddress}
                placeholder='Wallet address' 
                size="small"
                fullWidth
                multiline
                InputProps={{
                  readOnly: true,
                }}
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
          <CustomSelect 
                label={'Gateway'} 
                showInputLabel={true} 
                value={state?.gateway} 
                handleChange={handleGatewayChange} 
                options={gatewayOptions} 
                width={0.6}/>
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                  <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Save</Button>
          </Box>
        </Box>

      </Container>

    </Box>
  )
}

