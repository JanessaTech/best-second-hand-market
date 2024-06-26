
import { Box, Dialog, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'
import WalletItem from './WalletItem'
import MetaMaskWallet from './MetaMaskWallet'
import {GetCurrentWalletProvider} from '../../utils/Wallet'
import { getABI, getERC20Contract, getExchange } from '../../utils/Chain'
import { ethers } from 'ethers'

const ConnectWallet = ({onClose, open, wallet, center, openSignup, notifyAlertUpdate, notifyWalletUpdate, notifyWalletAddressChange, notifyWalletNetworkChange}) => {
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
            logger.debug('[ConnectWallet] add handleNetworkChangeCheck, handleWalletBalance, handle_erc1115_mint, handle_erc1115_buy, handle_erc20_balanceOf, handle_erc20_mint, handle_erc20_transferInBatch to eventsBus in center')
            center.eventsBus.handleNetworkChangeCheck = handleNetworkChangeCheck
            center.eventsBus.handleWalletBalance = handleWalletBalance
            center.eventsBus.handle_erc1115_mint = handle_erc1115_mint
            center.eventsBus.handle_erc1115_buy = handle_erc1115_buy
            center.eventsBus.handle_erc1115_buyBatch = handle_erc1115_buyBatch
            center.eventsBus.handle_erc20_mint = handle_erc20_mint
            center.eventsBus.handle_erc20_balanceOf = handle_erc20_balanceOf
            center.eventsBus.handle_erc20_transferInBatch = handle_erc20_transferInBatch
            
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

    const handleNetworkChangeCheck = async (chainId) => {
        if (walletProvider) {
            try {
                const _chainId = await walletProvider.send('eth_chainId')
                const currentChainId = parseInt(_chainId.substring(2), 16)
                logger.debug('[ConnectWallet] The chainId your wallet is using is =', currentChainId, '. nft chainId is=', chainId)
                if (chainId !== currentChainId) {
                    notifyWalletNetworkChange(chainId)
                } else {
                    const signer = await walletProvider.getSigner()
                    const address = await signer.getAddress()
                    const balance = await walletProvider.getBalance(address)
                    const balanceInEth = ethers.formatEther(balance)
                    logger.debug('[ConnectWallet] Get balance for address ', address, ': ', balanceInEth)
                    center.call('notifyWalletNetworkChangeDone', {balance: balanceInEth})
                }
            } catch(e) {
                logger.debug('[ConnectWallet] failed to send eth_chainId due to', e)
            }
        }
    }

    const handleWalletBalance = async () => {
        logger.debug('handleWalletBalance')
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const address = await signer.getAddress()
            const balance = await walletProvider.getBalance(address)
            const balanceInEth = ethers.formatEther(balance)
            logger.debug('[ConnectWallet] Get balance for address ', address, ': ', balanceInEth)
            return balanceInEth
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to get balance from wallet')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc1115_mint = async (mintData) => {
        logger.debug('[ConnectWallet] handle_erc1115_mint. mintData =', mintData)
        const {chainId, address, ipfsURL} = mintData
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const from = await signer.getAddress()
            logger.debug("MetaMask is connected at ", ethers.getAddress(from))
            const abi = getABI(chainId, address)
            const contract = new ethers.Contract(address, abi, signer)
            const tx = await contract.mint(ethers.getAddress(from), ipfsURL)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after mint on erc1115:', tx)
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle mint call on erc1115')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc1115_buy = async (buyData) => {
        logger.debug('[ConnectWallet] handle_erc1115_buy. buyData =', buyData)
        const {chainId, address, from, ids} = buyData
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const to = await signer.getAddress()
            logger.debug("MetaMask is connected at ", ethers.getAddress(to))
            const abi = getABI(chainId, address)
            const contract = new ethers.Contract(address, abi, signer)
            const tx = await contract.buy(from, to, ids)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after buy on erc1115:', tx)
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle buy call on erc1115')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc1115_buyBatch = async (buyData) => {
        logger.debug('[ConnectWallet] handle_erc1115_buyBatch. buyData =', buyData)
        const {chainId, address, froms, idss} = buyData
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const to = await signer.getAddress()
            logger.debug("MetaMask is connected at ", ethers.getAddress(to))
            const abi = getABI(chainId, address)
            const contract = new ethers.Contract(address, abi, signer)
            const tx = await contract.buyBatch(froms, to, idss)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after buyBatch on erc1115:', tx)
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle buy call on erc1115')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc20_mint = async (value) => {
        logger.debug('[ConnectWallet] handle_erc20_mint. value =', value)
        if (walletProvider) {
            const signer = await walletProvider.getSigner()
            const _chainId = await walletProvider.send('eth_chainId')
            const currentChainId = parseInt(_chainId.substring(2), 16)
            logger.debug('[ConnectWallet] handle_erc20_mint. currentChainId =', currentChainId)
            const me = ethers.getAddress(await signer.getAddress())
            logger.debug('[ConnectWallet] mint by me =',me)
            const erc20Contract = getERC20Contract(currentChainId)
            const address = erc20Contract.address
            const abi  = erc20Contract.abi
            const erc20 = new ethers.Contract(address, abi, signer)
            const exchange = getExchange(currentChainId)
            logger.debug('[ConnectWallet] exchange =', exchange)
            const tokens = value * exchange
            logger.debug('[ConnectWallet] deposit tokens =', tokens)
            const options = {value: ethers.parseEther(`${value}`)}
            const tx = await erc20.mint(me, tokens, options)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after mint on erc20 :', tx)
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle erc20 mint')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc20_balanceOf = async () => {
        if (walletProvider) {
            logger.debug('[ConnectWallet] handle_erc20_balanceOf')
            const signer = await walletProvider.getSigner()
            const _chainId = await walletProvider.send('eth_chainId')
            const currentChainId = parseInt(_chainId.substring(2), 16)
            logger.debug('[ConnectWallet] handle_erc20_balanceOf. currentChainId =', currentChainId)
            const me = ethers.getAddress(await signer.getAddress())
            const erc20Contract = getERC20Contract(currentChainId)
            const address = erc20Contract.address
            const abi  = erc20Contract.abi
            const erc20 = new ethers.Contract(address, abi, signer)
            logger.debug('[ConnectWallet] get balance of me =',me)
            const balance  = await erc20.balanceOf(me)
            return balance
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle balanceOf on erc20 ')
            throw new Error('walletProvider is not found')
        }
    }

    const handle_erc20_transferInBatch = async (transferData) => {
        logger.debug('[ConnectWallet] handle_erc20_transferInBatch. transferData =', transferData)
        if (walletProvider) {
            const {tos, values} = transferData
            const signer = await walletProvider.getSigner()
            const _chainId = await walletProvider.send('eth_chainId')
            const currentChainId = parseInt(_chainId.substring(2), 16)
            logger.debug('[ConnectWallet] handle_erc20_transferInBatch. currentChainId =', currentChainId)
            const erc20Contract = getERC20Contract(currentChainId)
            const address = erc20Contract.address
            const abi  = erc20Contract.abi
            const erc20 = new ethers.Contract(address, abi, signer)
            const tx = await erc20.transferInBatch(tos, values)
            await tx.wait() //waiting for receipt 
            logger.info('Tx after transferInBatch on erc20 :', tx)
        } else {
            logger.error('[ConnectWallet] walletProvider is not found when we are about to handle erc20 mint')
            throw new Error('walletProvider is not found')
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

