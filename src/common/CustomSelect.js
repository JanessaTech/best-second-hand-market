import React from 'react'
import { useTheme } from '@mui/material/styles'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

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

function getStyles(sortName, sortBy, theme) {
  return {
    fontWeight:
      sortBy.indexOf(sortName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CustomSelect(props) {
  const theme = useTheme()
  // you need to set register, name, errors and validate with true  when you want to use useForm to validate the Select 
  // check Mint.js to see how to use Select with useForm
  const {label, showInputLabel, value, handleChange, options, width, register, name, errors, validate} = props

  const handleSelectChange = (e) => {
      handleChange(e.target.value)
  }

  return (
      <FormControl sx={{width: width}}>
                    {showInputLabel && <InputLabel id={`${label}-options-label`}>{label}</InputLabel>}
                    <Select
                        label={label}
                        value={value}
                        onChange={handleSelectChange}
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
                                    {option}
                                </MenuItem>
                            ))
                        }                        
                    </Select>
      </FormControl>
  )
}

