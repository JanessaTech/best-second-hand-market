import { Box, Button, Container, TextField, Typography,Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import {HeaderHeight} from '../../common/constant'
import {MintSchema} from '../../common/Schemas'
import {GlobalVariables} from '../MainLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import config from '../../config'
import {networks, getChainName} from '../../utils/Chain'
import {nft as nftClient} from '../../utils/serverClient'
import catchAsync from '../../utils/CatchAsync'

export default function Mint() {
  logger.debug('[Mint] rendering...')
  const {notifyAlertUpdate, notifyHideMenu, notifyNetworkCheckAndBuy} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintSchema)})

  const [state, setState] = useState({
    title: '',
    ipfs: '',
    category: '',
    chainId: '',
    address: '',
    description: '',
    addressOptions: [], 
    mintSuccess: false
  })

  useEffect(() => {
    logger.debug('[Mint] call notifyHideMenu in useEffect')
    notifyHideMenu()
  }, [])

  useEffect(() => {
    let alerts = []
    if (errors && errors.length > 0) {
      logger.debug('[Mint] errors = ', errors)
    }
    if (errors?.title) {
      alerts.push({severity: 'error', message: errors?.title?.message})
    }
    if (errors?.ipfs) {
      alerts.push({severity: 'error', message: errors?.ipfs?.message})
    }
    if (errors?.category) {
      alerts.push({severity: 'error', message: errors?.category?.message})
    }
    if (errors?.chainId) {
      alerts.push({severity: 'error', message: errors?.chainId?.message})
    }
    if (errors?.address) {
      alerts.push({severity: 'error', message: errors?.address?.message})
    }
    if (errors?.description) {
      alerts.push({severity: 'error', message: errors?.description?.message})
    }
    
    if(alerts.length > 0) {
      logger.info('[Mint] sending alerts = ', alerts)
      notifyAlertUpdate(alerts)
    }  
  }, [errors])

  const handleInputChanges = (e) => {
    e.preventDefault()
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleReset = () => {
    setState({
      title: '',
      ipfs: '',
      category: '',
      chainId: '',
      address: '',
      description: '',
      addressOptions: []})

    reset()
  }

  const handleMint= async (data) => {
    logger.info('[Mint] handleMint data =', data)
    notifyNetworkCheckAndBuy(state.chainId)
    logger.debug('[Mint] call wallet to mint a nft... Once it is done successfull, call restful api to log a nft record')
    
    await catchAsync(async () => {
      const savedNFT = await nftClient.mint(data)
      logger.debug('[Mint] handleMint. savedNFT = ', savedNFT)
      setState({...state, mintSuccess: true})
      notifyAlertUpdate([{severity: 'success', message: 'nft_success_mint'}])
    }, notifyAlertUpdate)

    /*
    try {
      const savedNFT = await nftClient.mint(data)
      logger.debug('[Mint] handleMint. savedNFT = ', savedNFT)
      setState({...state, mintSuccess: true})
      notifyAlertUpdate([{severity: 'success', message: 'nft_success_mint'}])
    } catch (err) {
      let errMsg = ''
      if (err?.response?.data?.message) {
          errMsg = err?.response?.data?.message
      } else {
          errMsg = err?.message
      }
      notifyAlertUpdate([{severity: 'error', message: errMsg}])
    }*/
  }

  const handleCategoryChange = (value) => {
    setState({...state, category: value})
  }

  const handleChainChange = (value) => {
    logger.info('[Mint] handleChainChange. chainId=', value)
    reset()
    const chain = networks().find(n => n.chainId === value)
    if (!chain) {
      logger.debug('[Mint] Cannot find chain by chainId. Please check the correction of config.chains in config.common.js')
    } else {
      const addresses = chain?.contracts?.map(contract => contract.address)
      logger.debug('[Mint] addresses available by chainId', value, addresses )
      setState({...state, chainId: value, addressOptions: addresses, address: ''})
    }
  }

  const handleAddressChange = (value) => {
    setState({...state, address: value})
  }

  return (
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight}}></Box>
      <Container maxWidth="sm" sx={{my:5}}>
        { !state.mintSuccess ? 
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
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}}}
                    id='title' 
                    aria-label='title'
                    name='title'
                    label='NFT title'
                    value={state.title}
                    error={errors?.title? true: false}
                    placeholder='NFT title' 
                    {...register('title')}
                    variant='outlined'
                    size="small"
                    fullWidth
                    onChange={handleInputChanges}
                />
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}}}
                    id='ipfs' 
                    aria-label='IPFS URL'
                    name='ipfs'
                    label='IPFS URL'
                    value={state.ipfs}
                    error={errors?.ipfs? true: false}
                    placeholder='IPFS URL' 
                    {...register('ipfs')}
                    variant='outlined'
                    size="small"
                    fullWidth
                    onChange={handleInputChanges}
                />
                <CustomSelect
                  name={'category'}  // used by schema
                  label={'Category'} // shown in label
                  showInputLabel={true}  // indicator of whether or not we need to show label
                  value={state.category} // the value
                  handleChange={handleCategoryChange} // fun to change to value
                  options={Object.values(config.CATEGORIES).map((c) => c.description)} // The content of dropdown list
                  width={1}  //size
                  register={register}  // bind it to useForm
                  errors={errors}  // errros if the value is not conformed with schema
                  validate={true}  // sometimes, we don't need to do validation where the select is just a general dropdown list. In this case, we set validate as false or leave as undefined
                  cap={true}
                  />
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
                <CustomSelect 
                  name={'address'}
                  label={'Contract address'} 
                  showInputLabel={true} 
                  value={state.address} 
                  handleChange={handleAddressChange} 
                  options={state.addressOptions} 
                  width={1}
                  register={register}
                  errors={errors}
                  validate={true}
                  />
                <TextField
                    sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}}}
                    id='description' 
                    aria-label='description'
                    name='description'
                    label='NFT description'
                    value={state.description}
                    error={errors?.description? true: false}
                    placeholder='NFT description' 
                    {...register('description')}
                    variant='outlined'
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                    onChange={handleInputChanges}
                />
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                      <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                      <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Mint</Button>
                </Box>
            </Box> : 
            <Box>
              <Typography>You've minted a NFT with <strong>tokenId 1</strong> under the chain <strong>{`${getChainName(state.chainId)}(${state.chainId})`}</strong> and the address <strong>{state.address}</strong> successfully</Typography>
              <Typography>Click <Link component={RouterLink} to={`/profile/nfts`} 
                                  sx={{
                                      color: 'primary.main',
                                      '&:hover':{color:'primary.main'},
                                      '&:active':{color:'primary.dark'}
                                    }}>HERE</Link> to manage your NFTs</Typography>
            </Box>
        }

      </Container>
    </Box>
  )
}

