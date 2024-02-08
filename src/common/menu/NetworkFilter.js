import { Box, FormControl, InputAdornment, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../Logger'
import {capitalize} from '../../utils/StringUtils'
import {networks, getChainName} from '../../utils/Chain'

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

function getNetworkFromLocalStorage() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    filter = JSON.parse(filter)
    if (!filter.chainId){
      filter.chainId = networks()[0].chainId
    }
  } else {
    filter = {chainId: networks()[0].chainId}
  }
  localStorage.setItem('filter', JSON.stringify(filter))

  logger.debug('[NetworkFilter] getNetworkFromLocalStorage. filter.chainId=', filter.chainId)
  return filter.chainId
}
// codes below should be refactored into CustomSelect.js later on
const NetworkFilter = ({notify, refresh}) => {
    logger.debug('[NetworkFilter] rendering...')
    const theme = useTheme()
    const [network, setNetwork] = useState(getNetworkFromLocalStorage())
    
    useEffect(() => {
      logger.debug('[NetworkFilter] filter is refreshed')
      setNetwork(getNetworkFromLocalStorage())
    },[refresh])

    const handleNetworkChange = (e) => {
      logger.debug('[NetworkFilter] handleNetworkChange. e?.target?.value=', e?.target?.value)
      setNetwork(e.target.value)
      let filter = localStorage.getItem('filter')
      if (filter) {
        filter = JSON.parse(filter)
        filter.chainId = e.target.value
      } else {
        filter = {chainId: e.target.value}
      }
      localStorage.setItem('filter', JSON.stringify(filter))
      logger.info('[NetworkFilter] handleNetworkChange. store filter:', filter)
      const trigger = Math.random()
      notify(trigger)
    }

    console.log('[NetworkFilter] chainId = ', network)

  return (
    <Box sx={{mt:2, mb:3}}>
        <FormControl sx={{width: 200 }}>
            <Select
            label="network-type-option"
            value={network}
            onChange={handleNetworkChange}
            renderValue={(p) => (capitalize(getChainName(p)))}
            input={
            <OutlinedInput 
                size="small" 
                startAdornment={
                <InputAdornment position="start">
                    <CheapIcon name={getChainName(network)}/>
                </InputAdornment>
                }
                />}
            MenuProps={MenuProps}
            >
            {
                    networks().map((network) => (
                        <MenuItem
                            key={network.chainId}
                            value={network.chainId}
                        >
                            <ListItemIcon>
                                <CheapIcon name={network.chainName}/>
                            </ListItemIcon>
                            <ListItemText>{capitalize(network.chainName)}</ListItemText>
                        </MenuItem>
                    ))
                }    

            </Select>
        </FormControl>
    </Box>
  )
}

export default NetworkFilter

