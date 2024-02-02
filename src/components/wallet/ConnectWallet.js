
import { Box, Dialog, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'
import {BACKEND_ADDR} from '../../common/constant'
import { BrowserProvider } from 'ethers'
import { SiweMessage } from 'siwe'

const domain = window.location.host
const origin = window.location.origin

const getNonce = async () => {
    const rawResponse = await fetch(`${BACKEND_ADDR}/apis/v1/siwe/nonce`, {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    })
    const content = await rawResponse.json();
    console.log(content);
    return content?.data?.nonce
  }

  const verify = async (data) => {
    const rawResponse = await fetch(`${BACKEND_ADDR}/apis/v1/siwe/verify`, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const content = await rawResponse.json();
    console.log(content);
    return content?.data?.verify
  }

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
                        src={`/imgs/wallets/${img}`}
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

const ConnectWallet = ({onClose, open, walletTrigger, openSignup, notifyUserUpdate, notifyAlertUpdate}) => {
    logger.debug('[ConnectWallet] rendering ')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const [provider, setProvider] = useState(undefined)
    const [isWalletLogin, setIsWalletLogin] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const [sig, setSig] = useState('')

    useEffect(() => {
        logger.debug('[ConnectWallet] useEffect')
        if (provider && isWalletLogin && !signIn) {
            signInWithEthereum()
            .then((response) => {
                const {verified, signature} = response
                if (!verified) {
                    notifyAlertUpdate([{severity: 'error', message: 'Failed to Sign in, Please sign in again'}])
                } else {
                    setSignIn(true)
                    setSig(signature)
                } 
            })
            .catch((e) => {
                if (e?.info?.error?.code === 4001) {
                    notifyAlertUpdate([{severity: 'error', message: 'Please click Sign in'}])
                } else {
                    notifyAlertUpdate([{severity: 'error', message: 'Refesh page and try again'}])
                }
            })
        }
        if (signIn) {
            onClose()
            logger.info('[ConnectWallet] call restful api to check if there is an account associated with the current wallet')
            const isRegistered = false
            if (!isRegistered) {
                openSignup()
            } else {
                // login by wallet address
                const user = {id: 111, name: 'JanessaTech lab'}
                localStorage.setItem('user', JSON.stringify(user))
                logger.info('user is set as ', user, 'notify header')
                notifyUserUpdate()
            }
        }
    }, [provider, isWalletLogin, signIn])

    useEffect(() => {
        logger.debug('[ConnectWallet] disconnect wallet in useEffect')
        setSignIn(false)
        setIsWalletLogin(false)
        setProvider(undefined)
    }, [walletTrigger])

    const handleClose = () => {
        onClose()
    }

    const isMetaMaskAvailable = () => {
        let alerts = []
        let vail = false
        if (window?.ethereum) {
            if (window.ethereum?.isMetaMask) {
                logger.debug('[ConnectWallet] MetaMask is active')
                vail = true
            } else {
                logger.debug('[ConnectWallet] MetaMask is not available')
                alerts.push({severity: 'error', message: 'MetaMask is not available'})
            }

        }   else {
            logger.debug('[ConnectWallet] Ethereum support is not found')
            alerts.push({severity: 'error', message: 'Ethereum support is not found'})
        }
        if (alerts.length > 0) {
            logger.debug('[ConnectWallet] sending alerts = ', alerts)
            notifyAlertUpdate(alerts)
        }
        return vail
    }

    const handleMetaMask = () => {
        const metaMaskAvailable = isMetaMaskAvailable()
        if (metaMaskAvailable) {
            logger.debug('[ConnectWallet] handleMetaMask metamask is available')
            const newProvider = new BrowserProvider(window.ethereum)
            newProvider.send('eth_requestAccounts', [])
            .then((response) => {
                logger.debug('[ConnectWallet] handleMetaMask response=', response)
                setIsWalletLogin(true)
            })
            .catch((e) => {
                if (e?.error?.code === -32002) {
                    notifyAlertUpdate([{severity: 'error', message: 'Please login MetaMask in browser extension'}])
                } else {
                    notifyAlertUpdate([{severity: 'error', message: e?.error?.message}])
                }
            })
            setProvider(newProvider)
        }
    }

    const createSiweMessage = async(address, statement, chainId) => {
        const nonce = await getNonce()
        console.log(`a new nonce : ${nonce} in createSiweMessage`)
        const siweMessage = new SiweMessage({
          domain,
          address,
          statement,
          uri: origin,
          version: '1',
          chainId: Number(chainId)
        })
        return siweMessage.prepareMessage()
    }

    const signInWithEthereum = async () => {
        logger.debug('[ConnectWallet] signInWithEthereum')
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        const statement = 'Sign in with Ethereum to the app.'
        const network  = await provider.getNetwork()
        logger.debug('[ConnectWallet] signInWithEthereu. network:', network)
        const chainId = (await provider.getNetwork()).chainId
        logger.debug('[ConnectWallet] signInWithEthereu. address=', address)
        logger.debug('[ConnectWallet] signInWithEthereu. chainId=', chainId)
        const message = await createSiweMessage(address, statement, chainId)
        logger.debug(message)
        const signature = await signer.signMessage(message)
        logger.debug("[ConnectWallet] signInWithEthereu. signature:", signature)
        const verified = await verify({message: message, signature: signature})
        logger.debug('[ConnectWallet] signInWithEthereu. verified:', verified)
        return {'verified': verified, 'signature': signature}
    }

    const handleWallet = (type) => () => {
        logger.debug('[ConnectWallet] handleWallet. wallet type=', type)
        if (type === 'metamask') {
            handleMetaMask()
        } else {
            // handle other wallets here
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
                    <WalletItem name='MetaMask' img='metamask.png' support={true} handleWallet={handleWallet('metamask')}/>
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

