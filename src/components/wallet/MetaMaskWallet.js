import React, { useEffect, useState } from 'react'
import WalletItem from './WalletItem'
import logger from '../../common/Logger'
import { BrowserProvider, ethers } from 'ethers'
import { SiweMessage } from 'siwe'
import config from '../../config'
import {user as userClient} from '../../utils/serverClient'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

const domain = window.location.host
const origin = window.location.origin

class NetworkError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkError';
    }
}

class JsonError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JsonError';
    }
}

const getNonce = async () => {
    try {
        const rawResponse = await fetch(`${config.BACKEND_ADDR}/apis/v1/siwe/nonce`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
          })
          logger.debug('[MetaMaskWallet] rawResponse=', rawResponse)
          const content = await rawResponse.json()
          if (!content?.success) {
            throw new JsonError(content?.message)
          }
          logger.debug('[MetaMaskWallet] getNonce ', content)
          return content?.data?.nonce
    } catch(e) {
        if ( e instanceof JsonError) {
            throw e
        } else {
            throw new NetworkError('Failed to get nonce, please check network')
        }   
    }
  }

  const verify = async (data) => {
    try {
        const rawResponse = await fetch(`${config.BACKEND_ADDR}/apis/v1/siwe/verify`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        const content = await rawResponse.json()
        if (!content?.success) {
            throw new JsonError(content?.message)
        }
        logger.debug('[MetaMaskWallet] verify ',content)
        return content?.data?.verify
    } catch(e) {
        if ( e instanceof JsonError) {
            throw e
        } else {
            throw new NetworkError('Failed to verify signature, please check network')
        }
    }
  }

export default function MetaMaskWallet({onClose, openSignup, notifyAlertUpdate, notifyWalletUpdate, setWalletProvider}) {
    logger.debug('[MetaMaskWallet] rendering ...')
    const [provider, setProvider] = useState(undefined)
    const [isWalletLogin, setIsWalletLogin] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const [address, setAddress] = useState('')

    useEffect(() => {
        logger.debug('[MetaMaskWallet] useEffect. Call signInWithEthereum')
        if (provider && isWalletLogin && !signIn) {
            signInWithEthereum()
            .then((response) => {
                const {verified, signature, addr} = response
                if (!verified) {
                    notifyAlertUpdate([{severity: 'error', message: 'Failed to Sign in, Please sign in again'}])
                } else {
                    setSignIn(true)
                    setAddress(addr)
                    logger.debug('[MetaMaskWallet]  setWalletProvider')
                    setWalletProvider(provider)
                } 
            })
            .catch((e) => {
                logger.debug('[MetaMaskWallet] failed to sigin due to ', e)
                if (e?.info?.error?.code === 4001) {
                    notifyAlertUpdate([{severity: 'error', message: 'Please click Sign in'}])
                } else if (e instanceof NetworkError || e instanceof JsonError) {
                    notifyAlertUpdate([{severity: 'error', message: e?.message}])
                } else {
                    notifyAlertUpdate([{severity: 'error', message: 'Refresh page and try again'}])
                }
            })
        }
        if (signIn) {
            logger.debug('[MetaMaskWallet] call restful api to check if there is an account associated with the current wallet address=', address)
            userClient.loginByAddress(address)
            .then((loginedUser) => {
                if (!loginedUser) {
                    throw new Error('Failed to login. Please try again') // code shouldn't hit here. it is a bug if it did
                }
                // get logined user by login using wallet address
                logger.debug(messageHelper.getMessage('metamask_get_logined_user_success', 'MetaMaskWallet', address, loginedUser))
                const newWallet = {address: address, user: loginedUser}
                const login = {'walletType' : 'metamask', user: loginedUser, address: address}
                localStorage.setItem('login', JSON.stringify(login)) 
                onClose()
                notifyWalletUpdate(newWallet)
                notifyAlertUpdate([{severity: 'success', message: 'Login successfully'}])
            })
            .catch((err) => {
                if (err?.response?.data?.code === 404) {
                    // we hit here in case there is no user associated with the address
                    logger.debug(messageHelper.getMessage('metamask_user_not_found', 'MetaMaskWallet', address))
                    const login = {'walletType' : 'metamask', address: address}
                    localStorage.setItem('login', JSON.stringify(login))
                    onClose()
                    openSignup()
                } else {
                    /**
                     *  we hit here in 2 cases:
                     *  1. network issue
                     *  2. backend internal issue like validation issue which should be bugs we need to fix
                     *  */
                    logger.error('Failed to login by address ', address)
                    logger.error(err)
                    let errMsg = ''
                    if (err?.response?.data?.message) {
                        errMsg = err?.response?.data?.message
                    } else {
                        errMsg = err?.message
                    }
                    notifyAlertUpdate([{severity: 'error', message: errMsg}])
                }
            })
        }
    }, [provider, isWalletLogin, signIn])
    
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
        logger.debug('[MetaMaskWallet] signInWithEthereum')
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        const normalizedAddress = ethers.getAddress(address)
        const statement = config.SignInEth
        const network  = await provider.getNetwork()
        logger.debug('[MetaMaskWallet] signInWithEthereu. network:', network)
        const chainId = (await provider.getNetwork()).chainId
        logger.debug('[MetaMaskWallet] signInWithEthereu. address=', address)
        logger.debug('[MetaMaskWallet] signInWithEthereu. normalizedAddress=', normalizedAddress)
        logger.debug('[MetaMaskWallet] signInWithEthereu. chainId=', chainId)
        const message = await createSiweMessage(normalizedAddress, statement, chainId)
        logger.debug(message)
        const signature = await signer.signMessage(message)
        logger.debug("[MetaMaskWallet] signInWithEthereu. signature:", signature)
        const verified = await verify({message: message, signature: signature})
        logger.debug('[MetaMaskWallet] signInWithEthereu. verified:', verified)
        return {'verified': verified, 'signature': signature, 'addr': normalizedAddress}
    }

    const isMetaMaskAvailable = () => {
        let alerts = []
        let vail = false
        if (window?.ethereum) {
            if (window.ethereum?.isMetaMask) {
                vail = true
            } else {
                alerts.push({severity: 'error', message: 'MetaMask is not available'})
            }

        } else {
            alerts.push({severity: 'error', message: 'Ethereum support is not found'})
        }
        if (alerts.length > 0) {
            logger.debug('[MetaMaskWallet] sending alerts = ', alerts)
            notifyAlertUpdate(alerts)
        }
        return vail
    }

    const handleMetaMask = () => {
        const metaMaskAvailable = isMetaMaskAvailable()
        if (metaMaskAvailable) {
            logger.debug('[MetaMaskWallet] handleMetaMask metamask is available')
            const newProvider = new BrowserProvider(window.ethereum)
            newProvider.send('eth_requestAccounts', [])
            .then((response) => {
                logger.debug('[MetaMaskWallet] handleMetaMask response=', response)
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
        } else {
            notifyAlertUpdate([{severity: 'error', message: 'Please intall MetaMask'}])
        }
    }

  return (
    <WalletItem name='MetaMask' img='metamask.png' support={true} handleWallet={handleMetaMask}/>
  )
}

