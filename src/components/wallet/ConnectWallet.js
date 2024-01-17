
import { Box, Dialog, DialogTitle, Divider, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { memo } from 'react'
import { useTheme } from '@mui/material/styles'

const WalletItem = (props) => {
    const {img, name, support} = props
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
                  }}>
                    <Box
                        component='img'
                        sx={{width:70, height:70}}
                        alt={name}
                        src={`imgs/wallets/${img}`}
                    />
                    <Typography sx={{fontWeight:'bold'}}>{name}</Typography>
                    {!support && <Box>
                                    <Typography variant='body2' 
                                        sx={{backgroundColor:'red', py:0.5, px:1, 
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

const ConnectWallet = (props) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const {onClose, open, ...others} = props

    const handleClose = () => {
        onClose()
    }

  return (
    <Dialog
        sx={{'& .MuiPaper-root.MuiDialog-paper':{width:isSmallScreen ? 0.9: 0.5, height: 'fit-content', borderRadius:5}}}
        onClose={handleClose} open={open}
    >
        <DialogTitle>
            <Typography variant='h4'>Connect wallet</Typography>
            <Typography color='text.secondary' variant='body2'>Securely connect your wallet to start your Web3 journey</Typography>
        </DialogTitle>
        <Box sx={{p:3}}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='MetaMask' img='metamask.png' support={true}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='WalletConnect' img='walletcollect.png' support={false}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} support={true}>
                    <WalletItem name='MetaMask' img='metamask.png' support={true}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='WalletConnect' img='walletcollect.png' support={false}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <WalletItem name='WalletConnect' img='walletcollect.png' support={false}/>
                </Grid>
            </Grid>
        </Box>
    </Dialog>
  )
}

export default memo(ConnectWallet)

