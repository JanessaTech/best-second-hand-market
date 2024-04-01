import {useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Box, CircularProgress, TextField, Typography } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import logger from "../../../common/Logger"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {MintUploadSchema} from '../../../common/Schemas'
import config from '../../../config'
import CustomSelect from '../../../common/CustomSelect'
import {isFileImage} from '../../../utils/FileUtils'
import catchAsync from '../../../utils/CatchAsync'
import {ipfs as ipfsClient} from '../../../utils/serverClient'
import messageHelper from '../../../common/helpers/internationalization/messageHelper'

const VisuallyHiddenInput = styled(props => {
    const {type, onChange} = props
    return <input
        id={config.multer.productFieldPrefix} 
        name={config.multer.productFieldPrefix}
        type={type} 
        onChange={onChange}/>
  })({
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

export default function Upload({handleNext, notifyAlertUpdate}) {
    logger.debug('[Mint-Upload] rendering...')

    const {register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(MintUploadSchema)})
    const [state, setState] = useState({
        title: '',
        category: '',
        description: '',
        selectedFile: undefined,
        isloading: false
      })

    const handleInputChanges = (e) => {
        e.preventDefault()
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (value) => {
        setState({...state, category: value})
    }

    useEffect(() => {
        let alerts = []
        if (errors && errors.length > 0) {
          logger.debug('[Mint-Upload] errors = ', errors)
        }
        if (errors?.title) {
          alerts.push({severity: 'error', message: errors?.title?.message})
        }
        if (errors?.category) {
          alerts.push({severity: 'error', message: errors?.category?.message})
        }
        if (errors?.description) {
          alerts.push({severity: 'error', message: errors?.description?.message})
        }
        
        if(alerts.length > 0) {
          logger.info('[Mint-Upload] sending alerts = ', alerts)
          notifyAlertUpdate(alerts)
        }  
    }, [errors])

    const handleUpload= async (data) => {
        logger.info('[Mint-Upload] handleUpload data =', data)
        if (!state.selectedFile) {
            notifyAlertUpdate([{severity: 'error', message: 'Please select an image file to be uploaded'}])
        } else {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('category', data.category)
            formData.append('description', data.description)
            formData.append(config.multer.productFieldPrefix, state.selectedFile)
            await catchAsync(async () => {
                setState({...state, isloading: true})
                const metadata = await ipfsClient.upload(formData)
                logger.info('metadata:', metadata)
                setState({...state, isloading: false})
                if (!metadata?.data?.image) {
                    throw new Error(messageHelper.getMessage('ipfs_url_not_found'))
                }
                notifyAlertUpdate([{severity: 'success', message: 'The file is uploaded successfully'}])
                handleNext({ipfs: metadata?.data?.image})
            }, notifyAlertUpdate)
        }
    }

    const handleReset = () => {
        setState({...state, title: '', category: '', description: '', selectedFile: undefined, isloading: false})
        reset()
    }

    const onFileChange = (e) => {
        logger.debug('[Mint-Upload] onFileChange')
        const file = e.target.files[0]
        logger.debug('[Mint-Upload] file name:', file?.name)
        logger.debug('[Mint-Upload] file type:', file?.type)
        logger.debug('[Mint-Upload] file size:', file.size)
        if (file && !isFileImage(file)) {
            notifyAlertUpdate([{severity: 'error', message: 'Please choose an image. We support png, jpg and gif only'}])
            return
        }
        if (file && file.size > config.multer.productSize) {
            notifyAlertUpdate([{severity: 'error', message: 'The file chosen should be less than 100M '}]) 
            return
        }
        setState({...state, selectedFile: e.target?.files[0]})
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
                onSubmit={handleSubmit(handleUpload)}
                noValidate
                autoComplete="off"
                encType='multipart/form-data'
                >
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
                        options={Object.values(config.CATEGORIES).map((c) => c.description)} // The content of dropdown list
                        width={1}  //size
                        register={register}  // bind it to useForm
                        errors={errors}  // errros if the value is not conformed with schema
                        validate={true}  // sometimes, we don't need to do validation where the select is just a general dropdown list. In this case, we set validate as false or leave as undefined
                        cap={true}
                    />
                    <Box>
                        <Button sx={{textTransform: 'none'}}
                                            component="label" 
                                            variant="contained" 
                                            startIcon={<CloudUploadIcon />} 
                                            color='customBlack'>
                                        Upload an image file for your product
                                        <VisuallyHiddenInput type="file" onChange={onFileChange}/>
                        </Button>
                        <Typography variant='body2' sx={{height:20, width:1}}>{state?.selectedFile?.name}</Typography>
                    </Box>
                    <TextField
                        sx={{'& .MuiOutlinedInput-notchedOutline':{borderRadius:1}}}
                        id='description' 
                        aria-label='description'
                        name='description'
                        label='NFT description'
                        value={state.description}
                        error={errors?.description ? true: false}
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
                        <Box sx={{position: 'relative'}}>
                            {
                                state.isloading && <CircularProgress size={24} sx={{position: 'absolute',top: 22, left: 40}}/>
                            }
                            <Button 
                                variant='contained' 
                                color='customBlack' 
                                type="submit" 
                                sx={{textTransform:'none', ml:2}} 
                                disabled={state.isloading}>Upload</Button>
                        </Box>
                    </Box>
            </Box>
            <Button variant='contained' onClick={handleNext}>click</Button>
        </Box>
    )
}