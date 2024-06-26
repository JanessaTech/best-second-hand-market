import {Box, Button, OutlinedInput,  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {capitalize} from '../../utils/StringUtils'
import {PriceFilterSchema} from '../Schemas'
import logger from '../Logger'
import {MaxValueInFilter, MinValueInFilter} from '../constant'

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

function getPricesFromLocalStorage() {
    let filter = localStorage.getItem('filter')
    if (filter) {
      filter = JSON.parse(filter)
      if (filter.prices) {
        if (!filter.prices.min) {
            filter.prices.min = MinValueInFilter
        }
        if (!filter.prices.max) {
            filter.prices.max = MaxValueInFilter
        }
        return filter.prices
      }
    }
    return {min: MinValueInFilter, max: MaxValueInFilter}
  }

const PriceFilter = ({notifyAlertUpdate, center}) => {
    logger.debug('[PriceFilter] rendering...')
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(PriceFilterSchema)
    })
    const [minValue, setMinValue] = useState(getPricesFromLocalStorage().min)
    const [maxValue, setMaxValue] = useState(getPricesFromLocalStorage().max)

    useEffect(() => {
        logger.debug('[PriceFilter] add handlePriceFilterReset to eventsBus in center')
        center.eventsBus.handlePriceFilterReset = handlePriceFilterReset
    }, [])

    const handlePriceFilterReset = () => {
        logger.debug('[PriceFilter] handlePriceFilterReset')
        setMinValue(getPricesFromLocalStorage().min)
        setMaxValue(getPricesFromLocalStorage().max)
    }

    const changeMinValue = (value) => {
        setMinValue(value)
    }
    const changeMaxValue = (value) => {
        setMaxValue(value)
    }

    const handleClear = () => {
        reset()
        setMinValue(MinValueInFilter)
        setMaxValue(MaxValueInFilter)
    }

    const handleApply = (data) => {
        let filter = localStorage.getItem('filter')
        if (filter) {
            filter = JSON.parse(filter)
            filter.prices = {min: data.min, max: data.max}
        } else {
            filter = {prices: {min: data.min, max: data.max}}
        }
        localStorage.setItem('filter', JSON.stringify(filter))
        logger.info('[PriceFilter] handleApply. store filter:', filter)
        center.call('notifyFilterUpdate')
    }

    useEffect(() => {
        let alerts = []

        if (errors?.max) {
            alerts.push({severity: 'error', message: errors?.max?.message})
        }
        if(errors?.min) {
            alerts.push({severity: 'error', message: errors?.min?.message})
        }
        if (alerts.length > 0) {
            notifyAlertUpdate(alerts)
        } 
    }, [errors])

  return (
    <Box component='form'
        onSubmit={handleSubmit(handleApply)}
        noValidate autoComplete='off'>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'end', my:2}}  
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
    </Box> 
  )
}

export default PriceFilter