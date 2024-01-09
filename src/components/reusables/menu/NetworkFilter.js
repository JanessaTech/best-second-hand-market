import { Box, FormControl, InputAdornment, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { CheapIcon } from '../../../utils/Svgs'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 200,
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

export default function NetworkFilter() {
    const networks = ['Ethereum', 'Polygon', 'Avalanche', 'Solana']
    const theme = useTheme()
  
    const [network, setNetwork] = useState('Ethereum')
    
  
    const handleNetworkChange = (e) => {
      setNetwork(e.target.value)
    }

  return (
    <Box sx={{mt:2, mb:3}}>
        <FormControl sx={{width: 200 }}>
            <Select
            label="network-type-option"
            value={network}
            onChange={handleNetworkChange}
            renderValue={(p) => p}
            input={
            <OutlinedInput 
                size="small" 
                startAdornment={
                <InputAdornment position="start">
                    <CheapIcon name={network.toLowerCase()}/>
                </InputAdornment>
                }
                />}
            MenuProps={MenuProps}
            >
            {
                    networks.map((networkName) => (
                        <MenuItem
                            key={networkName}
                            value={networkName}
                            style={getStyles(networkName, network, theme)}
                        >
                            <ListItemIcon>
                                <CheapIcon name={networkName.toLowerCase()}/>
                            </ListItemIcon>
                            <ListItemText>{networkName}</ListItemText>
                        </MenuItem>
                    ))
                }    

            </Select>
        </FormControl>
    </Box>
  )
}

