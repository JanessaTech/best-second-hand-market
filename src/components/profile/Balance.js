import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import {GlobalVariables} from '../../components/MainLayout'
import {DepoistSchema} from '../../common/Schemas'
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

const balances = [
  {
    chain: 'Ethereum',
    chainSymbol: 'ETH',
    remaining: 12.05,
  },
  {
    chain: 'Polygon',
    chainSymbol: 'MATIC',
    remaining: 124.2,
  },
  {
    chain: 'Avalanche',
    chainSymbol: 'AVAX',
    remaining: 1000,
  },
  {
    chain: 'Solana',
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
    if(balances[i].chain === 'Ethereum' && balanceDefault === undefined) {
      balanceDefault = balances[i].chain // set default balance in case we cannot find what we want
    }
  }
  return balanceDefault
}

export default function Balance() {
  const chainOptions = ['Ethereum', 'Polygon', 'Avalanche', 'Solana']
  const theme = useTheme()
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(DepoistSchema)})
  const [state, setState] = useState({
    remainingInChain: getBalanceBy('Ethereum').remaining,
    chainSymbol: getBalanceBy('Ethereum').chainSymbol,
    remainingInCheap: 234,
    cheapSymbol: 'CH',
    deposit: 0,
    chainBy: 'Ethereum'
  })

  useEffect(() => {
    let alerts = []
    if (errors?.deposit) {
      alerts.push({severity: 'error', message: errors?.deposit?.message})
    }
    if(alerts.length > 0) {
      console.log('[Balance]sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleDeposit = (data) => {
    console.log('[Balance]handleDeposit data=', data)

  }
  const handleInputChanges = (e) => {
    e.preventDefault()
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, deposit:0})
    reset()
  }

  const handleChainChange = (e) => {
    const chain = e.target.value
    const balance = getBalanceBy(chain)
    console.log('balance:', balance)
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
              <FormControl sx={{width: 1}}>
                      <InputLabel id="Chain-options-label">Chain</InputLabel>
                      <Select
                          label="Chain"
                          value={state.chainBy}
                          onChange={handleChainChange}
                          input={<OutlinedInput size="small" label='Chain'/>}
                          MenuProps={MenuProps}
                      >
                          {
                              chainOptions.map((chain) => (
                                  <MenuItem
                                      key={chain}
                                      value={chain}
                                      style={getStyles(chain, state.chainBy, theme)}
                                  >
                                      {chain}
                                  </MenuItem>
                              ))
                          }                        
                      </Select>
              </FormControl>
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

