import Button from '@mui/material/Button'
import { Box, CircularProgress, Typography } from "@mui/material"
import logger from "../../../common/Logger"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {MintCreateNFTSchema} from '../../../common/Schemas'
import CustomSelect from '../../../common/CustomSelect'
import { getChainName, networks } from '../../../utils/Chain'
import { useEffect, useState } from 'react'


export default function CreateNFT({ipfsURL, eventsBus, handleNext, notifyAlertUpdate, notifyNetworkCheckAndBuy, notityMintCall}) {
    logger.debug('[Mint-CreateNFT] rendering...')
    const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintCreateNFTSchema)})

    const [state, setState] = useState({
        ipfsURL: ipfsURL,
        chainId: '',
        address: '',
        addressOptions: [],
        isloading: false
    })

    const [mintData, setMintData] = useState(undefined)

    useEffect(() => {
      eventsBus.handleNetworkChangeDone = handleNetworkChangeDone
      eventsBus.handleMintDone = handleMintDone
    }, [mintData])

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

    const handleNetworkChangeDone = () => {
      logger.debug('[Mint-CreateNFT] handleNetworkChangeDone')
      logger.debug('[Mint-CreateNFT] call wallet to mint a nft... Once it is done successfull, call restful api to log a nft record')
      logger.debug('mintData:', mintData)
      setState({...state, isloading: true})
      notityMintCall(mintData)
    }

    const handleAddressChange = (value) => {
        setState({...state, address: value})
    }

    const handleMintDone = ({success, reason}) => {
      logger.debug('[Mint-CreateNFT] handleMintDone')
      setState({...state, isloading: false})
      if (success) {
        notifyAlertUpdate([{severity: 'success', message: 'A new NFT is minted successfully'}])
        handleNext()
      } else {
        notifyAlertUpdate([{severity: 'error', message: reason}])
      }
    }

    const handleCreate = async (data) => {
        logger.info('[Mint-CreateNFT] handleCreate data =', data)
        await notifyNetworkCheckAndBuy(state.chainId)
        const mintData = {
          chainId: data?.chainId,
          address: data?.address,
          ipfsURL: state.ipfsURL
        }
        setMintData(mintData)
    }

    const handleReset = () => {
        setState({
          ...state,
          chainId: '',
          address: '',
          addressOptions: [],
          isloading: false})
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
                autoComplete="off"
                >

                <Box sx={{width:1, mt:1}}>
                    <strong>IPFS URL:</strong> <Typography sx={{wordBreak:'break-word'}}>{state.ipfsURL}</Typography>
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
                        <Box sx={{position: 'relative'}}>
                          {
                                state.isloading && <CircularProgress size={24} sx={{position: 'absolute',top: 22, left: 25}}/>
                          }
                          <Button 
                            sx={{textTransform:'none', m:1}}
                            variant='contained' 
                            color='customBlack' 
                            type="submit" 
                            disabled={state.isloading}
                            >Mint</Button>
                        </Box>
                </Box>
            </Box>
            <Button variant='contained' onClick={handleNext}>click</Button>
        </Box>
    )
}