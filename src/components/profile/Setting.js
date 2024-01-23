import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import { useForm } from 'react-hook-form'
import {SettingSchema} from '../../common/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import {GlobalVariables} from '../MainLayout'

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 200,
    },
    
  },
  disableScrollLock: true,
};

function getStyles(sortName, sortBy, theme) {
  return {
    fontWeight:
      sortBy.indexOf(sortName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function Setting() {
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(SettingSchema)})
  const gatewayOptions = ['aaa', 'bbb','ccc','ddd']
  const [state, setState] = useState({
    name: '',
    walletAddress: '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175536',
    sortBy: 'aaa'
  })

  useEffect(() => {
    let alerts = []
    if (errors?.name) {
      alerts.push({severity: 'error', message: errors?.name?.message})
    }
    if(alerts.length > 0) {
      console.log('[Signup]sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleUpdate = (data) => {
    console.log('[Setting] data=', data)
  }

  const handleInputChanges = (e) => {
      e.preventDefault()
      setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, name: ''})
    reset()
  }

  const handleSortChange = (e) => {
    setState({...state, sortBy: e.target.value})
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
                value={state.name}
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
                value={state.walletAddress}
                placeholder='Display name' 
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
          <FormControl sx={{width: 0.6}}>
                    <InputLabel id="gateway-options-label">Gateway</InputLabel>
                    <Select
                        label="Gateway"
                        value={state.sortBy}
                        onChange={handleSortChange}
                        input={<OutlinedInput size="small" label='Gateway'/>}
                        MenuProps={MenuProps}
                    >
                        {
                            gatewayOptions.map((gateway) => (
                                <MenuItem
                                    key={gateway}
                                    value={gateway}
                                    style={getStyles(gateway, state.sortBy, theme)}
                                >
                                    {gateway}
                                </MenuItem>
                            ))
                        }                        
                    </Select>
                </FormControl>

          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                  <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Signup</Button>
          </Box>
        </Box>

      </Container>

    </Box>
  )
}

