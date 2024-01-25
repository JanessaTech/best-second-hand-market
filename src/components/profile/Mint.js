import { Box, Button, Container, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import {HeaderHeight} from '../../common/constant'
import {MintSchema} from '../../common/Schemas'
import {GlobalVariables} from '../MainLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../common/CustomSelect'

const contractData = [
  {
    chain: 'Ethereum',
    local: [
      {address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0', tokenStandard: '721'},
      {address: '0xcdcbb4f79e3770252ee32d89b6673eb68ffdd342', tokenStandard: '1155'},
    ],
    testnet: [
      {address: '0xaaaaaa', tokenStandard: 'aaaa'},
      {address: '0xbbbbbb', tokenStandard: 'bbbb'},
    ],
    mainnet: [
      {address: '0xcccccc', tokenStandard: 'cccc'},
      {address: '0xdddddd', tokenStandard: 'dddd'},
    ]
  },
  {
    chain: 'Polygon',
    local: [
      {address: '0xeeeeee', tokenStandard: 'eeee'},
      {address: '0xffffff', tokenStandard: 'ffff'},
    ],
    testnet: [
      {address: '0xggggg', tokenStandard: 'gggg'},
      {address: '0xhhhhh', tokenStandard: 'hhhh'},
    ],
    mainnet: [
      {address: '0xiiiiii', tokenStandard: 'iiii'},
      {address: '0xjjjjjj', tokenStandard: 'jjjj'},
    ]
  },
  {
    chain: 'Avalanche',
    local: [
      {address: '0xkkkkkkk', tokenStandard: 'kkkk'},
      {address: '0xlllllll', tokenStandard: '1llll'},
    ],
    testnet: [
      {address: '0xmmmmmmm', tokenStandard: 'mmmm'},
      {address: '0xnnnnnnn', tokenStandard: 'nnnn'},
    ],
    mainnet: [
      {address: '0xoooooo', tokenStandard: 'oooo'},
      {address: '0xpppppp', tokenStandard: 'pppp'},
    ]
  },
  {
    chain: 'Solana',
    local: [
      {address: '0xqqqqqqqq', tokenStandard: 'qqqq'},
      {address: '0xrrrrrrrr', tokenStandard: 'rrrr'},
    ],
    testnet: [
      {address: '0xssssssss', tokenStandard: 'ssss'},
      {address: '0xtttttttt', tokenStandard: 'tttt'},
    ],
    mainnet: [
      {address: '0xuuuuuuuu', tokenStandard: 'uuuu'},
      {address: '0xvvvvvvvv', tokenStandard: 'vvvv'},
    ]
  }
]

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

export default function Mint() {
  const {notifyAlertUpdate} = React.useContext(GlobalVariables)
  const categories = ['Pets', 'Clothes', 'Cosmetics', 'Outfits', 'Car', 'Devices', 'Books']
  const chainOptions = ['Ethereum', 'Polygon', 'Avalanche', 'Solana']
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
    console.log('[Mint] errors = ', errors)
    if (errors?.title) {
      alerts.push({severity: 'error', message: errors?.title?.message})
    }
    if (errors?.category) {
      alerts.push({severity: 'error', message: errors?.category?.message})
    }
    if (errors?.chain) {
      alerts.push({severity: 'error', message: errors?.chain?.message})
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
      console.log('[Mint]sending alerts = ', alerts)
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
    console.log('[Mint] handleMint data =', data)

  }

  const handleCategoryChange = (value) => {
    setState({...state, category: value})
  }

  const handleChainChange = (value) => {
    console.log('[Mint]handleChainChange. value=', value)
    const localData = contractData.filter((c) => c.chain === value)[0].local  // set it as local temporaily
    console.log('localData:', localData)
    const addresses = localData.map((d) => d.address)
    const standards = localData.map((d) => d.tokenStandard)
    console.log('addresses =', addresses)
    console.log('standards =', standards)

    setState({...state, chain: value, addressOptions: addresses, standardOptions: standards, address: '', standard: ''})
    reset()
  }

  const handleAddressChange = (value) => {
    const index = state.addressOptions.indexOf(value)
    console.log()
    setState({...state, address: value, standard: state.standardOptions[index]})
  }

  const handleStandardChange = (value) => {
    setState({...state, standard: value})
  }

  console.log('state: ', state)

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
                options={categories} // The content of dropdown list
                width={1}  //size
                register={register}  // bind it to useForm
                errors={errors}  // errros if the value is not conformed with sechema
                validate={true}  // sometimes, we don't need to do validation where the select is just a general dropdown list. In this case, we set validate as false or leave as undefined
                />
              <CustomSelect 
                name={'chain'}
                label={'Chain'} 
                showInputLabel={true} 
                value={state.chain} 
                handleChange={handleChainChange} 
                options={chainOptions} 
                width={1}
                register={register}
                errors={errors}
                validate={true}
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
              <Button sx={{textTransform: 'none'}}
                            component="label" 
                            variant="contained" 
                            startIcon={<CloudUploadIcon />} 
                            color='customBlack'>
                        Upload your profile image file
                        <VisuallyHiddenInput type="file" />
              </Button>
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

