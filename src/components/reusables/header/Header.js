import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {headerHeight} from '../../../common/constant'
import { CheapIcon } from '../../../utils/Svgs'

export default function Header() {
    const [search, setSearch] = useState('')

    const handleSearchChanges = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const resetSearch = (e) => {
        e.preventDefault()
        setSearch('')
    }
  return (
    <Box sx={{
        width: 1, height: headerHeight, 
        backgroundColor: 'black', 
        position: 'fixed', top: 0, left: 0, 
        px:3,
        boxSizing:'border-box',
        zIndex: (theme) => theme.zIndex.drawer + 1}}> 
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton href='#' sx={{pl:0}}>
                    <Avatar alt='Cheap' src='/imgs/handshake.svg' sx={{ width:60, height:60}}/>
                </IconButton>
                <Typography variant='h4' color='white'>Cheap</Typography>
            </Box>
            <Box>
                <Button variant='contained' sx={{textTransform:'none', fontSize:'1.2em'}}>Mint your own NFT</Button>
            </Box>
            <Box sx={{width:0.3}}>
                <TextField sx={{backgroundColor:'white', borderRadius:2,
                    '& .MuiOutlinedInput-root':{
                        '&.Mui-focused fieldset': {borderColor:'black', border:0},
                      }
                    }}
                    id="cheap-search-input" 
                    value={search}
                    variant="outlined" 
                    placeholder='Search'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CheapIcon name={'search'}/>
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position="end">
                                {
                                    search && search.length > 0 ?  
                                         <IconButton onClick={resetSearch}>
                                            <CheapIcon name={'cha'} size={30}/>
                                         </IconButton> :  <IconButton sx={{ '&.MuiButtonBase-root':{p:0.5, borderRadius:2, 
                                                                                                    backgroundColor:'action.hover'}
                                                                          }} disableRipple>
                                                                <CheapIcon name={'emap-line'} size={30}/>
                                                          </IconButton>
                                }
                            </InputAdornment>
                        )
                    }}
                    onChange={handleSearchChanges}
                >
                </TextField>
            </Box>
            <Box>
                <Button sx={{textTransform:'none', fontSize:'1.2em'}} variant='contained' color='unworkable'>Connect Wallet</Button>
            </Box>
        </Box>     
    </Box>
  )
}

