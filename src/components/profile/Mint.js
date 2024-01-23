import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import {MintSchema} from '../../common/Schemas'
import {GlobalVariables} from '../MainLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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


export default function Mint() {
  const theme = useTheme()
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintSchema)})

  const [state, setState] = useState({})

  useEffect(() => {
    let alerts = []
    
    if(alerts.length > 0) {
      console.log('[Balance]sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleInputChanges = (e) => {
    e.preventDefault()
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    //setState({...state, deposit:0})
    reset()
  }

  const handleMint= (data) => {
    console.log('[Mint] handleMint data =', data)


  }

  return (
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight}}></Box>
      <Container maxWidth="sm" sx={{my:5}}>
        <Box component='form'
              sx={{
                '& .MuiButtonBase-root': { my: 2},
                '& .MuiFormControl-root':{ my: 2},
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
              }}
              onSubmit={handleSubmit(handleMint)}
              noValidate
              autoComplete="off">
                
        </Box>

      </Container>
    </Box>
  )
}

