import {Box, Button, OutlinedInput,  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {capitalize} from '../../utils/StringUtils'
import {PriceFilterSchema} from '../Schemas'
import CustomSnackBar from '../CustomSnackBar';

const NumberInput = (props) => {
    const {placeholder, name, value, changeValueFun, register, errors, ...others} = props
    const handleChange = (e) => {
        changeValueFun(e.target.value)
    }
    
    return (
        <Box>
            <Typography>{capitalize(placeholder)}:</Typography>
            <OutlinedInput 
                id={`id-price-filter-${name}`}
                name={name}
                {...register(name)}
                size='small' 
                sx={{width:85}} 
                type="number"
                inputProps={{min: 0}}
                value={value}
                error={errors[name]? true: false}
                onChange={handleChange}
                onKeyPress={(event) => {
                    if (event?.key === '-' || event?.key === '+') {
                      event.preventDefault();
                    }
                }}
                placeholder={placeholder}
                {...others}/> 
        </Box>
        )
}


export default function PriceFilter() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(PriceFilterSchema)
    })
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(100)
    const [alerts, setAlerts] = useState([])

    const changeMinValue = (value) => {
        setMinValue(value)
    }
    const changeMaxValue = (value) => {
        setMaxValue(value)
    }

    const handleClear = () => {
        reset()
        setMinValue(0)
        setMaxValue(100)
    }

    const handleApply = (data) => {
        console.log('data:', data)
    }

    useEffect(() => {
        let newAlerts = []
        if (errors?.max) {
            newAlerts.push({id: 'max', severity: 'error', message: errors?.max?.message})
        }
        if(errors?.min) {
            newAlerts.push({id: 'min', severity: 'error', message: errors?.min?.message})
        }
        setAlerts(newAlerts)
    }, [errors])

    const clearAlerts = () => {
        setAlerts([])
    }
   
  return (
    <Box component='form'
        onSubmit={handleSubmit(handleApply)}
        noValidate autoComplete='off'>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', my:2}}  
        >
            <NumberInput 
                placeholder={'min'} 
                name={'min'}
                value={minValue} 
                changeValueFun={changeMinValue} 
                register={register} 
                errors={errors}
                />
            <Typography>to</Typography>
            <NumberInput 
                placeholder={'max'} 
                name={'max'}
                value={maxValue} 
                changeValueFun={changeMaxValue}
                register={register} 
                errors={errors}
                />
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-around'}}>
            <Button variant='outlined' color='customBlack' onClick={handleClear}>Clear</Button>
            <Button variant='contained' color='customBlack' type="submit">Apply</Button>
        </Box>
        {
            alerts && alerts.length > 0 && <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlerts={clearAlerts}/>       
        }  
    </Box> 
  )
}

