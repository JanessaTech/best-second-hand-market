import { Box, FormControl, InputAdornment, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'

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

function getStyles(networkName, network, theme) {
    return {
      fontWeight:
        network.indexOf(networkName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function getNeworkFromLocalStorage() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    filter = JSON.parse(filter)
    if (!filter.network){
      filter.network = 'Ethereum'
    }
  } else {
    filter = {network: 'Ethereum'}
  }
  localStorage.setItem('filter', JSON.stringify(filter))

  return filter.network
}

const NetworkFilter = ({notify}) => {
    const networks = ['Ethereum', 'Polygon', 'Avalanche', 'Solana']
    const theme = useTheme()
    const [network, setNetwork] = useState(getNeworkFromLocalStorage())
    
    const handleNetworkChange = (e) => {
      setNetwork(e.target.value)
      let filter = localStorage.getItem('filter')
      if (filter) {
        filter = JSON.parse(filter)
        filter.network = e.target.value
      } else {
        filter = {network: e.target.value}
      }
      localStorage.setItem('filter', JSON.stringify(filter))
      console.log('[NetworkFilter] store filter:', filter)
      const trigger = Math.random()
      notify(trigger)
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

export default NetworkFilter

