
import { Box, Dialog, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo } from 'react'
import { useTheme } from '@mui/material/styles'
import { CheapIcon } from '../../utils/Svgs'

const WalletItem = (props) => {
    const {img, name, support, handleWallet} = props
    return (
        <Box sx={{width:1, height:150, 
                  borderRadius:5, border:'1px solid #e0e0e0', '&:hover':{borderColor:'#9e9e9e'},
                  boxSizing:'border-box',
                  cursor: support ? 'pointer': 'defaut',
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  alignItems:'center',
                  position:'relative'
                  }} onClick={ handleWallet ? handleWallet: ()=>{}}>
                    <Box
                        component='img'
                        sx={{width:70, height:70}}
                        alt={name}
                        src={`imgs/wallets/${img}`}
                    />
                    <Typography sx={{fontWeight:'bold'}}>{name}</Typography>
                    {!support && <Box>
                                    <Typography variant='body2' 
                                        sx={{backgroundColor:'black', py:0.5, px:1, 
                                        borderRadius:'0 20px 0 20px', 
                                        fontWeight:'bold', color:'white',
                                        position:'absolute',
                                        top:0,
                                        right:0
                                    }}>In coming</Typography>
                                </Box>}
                    

        </Box>
    )

}

const ConnectWallet = ({onClose, open, openSignup, notifyLoginUpdate}) => {
    console.log('ConnectWallet rendering ')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const handleClose = () => {
        onClose()
    }

    const handleWallet = () => {
        console.log('handleWallet')
        console.log('process wallet connecting ... in chrome extension')
        onClose()
        console.log('call restful api to check if there is an account associated with the current wallet')
        const isRegistered = false
        if (!isRegistered) {
            openSignup()
        } else {
            const user = {id: 111, name: 'JanessaTech lab'}
            localStorage.setItem('isConnected', 'true')
            localStorage.setItem('user', JSON.stringify(user))
            console.log('isConnected is set as true, notify header')
            notifyLoginUpdate()
        }
    }

  return (
    <Dialog
        sx={{'& .MuiPaper-root.MuiDialog-paper':{width:isSmallScreen ? 0.9: 0.5, height: 'fit-content', borderRadius:5}}} open={open}>
        <Box sx={{position:'relative', p:3}}>
            <Typography variant='h4'>Connect to wallet</Typography>
            <Typography color='text.secondary' variant='body2'>Securely connect your wallet to start your Web3 journey</Typography>
            <Tooltip title='Close'>
                  <IconButton onClick={handleClose} sx={{position:'absolute', top:10, right:10}}>
                    <CheapIcon name={'close'}/>
                  </IconButton>
            </Tooltip>
        </Box>
        <Box sx={{p:3,pt:0}}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='MetaMask' img='metamask.png' support={true} handleWallet={handleWallet}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='WalletConnect' img='walletcollect.png' support={false}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='Enjin' img='enjin.png' support={false}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='ZenGo' img='zengo.png' support={false}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='Trust Wallet' img='trustwallet.png' support={false}/>
                </Grid>
            </Grid>
        </Box>
    </Dialog>
  )
}

export default memo(ConnectWallet)

