import React from 'react'
import { useTheme } from '@mui/material/styles'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import {capitalize} from '../utils/StringUtils'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 'inherit',
    },
    
  },
  disableScrollLock: true,
};

function getStyles(option, value, theme) {
  //logger.trace('[CustomSelect] getStyles. option=', option, ' value=', value)
  //logger.trace('[CustomSelect] typeof value=', typeof value)
  var fontWeight = theme.typography.fontWeightRegular
  if (typeof value === 'number') {
    if (option === value) {
      fontWeight = theme.typography.fontWeightMedium
    }
  } else if (typeof value === 'string') {
    if (value.indexOf(option) !== -1) {
      fontWeight = theme.typography.fontWeightMedium
    }
  } else {
    // undefined or other types
    // TBD
  }
  return {
    fontWeight: fontWeight
  };
}

export default function CustomSelect(props) {
  const theme = useTheme()
  /**
   * @label: shown in label
   * @showInputLabel: indicator of whether or not we need to show label
   * @value: the actual value chosen
   * @handleChange: fun to change to value
   * @options: The content of dropdown list
   * @width: The width of select input. optional
   * @register: bind it to useForm. optional
   * @name: The name when register the value, which is used by schema. optional
   * @errors: errros if the value is not conformed with schema. optional
   * @validate: sometimes, we don't need to do validation where the select is just a general dropdown list. In this case, we set validate as false or leave as undefined. optional
   * @cap: whether or not we need to show value in capital. optional
   */
  // you need to set register, name, errors and validate as being true when you want to use useForm to validate the Select 
  // check Mint.js to see how to use Select with useForm
  // for the case without using useForm, check Balance.js for more usage
  const {label, showInputLabel, value, handleChange, options, width, register, name, errors, validate, cap, renderFun} = props

  const handleSelectChange = (e) => {
      handleChange(e.target.value)
  }

  const getOptionRenderValue = (p, cap, optionFun) => {
    if (cap && optionFun) {
      return capitalize(optionFun(p))
    } else if (cap) {
      return capitalize(p)
    } else if (optionFun) {
      return optionFun(p)
    }
      return p
  }

  return (
      <FormControl sx={{width: width}}>
                    {showInputLabel && <InputLabel id={`${label}-options-label`}>{label}</InputLabel>}
                    <Select
                        label={label}
                        value={value}
                        onChange={handleSelectChange}
                        renderValue={(p) => {
                          return getOptionRenderValue(p, cap, renderFun)
                        }}
                        input={validate ? <OutlinedInput 
                                            size="small" 
                                            label={showInputLabel? label : ''} 
                                            name={name} {...register(name)}
                                            error={errors[name]? true: false}
                                            /> : <OutlinedInput 
                                                  size="small" 
                                                  label={showInputLabel? label : ''} />
                              }
                        MenuProps={MenuProps}
                    >
                        {
                            options.map((option) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    style={getStyles(option, value, theme)}
                                >
                                    {getOptionRenderValue(option, cap, renderFun)}
                                </MenuItem>
                            ))
                        }                        
                    </Select>
      </FormControl>
  )
}

