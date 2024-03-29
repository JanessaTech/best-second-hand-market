import Button from '@mui/material/Button'
import { Box, TextField, Typography } from "@mui/material"
import logger from "../../../common/Logger"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {MintCreateNFTSchema} from '../../../common/Schemas'
import CustomSelect from '../../../common/CustomSelect'
import { getChainName, networks } from '../../../utils/Chain'
import { useEffect, useState } from 'react'


export default function CreateNFT({ipfsURL, handleNext, notifyAlertUpdate, notifyNetworkCheckAndBuy}) {
    logger.debug('[Mint-CreateNFT] rendering...')
    const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintCreateNFTSchema)})

    const [state, setState] = useState({
        chainId: '',
        address: '',
        addressOptions: []
    })

    useEffect(() => {
        let alerts = []
        if (errors && errors.length > 0) {
          logger.debug('[Mint-CreateNFT] errors = ', errors)
        }
        if (errors?.chainId) {
          alerts.push({severity: 'error', message: errors?.chainId?.message})
        }
        if (errors?.address) {
          alerts.push({severity: 'error', message: errors?.address?.message})
        }
        if(alerts.length > 0) {
          logger.info('[Mint-CreateNFT] sending alerts = ', alerts)
          notifyAlertUpdate(alerts)
        }  
      }, [errors])

    const handleChainChange = (value) => {
        logger.info('[Mint-CreateNFT] handleChainChange. chainId=', value)
        reset()
        const chain = networks().find(n => n.chainId === value)
        if (!chain) {
            logger.debug('[Mint-CreateNFT] Cannot find chain by chainId. Please check the correction of config.chains in config.common.js')
        } else {
            const addresses = chain?.contracts?.map(contract => contract.address)
            logger.debug('[Mint-CreateNFT] addresses available by chainId', value, addresses )
            setState({...state, chainId: value, addressOptions: addresses, address: ''})
        }
    }

    const handleAddressChange = (value) => {
        setState({...state, address: value})
    }

    const handleCreate = (data) => {
        logger.info('[Mint-CreateNFT] handleCreate data =', data)
        notifyNetworkCheckAndBuy(state.chainId)
        logger.debug('[Mint] call wallet to mint a nft... Once it is done successfull, call restful api to log a nft record')
    }

    const handleReset = () => {
        setState({
          ...state,
          chainId: '',
          address: '',
          addressOptions: []})
        reset()
    } 

    return (
        <Box>
            <Box component='form'
                sx={{
                  '& .MuiButtonBase-root': { my: 2},
                  '& .MuiFormControl-root':{ my: 2},
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center'
                }}
                onSubmit={handleSubmit(handleCreate)}
                noValidate
                autoComplete="off">

                <Box sx={{width:1, mt:1}}>
                    <strong>IPFS URL:</strong> <Typography sx={{wordBreak:'break-word'}}>{ipfsURL}</Typography>
                </Box>
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
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Button variant='outlined' color='customBlack' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button>
                        <Button variant='contained' color='customBlack' type="submit" sx={{textTransform:'none', ml:2}}>Mint</Button>
                </Box>
            </Box>
            <Button variant='contained' onClick={handleNext}>click</Button>
        </Box>
    )
}