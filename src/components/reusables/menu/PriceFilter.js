import {Box, Button, Fade, IconButton, OutlinedInput, Paper, Slide, Snackbar, Stack, Tooltip, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {capitalize} from '../../../utils/StringUtils'
import {PriceFilterSchema} from '../../../common/schemas/home'
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar = (props) => {
    const {duration, timeout, alerts, clearAlters, ...others} = props
    const [fadeIn, setFadeIn] = useState(alerts && alerts.length > 0 ? true : false)

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after ', duration)
            handleClearAlters()
        }, duration)
        return () => clearTimeout(timer)
    })
    useEffect(() => {
        console.log('alerts.length > 0 :', alerts.length > 0)
        setFadeIn(alerts && alerts.length > 0 ? true : false)
    }, [alerts])

    const handleClearAlters = () => {
        setFadeIn(false)
        clearAlters()
    }

    return (
        <Fade in={fadeIn} timeout={timeout}>
                <Box sx={{position:'fixed', bottom:10}}>
                    {alerts && alerts.length > 0 && 
                        <Box sx={{display:'flex', justifyContent:'end'}}>
                            <Tooltip title="Clear all" placement="right">
                                <IconButton onClick={handleClearAlters}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    } 
                    <Stack spacing={0.5}>
                        {
                            alerts.map((a) => (
                                <Alert key={a.id} severity={a.severity}>{a.message}</Alert>
                            ))
                        }
                    </Stack>
                </Box>
                
        </Fade>
    )
}

const NumberInput = styled((props) => {
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
                value={value}
                error={errors[name]? true: false}
                onChange={handleChange}
                placeholder={placeholder}
                {...others}/> 
        </Box>
        )
})({})



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
        setMinValue(0)
        setMaxValue(100)
    }

    const handleApply = (data) => {
        console.log('data:', data)
    }

    useEffect(() => {
        console.log('inspect errors')
        console.log(errors)
        let newAlerts = []
        if (errors?.max) {
            newAlerts.push({id: 'max', severity: 'error', message: errors?.max?.message})
        }
        if(errors?.min) {
            newAlerts.push({id: 'min', severity: 'error', message: errors?.min?.message})
        }
        setAlerts(newAlerts)
    }, [errors])

    const clearAlters = () => {
        console.log('clearAlters ...')
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
  
        <CustomSnackBar duration={6000} timeout={1000} alerts={alerts} clearAlters={clearAlters}/>       
    </Box> 
  )
}

