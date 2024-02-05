
import { Box, Dialog, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'
import WalletItem from './WalletItem'
import MetaMaskWallet from './MetaMaskWallet'
import {ethers} from 'ethers'

const ConnectWallet = ({onClose, open, wallet, walletTrigger, openSignup, notifyAlertUpdate, notifyWalletUpdate, notifyWalletAddressChange}) => {
    logger.debug('[ConnectWallet] rendering ')
    logger.debug('[ConnectWallet] wallet=',wallet)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        if (window.ethereum) {
            logger.debug('[ConnectWallet] add handleWalletAddressChanged to monitor the change of wallet address')
            window.ethereum.on('accountsChanged', handleWalletAddressChanged)
        }
        return () => {
            if(window.ethereum) { 
                logger.debug('[ConnectWallet] remove handleWalletAddressChanged')
                window.ethereum.removeListener('accountsChanged', handleWalletAddressChanged);
            }
        }
    }, [wallet])

    const handleWalletAddressChanged = (accounts) => { 
        logger.debug('[MetaMaskWallet] handleWalletAddressChanged. wallet=', wallet)
        const normalizedAccounts = accounts.map((a) => ethers.getAddress(a))
        logger.debug('[MetaMaskWallet] handleWalletAddressChanged normalizedAccounts', normalizedAccounts)
        if (wallet) { //
            notifyWalletAddressChange()
        }
    }

    const handleClose = () => {
        onClose()
    }

  return (
    <Dialog
        sx={{'& .MuiPaper-root.MuiDialog-paper':{width:isSmallScreen ? 0.9: 0.5, height: 'fit-content', borderRadius:5}}} 
        open={open} 
        disableScrollLock={true}>
        <Box sx={{position:'relative', p:3}}>
            <Typography variant='h4'>Connect to wallet</Typography>
            <Typography color='text.secondary' variant='body2'>Securely connect your wallet to start your Web3 journey</Typography>
            <Tooltip title='Close'>
                  <IconButton onClick={handleClose} sx={{position:'absolute', top:2, right:5}}>
                    <CheapIcon name={'close'}/>
                  </IconButton>
            </Tooltip>
        </Box>
        <Box sx={{p:3,pt:0}}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <MetaMaskWallet 
                        onClose={onClose} 
                        walletTrigger={walletTrigger} 
                        openSignup={openSignup} 
                        notifyAlertUpdate={notifyAlertUpdate} 
                        notifyWalletUpdate={notifyWalletUpdate}
                        notifyWalletAddressChange={notifyWalletAddressChange}
                        />
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

