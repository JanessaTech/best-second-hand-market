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
import { getExchange } from '../../utils/Chain'
import { ExchangeRateTip } from '../../common/TipHelpers'

export default function Balance() {
  logger.debug('[Balance] rendering...')
  const {wallet, center, notifyAlertUpdate, notifyHideMenu} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(DepoistSchema)})
  const [state, setState] = useState({
    balanceInChain: -1,
    chainSymbol: '',
    balanceInCheap: 0,
    cheapSymbol: SYSSYMBOL,
    deposit: 0,
    chainId: ''
  })

  const [chainData, setChainData] = useState(undefined)

  useEffect(() => {
    logger.debug('[Balance] call notifyHideMenu in useEffect')
    notifyHideMenu()
  }, [wallet])

  useEffect(() => {
    if (chainData) {
      logger.debug('[Balance] add handleNetworkChangeDone to eventsBus in center')
      center.eventsBus.handleNetworkChangeDone = handleNetworkChangeDone
    }
  }, [chainData])

  useEffect(() => {
    let alerts = []
    if (errors?.chainId) {
      alerts.push({severity: 'error', message: errors?.chainId?.message})
    }
    if (errors?.balanceInChain) {
      alerts.push({severity: 'error', message: errors?.balanceInChain?.message})
    }
    if (errors?.deposit) {
      alerts.push({severity: 'error', message: errors?.deposit?.message})
    }
    if(alerts.length > 0) {
      logger.debug('[Balance]sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleNetworkChangeDone = (props) => {
    logger.debug('[Balance] handleNetworkChangeDone. props =', props)
    if (props && props?.balance) {
      logger.debug('[Balance]. chainData after handleNetworkChangeDone = ', chainData)
      center.asyncCall('notify_erc20_balanceOf').then((balance) => {
        logger.debug('[Balance] balance from erc20 =', balance)
        reset()
        setState({...state, balanceInChain: props?.balance, ...chainData, balanceInCheap: BigInt(balance).toLocaleString()})
      }).catch((err) => {
        logger.debug('[Balance] Failed to get balance from erc20 due to', err)
        notifyAlertUpdate([{severity: 'error', message: err?.message}])
      })
    } else {
      notifyAlertUpdate([{severity: 'error', message: 'Failed to get balance from wallet. Please refesh page and try again'}])
    }
  }

  const handleDeposit = async (data) => {
    logger.debug('[Balance] handleDeposit data=', data)
    try {
      await center.asyncCall('notify_erc20_mint', data.deposit)
      const newWalletBalance = await center.asyncCall('notifyWalletBalance')
      const newERC20Balance = await center.asyncCall('notify_erc20_balanceOf')
      logger.debug('[Balance] handleDeposit. state =', state)
      logger.debug('[Balance] newWalletBalance =', newWalletBalance, ' newERC20Balance =', newERC20Balance)
      setState({
        deposit: 0, 
        chainSymbol: state.chainSymbol,
        chainId: data.chainId, 
        cheapSymbol: SYSSYMBOL, 
        balanceInChain: newWalletBalance, 
        balanceInCheap: BigInt(newERC20Balance).toLocaleString()
      })
      notifyAlertUpdate([{severity: 'success', message: 'Be deposited successfully'}])
    } catch (err) {
      logger.error('[Balance] Failed to deposit due to ', err)
      const errMsg = err?.info?.error?.message || err?.message
      notifyAlertUpdate([{severity: 'error', message: errMsg}])
    }
  }

  const handleInputChanges = (e) => {
    e.preventDefault()
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({...state, 
      balanceInChain: -1,
      chainSymbol: '',
      balanceInCheap: 0,
      deposit: 0,
      chainId: ''
    })
    reset()
  }

  const handleChainChange = async (chainId) => {
    logger.debug('[Balance] handleChainChange. chainId=', chainId)
    logger.debug('[Balance] call wallet to get balance by chainId = ', chainId)
    await center.asyncCall('notifyNetworkChangeCheck', chainId)
    const chainSymbol = getChainCurrency(chainId)
    const chainData = {
      chainId: chainId,
      chainSymbol: chainSymbol
    }
    logger.debug('[Balance] set chainData =', chainData)
    setChainData(chainData)
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
                id='balanceInChain' 
                aria-label='balanceInChain'
                name='balanceInChain'
                label={`Balance in ${state.chainId ? getChainName(state.chainId) : ''}`}
                value={state.balanceInChain}
                {...register('balanceInChain')}
                error={errors?.balanceInChain? true: false}
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
                id='balanceInCheap' 
                aria-label='balanceInCheap'
                name='balanceInCheap'
                label={`Balance in Cheap`}
                value={state.balanceInCheap}
                variant='outlined'
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">
                                    <Typography sx={{fontWeight:'bold', color:'black'}}>{state.cheapSymbol}</Typography>
                                  </InputAdornment>,
                }}
                />
                <Box sx={{display: 'flex', flexDirection:'row', width:1, alignItems:'center'}}>
                  <TextField
                  sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}, width: 0.5, mr:2}}
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
                  <Box>
                    <ExchangeRateTip text={`Rate: ${state.chainId ? getExchange(state.chainId) : 'N/A'}`}/>
                  </Box>
                </Box>
              
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                  <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Deposit</Button>
            </Box>
        </Box>
      </Container>
    </Box>
  )
}

