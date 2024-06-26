import { Avatar, Badge, Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight} from './constant'
import { CheapIcon } from '../utils/Svgs'
import useMediaQuery from '@mui/material/useMediaQuery'
import ProfileMenu from '../components/profile/ProfileMenu'
import { useNavigate, useSearchParams } from 'react-router-dom'
import logger from './Logger'
import config from '../config'

const Header = ({openCart, wallet, center, notifyWalletOpen, notifyWalletUpdate, notifyAlertUpdate}) => {
    logger.debug('[Header] rendering...')
    logger.debug('[Header] wallet:', wallet)
    const theme = useTheme()
    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [anchorEl, setAnchorEl] =  React.useState(null)

    useEffect(() => {
        const search = searchParams.get('search')
        logger.debug('[Header] useEffect search=', search)
        if(!search) {
            setSearch('')
        } else {
            setSearch(search)
        }
        
    }, [searchParams])
    
    const handleSearchChanges = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        logger.debug('[Header] search=', search)
        if (search && search.length > 0) {
            localStorage.removeItem('filter')
            center.call('notifyFilterMenuReset')
            navigate(`/results?search=${search}`)
        }
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

    const handleProfileMenuClose = useCallback(() => {
        setAnchorEl(null);
    },[anchorEl])

    const handleMintBut = () => {
        if (wallet) {
        logger.info('[Header] handleMintBut. go to to /profile/mint')
            navigate('/profile/mint2')
        } else {
            notifyWalletOpen()
        }
    }

    const goHome = () => {
        localStorage.removeItem('filter')
        center.call('notifyFilterMenuReset')
        navigate('/')
        center.call('notifyFilterUpdate')
    }

   return (
     <Box sx={{
        width: 1, height: HeaderHeight, 
        backgroundColor: 'black', 
        position: 'fixed', top: 0, left: 0, 
        px: isSmallScreen ? 2: 3,
        boxSizing:'border-box',
        zIndex: (theme) => theme.zIndex.drawer + 1}}> 
         <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
             <Box sx={{display: 'flex', alignItems: 'center'}}>
                 <IconButton sx={{pl:0}} onClick={goHome}>
                     <Avatar alt='Cheap' src='/imgs/header/handshake.svg' sx={{ width:60, height:60}}/>
                 </IconButton>
                 <Typography variant='h4' color='white' sx={{[theme.breakpoints.down('md')]:{display:'none'}}}>Cheap</Typography>
             </Box>
             <Box>
                 <Button 
                     variant='contained' 
                     sx={{textTransform:'none', fontSize:'1.2em',
                      [theme.breakpoints.down('md')]:{display:'none'}}}
                     onClick={handleMintBut}
                      >Mint a NFT</Button>
             </Box>
             <Box sx={{width: isMediumScreen? 0.6:0.4, display: 'flex', alignItems: 'center'}}>
                 <TextField sx={{backgroundColor:'white', borderRadius:2,
                     '& .MuiOutlinedInput-root':{
                         '&.Mui-focused fieldset': {borderColor:'black', border:0},
                       }
                     }}
                     id="cheap-search-input" 
                     value={search}
                     variant="outlined" 
                     placeholder='Explore more nfts'
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
                <Tooltip title='Search'>
                    <Button sx={{textTransform:'none', fontSize:'1.1em', 
                                ml:1, height:56, '&.MuiButtonBase-root':{px:1}
                                }} 
                            variant='contained'
                            onClick={handleSearch}
                            >Go</Button>
                </Tooltip>
                
            </Box>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                {
                    wallet ? <Box sx={{display:'flex', alignItems: 'center'}}>
                    <Box sx={{[theme.breakpoints.down('md')]:{display:'none'}, cursor: 'pointer', mr:1}}>
                        <Typography sx={{width:83}} color={'white'} variant='subtitle1'>Connected</Typography>
                    </Box>
                    <IconButton 
                            sx={{'&:hover':{backgroundColor:'grey'}, p:0}}
                            id='profile-positioned-button'
                            aria-controls={isProfileOpen ? 'profile-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isProfileOpen ? 'true' : undefined}
                            onClick={handleProfileMenuOpen}
                            >
                                <Avatar alt={wallet?.user?.name} src={`${config.BACKEND_ADDR}/${wallet?.user?.profile}`}/>
                    </IconButton>
                    
                    <ProfileMenu 
                            wallet={wallet} 
                            anchorEl={anchorEl} 
                            open={Boolean(anchorEl)} 
                            center={center}
                            handleProfileMenuClose={handleProfileMenuClose}
                            notifyWalletUpdate={notifyWalletUpdate}
                            notifyAlertUpdate={notifyAlertUpdate}
                            />
                            
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
                </Box>  : 
                    isMediumScreen ? <Tooltip title="Connect to wallet">
                                        <IconButton onClick={notifyWalletOpen}>
                                            <CheapIcon name={'connect-wallet'}/>
                                        </IconButton>
                                    </Tooltip> : 
                                    <Button sx={{textTransform:'none', fontSize:'1.1em'}} variant='contained' color='unworkable' onClick={notifyWalletOpen}>Connect Wallet</Button>
                }
            </Box>
        </Box>     
     </Box>
   )
}

export default memo(Header)

