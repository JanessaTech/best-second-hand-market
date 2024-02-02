import { Box, Button, Container, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {HeaderHeight} from '../../common/constant'
import {MintSchema} from '../../common/Schemas'
import {GlobalVariables} from '../MainLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import {NETWORKS, CATEGORIES} from '../../common/constant'
import config from '../../config/index'


export default function Mint() {
  logger.debug('[Mint] rendering...')
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintSchema)})

  const [state, setState] = useState({
    title: '',
    category: '',
    chain: '',
    address: '',
    standard: '',
    description: '',
    addressOptions: [],
    standardOptions: []
  })

  useEffect(() => {
    let alerts = []
    logger.debug('[Mint] errors = ', errors)
    if (errors?.title) {
      alerts.push({severity: 'error', message: errors?.title?.message})
    }
    if (errors?.category) {
      alerts.push({severity: 'error', message: errors?.category?.message})
    }
    if (errors?.chain) {
      alerts.push({severity: 'error', message: errors?.chain?.message})
    }
    if (errors?.chaintype) {
      alerts.push({severity: 'error', message: errors?.chaintype?.message})
    }
    if (errors?.address) {
      alerts.push({severity: 'error', message: errors?.address?.message})
    }
    if (errors?.standard) {
      alerts.push({severity: 'error', message: errors?.standard?.message})
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
      category: '',
      chain: '',
      address: '',
      standard: '',
      description: '',
      addressOptions: [],
      standardOptions: []})

    reset()
  }

  const handleMint= (data) => {
    logger.info('[Mint] handleMint data =', data)
  }

  const handleCategoryChange = (value) => {
    setState({...state, category: value})
  }

  const handleChainChange = (value) => {
    logger.info('[Mint]handleChainChange. value=', value)
    logger.debug('[Mint] config=', config)
    const env = config?.env
    logger.debug('[Mint] env=', env)
    const localData = config.contracts.filter((c) => c.chain === value)[0][env]  // set it as local temporaily
    logger.debug('localData:', localData)
    const addresses = localData?.map((d) => d.address)
    const standards = localData?.map((d) => d.tokenStandard)
    logger.debug('addresses =', addresses)
    logger.debug('standards =', standards)

    setState({...state, chain: value, addressOptions: addresses, standardOptions: standards, address: '', standard: ''})
    reset()
  }

  const handleAddressChange = (value) => {
    const index = state.addressOptions.indexOf(value)
    setState({...state, address: value, standard: state.standardOptions[index]})
  }

  const handleStandardChange = (value) => {
    setState({...state, standard: value})
  }

  logger.debug('state: ', state)

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
              <CustomSelect
                name={'category'}  // used by schema
                label={'Category'} // shown in label
                showInputLabel={true}  // indicator of whether or not we need to show label
                value={state.category} // the value
                handleChange={handleCategoryChange} // fun to change to value
                options={CATEGORIES} // The content of dropdown list
                width={1}  //size
                register={register}  // bind it to useForm
                errors={errors}  // errros if the value is not conformed with schema
                validate={true}  // sometimes, we don't need to do validation where the select is just a general dropdown list. In this case, we set validate as false or leave as undefined
                cap={true}
                />
              <CustomSelect 
                name={'chain'}
                label={'Chain'} 
                showInputLabel={true} 
                value={state.chain} 
                handleChange={handleChainChange} 
                options={NETWORKS} 
                width={1}
                register={register}
                errors={errors}
                validate={true}
                cap={true}
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
                  id='standard' 
                  aria-label='standard'
                  name='standard'
                  label='NFT standard'
                  value={state.standard}
                  variant='outlined'
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
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
        </Box>

      </Container>
    </Box>
  )
}

