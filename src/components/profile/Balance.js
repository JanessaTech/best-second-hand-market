import React, { useEffect, useState } from 'react'
import { Box, Button, Container, InputAdornment,TextField, Typography } from '@mui/material'
import {HeaderHeight} from '../../common/constant'
import {GlobalVariables} from '../../components/MainLayout'
import {DepoistSchema} from '../../common/Schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import {NETWORKS} from '../../common/constant'

const balances = [
  {
    chain: 'ethereum',
    chainSymbol: 'ETH',
    remaining: 12.05,
  },
  {
    chain: 'polygon',
    chainSymbol: 'MATIC',
    remaining: 124.2,
  },
  {
    chain: 'avalanche',
    chainSymbol: 'AVAX',
    remaining: 1000,
  },
  {
    chain: 'solana',
    chainSymbol: 'SOL',
    remaining: 256,
  },
]

function getBalanceBy(chain) {
  var balanceDefault = undefined
  for (var i= 0; i < balances.length; i++) {
    if (balances[i].chain === chain) {
      return balances[i]
    } 
    if(balances[i].chain === NETWORKS[0] && balanceDefault === undefined) {
      balanceDefault = balances[i].chain // set default balance in case we cannot find what we want
    }
  }
  return balanceDefault
}

export default function Balance() {
  logger.debug('[Balance] rendering...')
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(DepoistSchema)})
  const [state, setState] = useState({
    remainingInChain: getBalanceBy(NETWORKS[0]).remaining,
    chainSymbol: getBalanceBy(NETWORKS[0]).chainSymbol,
    remainingInCheap: 234,
    cheapSymbol: 'CH',
    deposit: 0,
    chainBy: NETWORKS[0]
  })

  useEffect(() => {
    let alerts = []
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

  const handleChainChange = (chain) => {
    const balance = getBalanceBy(chain)
    logger.log('[Balance] balance:', balance)
    setState({...state, remainingInChain: balance.remaining, chainSymbol: balance.chainSymbol, chainBy: balance.chain})
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
                label={'Chain'} 
                showInputLabel={true} 
                value={state.chainBy} 
                handleChange={handleChainChange} 
                options={NETWORKS} 
                width={1}
                cap={true}
                />
              <TextField
                sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width: 1}}
                id='remainingInChain' 
                aria-label='remainingInChain'
                name='remainingInChain'
                label={`Balance in ${state.chainBy}`}
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

