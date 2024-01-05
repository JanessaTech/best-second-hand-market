import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import {headerHeight} from '../../../common/constant'
import { CheapIcon } from '../../../utils/Svgs'

export default function Header() {
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
                <TextField sx={{backgroundColor:'white', borderRadius:3}}
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
                                <IconButton sx={{ 
                                    '&.MuiButtonBase-root':{
                                        p:0.5, borderRadius:2, backgroundColor:'action.hover'}
                                    }} disableRipple>
                                    <CheapIcon name={'emap-line'} size={20}/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                >
                </TextField>
            </Box>
            <Box sx={{ width:300, height:76, backgroundColor:'yellow'}}></Box>
        </Box>     
    </Box>
  )
}

