import { Avatar, Badge, Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import {headerHeight} from '../../../common/constant'
import { CheapIcon } from '../../../utils/Svgs'
import useMediaQuery from '@mui/material/useMediaQuery'
import ProfileMenu from '../../profile/ProfileMenu';

export default function Header({openCart}) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [search, setSearch] = useState('')
    const [isLogin, setIsLogin]  = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [anchorEl, setAnchorEl] =  React.useState(null)

    const handleSearchChanges = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const resetSearch = (e) => {
        e.preventDefault()
        setSearch('')
    }

    const handleCart = (e) => {
        e.preventDefault()
        openCart()
    }

    const handleProfileMenuOpen = (e) => {
        if (anchorEl !== e.currentTarget) {
            setAnchorEl(e.currentTarget);
        } 
    }
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    }


  return (
    <Box sx={{
        width: 1, height: headerHeight, 
        backgroundColor: 'black', 
        position: 'fixed', top: 0, left: 0, 
        px: isSmallScreen ? 2: 3,
        boxSizing:'border-box',
        zIndex: (theme) => theme.zIndex.drawer + 1}}> 
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton href='#' sx={{pl:0}}>
                    <Avatar alt='Cheap' src='/imgs/handshake.svg' sx={{ width:60, height:60}}/>
                </IconButton>
                <Typography variant='h4' color='white' sx={{[theme.breakpoints.down('md')]:{display:'none'}}}>Cheap</Typography>
            </Box>
            <Box>
                <Button variant='contained' sx={{textTransform:'none', fontSize:'1.2em', [theme.breakpoints.down('md')]:{display:'none'}}}>Mint your NFT</Button>
            </Box>
            <Box sx={{width: isSmallScreen? 0.7:0.4, display: 'flex', alignItems: 'center'}}>
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
                            <InputAdornment position="start" sx={{[theme.breakpoints.down('sm')]:{display:'none'}}}>
                                <CheapIcon name={'search'}/>
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position="end">
                                {
                                    search && search.length > 0 ?  
                                         <IconButton onClick={resetSearch} sx={{[theme.breakpoints.down('sm')]:{display:'none'},}}>
                                            <CheapIcon name={'cha'} size={30}/>
                                         </IconButton> :  <IconButton sx={{ 
                                                                         [theme.breakpoints.down('sm')]:{display:'none'},
                                                                        '&.MuiButtonBase-root':{p:0.5, borderRadius:2, 
                                                                                                    backgroundColor:'action.hover'}
                                                                          }} disableRipple>
                                                                <CheapIcon name={'forward-slash'} size={25}/>
                                                          </IconButton>
                                }
                            </InputAdornment>
                        )
                    }}
                    onChange={handleSearchChanges}
                >
                </TextField>
                <Button sx={{textTransform:'none', fontSize:'1.1em', ml:1, height:56, '&.MuiButtonBase-root':{px:1}}} variant='contained'>Go</Button>
            </Box>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                {
                    isLogin ? <Box sx={{display:'flex', alignItems: 'center'}}>
                    <Box sx={{[theme.breakpoints.down('md')]:{display:'none'}, cursor: 'pointer', mr:1}}>
                        <Typography color={'white'} variant='subtitle1'>Connected</Typography>
                    </Box>
                    <IconButton 
                        sx={{'&:hover':{backgroundColor:'grey'}}}
                        id='profile-positioned-button'
                        aria-controls={isProfileOpen ? 'profile-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isProfileOpen ? 'true' : undefined}
                        onMouseOver={handleProfileMenuOpen}
                        onClick={handleProfileMenuOpen}
                        >
                            <CheapIcon name={'profile'}/>
                    </IconButton>
                    
                    <ProfileMenu anchorEl={anchorEl} open={Boolean(anchorEl)} handleProfileMenuClose={handleProfileMenuClose}/>
                    <IconButton sx={{
                        [theme.breakpoints.down('md')]:{display:'none'},
                        '&:hover':{backgroundColor:'grey'}
                        }} onClick={handleCart}>
                        <CheapIcon name={'cart'}/>
                    </IconButton>
                    <IconButton sx={{
                        [theme.breakpoints.down('lg')]:{display:'none'},
                        '&:hover':{backgroundColor:'grey'}
                        }}>
                        <Badge badgeContent={4} color="primary">
                            <CheapIcon name={'notification'}/>
                        </Badge>
                    </IconButton>     
                </Box>  : <Button sx={{textTransform:'none', fontSize:'1.1em'}} variant='contained' color='unworkable'>Connect Wallet</Button>
                }
            </Box>
        </Box>     
    </Box>
  )
}

