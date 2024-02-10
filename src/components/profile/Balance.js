import React, { useEffect, useState } from 'react'
import { Box, Button, Container, InputAdornment,TextField, Typography } from '@mui/material'
import {HeaderHeight, SYSSYMBOL} from '../../common/constant'
import {GlobalVariables} from '../../components/MainLayout'
import {DepoistSchema} from '../../common/Schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import {getChainName, networks, getChainCurrency} from '../../utils/Chain'

export default function Balance() {
  logger.debug('[Balance] rendering...')
  const {notifyAlertUpdate, notifyHideMenu} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(DepoistSchema)})
  const [state, setState] = useState({
    remainingInChain: 0,
    chainSymbol: '',
    remainingInCheap: 234,
    cheapSymbol: SYSSYMBOL,
    deposit: 0,
    chainId: ''
  })

  useEffect(() => {
    logger.debug('[Setting] call notifyHideMenu in useEffect')
    notifyHideMenu()
  }, [])

  useEffect(() => {
    let alerts = []
    if (errors?.chainId) {
      alerts.push({severity: 'error', message: errors?.chainId?.message})
    }
    if (errors?.deposit) {
      alerts.push({severity: 'error', message: errors?.deposit?.message})
    }
    if(alerts.length > 0) {
      logger.debug('[Balance]sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleDeposit = (data) => {
    logger.debug('[Balance] handleDeposit data=', data)

  }
  const handleInputChanges = (e) => {
    e.preventDefault()
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, deposit:0})
    reset()
  }

  const handleChainChange = (chainId) => {
    logger.debug('[Balance] handleChainChange. chainId=', chainId)
    const chainSymbol = getChainCurrency(chainId)
    setState({...state, chainSymbol: chainSymbol, chainId: chainId})
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
            onSubmit={handleSubmit(handleDeposit)}
            noValidate
            autoComplete="off">
              <CustomSelect 
                name={'chainId'}
                label={'Chain'} 
                showInputLabel={true} 
                value={state.chainId} 
                handleChange={handleChainChange} 
                options={networks().map(n => n.chainId)} 
                width={1}
                register={register}
                errors={errors}
                validate={true}
                cap={true}
                renderFun={(chainId) => `${getChainName(chainId)}(${chainId})`}
                />
              <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width: 1}}
                id='remainingInChain' 
                aria-label='remainingInChain'
                name='remainingInChain'
                label={`Balance in ${state.chainId ? getChainName(state.chainId) : ''}`}
                value={state.remainingInChain}
                variant='outlined'
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">
                                    <Typography sx={{fontWeight:'bold', color:'black'}}>{state.chainSymbol}</Typography>
                                  </InputAdornment>,
                }}
                />
              <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width: 1}}
                id='remainingInCheap' 
                aria-label='remainingInCheap'
                name='remainingInCheap'
                label={`Balance in Cheap`}
                value={state.remainingInCheap}
                variant='outlined'
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">
                                    <Typography sx={{fontWeight:'bold', color:'black'}}>{state.cheapSymbol}</Typography>
                                  </InputAdornment>,
                }}
                />
              <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width: 1}}
                id='deposit' 
                aria-label='deposit'
                name='deposit'
                label='Deposit'
                value={state.deposit}
                error={errors?.deposit? true: false}
                placeholder='Deposit' 
                type='number'
                {...register('deposit')}
                inputProps={{min: 0}}
                variant='outlined'
                size="small"
                onChange={handleInputChanges}
                onKeyPress={(event) => {
                  if (event?.key === '-' || event?.key === '+') {
                    event.preventDefault();
                  }
              }}/>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                  <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Deposit</Button>
            </Box>
        </Box>
      </Container>
    </Box>
  )
}

