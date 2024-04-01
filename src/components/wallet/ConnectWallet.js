
import { Box, Dialog, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'
import WalletItem from './WalletItem'
import MetaMaskWallet from './MetaMaskWallet'
import {GetCurrentWalletProvider} from '../../utils/Wallet'
import { getABI } from '../../utils/Chain'
import { ethers } from 'ethers'

const ConnectWallet = ({onClose, open, wallet, eventsBus, openSignup, notifyAlertUpdate, notifyWalletUpdate, notifyWalletAddressChange, notifyWalletNetworkChange, notifyWalletNetworkChangeDone, notifyMintDone}) => {
    logger.debug('[ConnectWallet] rendering ')
    logger.debug('[ConnectWallet] wallet=',wallet)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const [walletProvider, setWalletProvider] = useState(undefined)

    useEffect(() => {
        if (window.ethereum) {
            logger.debug('[ConnectWallet] add handleWalletAddressChanged to monitor the change of wallet address')
            window.ethereum.on('accountsChanged', handleWalletAddressChanged)
        }
        if (wallet) {
            const provider = GetCurrentWalletProvider()
            if (provider) {
                logger.debug('[ConnectWallet] useEffect. setWalletProvider in case signup or refresh page')
                setWalletProvider(provider)
            }
        }
        return () => {
            if(window.ethereum) { 
                logger.debug('[ConnectWallet] remove handleWalletAddressChanged')
                window.ethereum.removeListener('accountsChanged', handleWalletAddressChanged);
            }
        }
    }, [wallet])
    
    useEffect(() => {
        if (walletProvider) {
            logger.debug('[ConnectWallet] add networkCheckAndBuy and handleMintCall to eventsBus')
            eventsBus.networkCheckAndBuy = networkCheckAndBuy
            eventsBus.handleMintCall = handleMintCall
        }
    }, [walletProvider])

    const handleWalletAddressChanged = (accounts) => { 
        logger.debug('[ConnectWallet] handleWalletAddressChanged. wallet=', wallet)
        if (wallet) { 
            notifyWalletAddressChange()
        }
    }

    const handleClose = () => {
        onClose()
    }

    const handleBuy = (chainId, nftIds, prices) => {
        logger.debug(`[ConnectWallet] handleBuy. chainId=${chainId}, nftIds=${nftIds}, prices=${prices}`)
    }

    const networkCheckAndBuy = async (chainId, nftIds, prices) => {
        if (walletProvider) {
            try {
                const _chainId = await walletProvider.send('eth_chainId')
                const currentChainId = parseInt(_chainId.substring(2), 16)
                logger.debug('[ConnectWallet] The chainId your wallet is using is =', currentChainId, '. nft chainId is=', chainId)
                if (chainId !== currentChainId) {
                    notifyWalletNetworkChange(chainId)
                } else {
                    notifyWalletNetworkChangeDone()
                    // if (nftIds && prices && nftIds.length > 0 && prices.length > 0) {
                    //     handleBuy(chainId, nftIds, prices)
                    // }
                }
            } catch(e) {
                logger.debug('[ConnectWallet] failed to send eth_chainId due to', e)
            }
        }
    }

    const handleMintCall = async (mintData) => {
        logger.debug('[ConnectWallet] handleMintCall. mintData =', mintData)
        const {chainId, address, ipfsURL} = mintData
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const from = await signer.getAddress()
            logger.debug("MetaMask is connected at ", ethers.getAddress(from))
            const abi = getABI(chainId, address)
            const contract = new ethers.Contract(address, abi, signer)
            const tx = await contract.mint(ethers.getAddress(from), ipfsURL)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after mint:', tx)
            notifyMintDone()
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle mint call')
            notifyAlertUpdate([{severity: 'error', message: 'No walletProvider. Please refresh page and try again'}])
        }
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
                        openSignup={openSignup} 
                        notifyAlertUpdate={notifyAlertUpdate} 
                        notifyWalletUpdate={notifyWalletUpdate}
                        setWalletProvider={setWalletProvider}
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

