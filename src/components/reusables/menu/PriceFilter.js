import {Box, Button, FormHelperText, OutlinedInput, Snackbar, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {capitalize} from '../../../utils/StringUtils'
import {PriceFilterSchema} from '../../../common/schemas/home'

const NumberInput = styled((props) => {
    const {placeholder, name, value, changeValueFun, register, errors, handleErrorMsg, ...others} = props
    const handleChange = (e) => {
        changeValueFun(e.target.value)
    }
    const cntRef = useRef(0)
    useEffect(() => {
        cntRef.current = cntRef.current + 1
        console.log('cntRef.current:', cntRef.current)
    })
    
    return (
        <Box>
            {console.log('NumberInput rendering ....')}
            <Typography>{capitalize(placeholder)}:</Typography>
            <OutlinedInput 
                id={`id-price-filter-${name}`}
                name={name}
                {...register(name)}
                size='small' 
                sx={{width:85}} 
                type="number"
                value={value}
                error={errors[name]? true: false}
                onChange={handleChange}
                placeholder={placeholder}
                {...others}/> 
                {
                    errors[name] && handleErrorMsg(errors[name].message) 
                }
            <FormHelperText id={`id-price-filter-${name}-helper-text`}>{errors[name] ? errors[name].message : " "}</FormHelperText>
        </Box>
        )
})({})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function PriceFilter() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(PriceFilterSchema)
    })
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(100)
    const [hasError, setHasError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const changeMinValue = (value) => {
        console.log('min value = ', value)
        setMinValue(value)
    }
    const changeMaxValue = (value) => {
        console.log('max value = ', value)
        setMaxValue(value)
    }

    const handleClear = () => {
        setMinValue(0)
        setMaxValue(100)
    }

    const handleApply = (data) => {
        console.log('data:', data)
    }

    const closeSnackBar = () => {
        console.log('closeSnackBar')
        setHasError(false)
        setErrorMsg('')
    }
    const handleErrorMsg = (msg) => {
        console.log('handleErrorMsg')
        setErrorMsg(msg)
        setHasError(true)
    }

  return (
    <Box component='form'
        onSubmit={handleSubmit(handleApply)}
        noValidate autoComplete='off'>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', mt:2}}  
        >
            <NumberInput 
                placeholder={'min'} 
                name={'min'}
                value={minValue} 
                changeValueFun={changeMinValue} 
                register={register} 
                handleSubmit={handleSubmit}
                errors={errors}
                handleErrorMsg={handleErrorMsg}
                />
            <Typography>to</Typography>
            <NumberInput 
                placeholder={'max'} 
                name={'max'}
                value={maxValue} 
                changeValueFun={changeMaxValue}
                register={register} 
                handleSubmit={handleSubmit}
                errors={errors}
                handleErrorMsg={handleErrorMsg}
                />
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-around'}}>
            <Button variant='outlined' color='customBlack' onClick={handleClear}>Clear</Button>
            <Button variant='contained' color='customBlack' type="submit">Apply</Button>
        </Box>
        <Snackbar
            open={hasError} onClose={closeSnackBar}
        >
            <Alert onClose={closeSnackBar} severity="error">{errorMsg}</Alert>
        </Snackbar>
    </Box>
    
  )
}

