
import logger from "../common/Logger"
import {ethers, BrowserProvider} from 'ethers'
import {user as userClient} from '../utils/serverClient'

const getMetaMaskWallet = async () => {
    if (window?.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            const account = await handleMetaMaskAccounts(accounts)
            const wallet = await getUserByWalletAddress(account)
            return wallet
        } catch (e) {
            logger.error('[Utils - MetaMask] getMetaMaskWallet. error ', e) 
            throw e
        }
    } else {
        throw new Error('Metamask is not installed')
    }
}

const handleMetaMaskAccounts = async (accounts) => {
    if (!accounts || accounts.length === 0) throw new Error('Metamask is not logined')
    return accounts[0]
}

const getUserByWalletAddress = async (account) => {
    logger.debug('[Utils - wallet] getUserByWalletAddress. call restful api to get user by address =', ethers.getAddress(account))
    const registedUser = await userClient.findUserByAddress(ethers.getAddress(account))
    logger.debug('[Utils - wallet] getUserByWalletAddress. registedUser =', registedUser)
    return {address: ethers.getAddress(account), user: registedUser}
}

const GetCurrentWallet = async () => {
    const login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : undefined
    logger.debug('[Utils - wallet] GetCurrentWallet. login = ', login)
    const walletType = login?.walletType
    const user = login?.user
    console.log('[Utils - wallet] GetCurrentWallet  walletType=', walletType)

    if (walletType && user) {
        try {
            switch(walletType) {
                case 'metamask':
                    const wallet = await getMetaMaskWallet()
                    if (wallet.user.id !== user.id) return undefined
                    return wallet
                default:
                    throw new Error('Support metamask only')
            }
        } catch (e) {
            throw e
        }
    } else {
        throw new Error('Cannot find login in localStorage or login does not have user')  // we shouldn't expose the error msg to user
    }
}

const GetCurrentWalletProvider = () => {
    const login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : undefined
    const walletType = login?.walletType
    const user = login?.user
    console.log('[Utils - wallet] GetCurrentWalletProvider  walletType=', walletType)
    if (walletType && user) {
        switch(walletType) {
            case 'metamask':
                return new BrowserProvider(window.ethereum)
            default:
                return undefined
        }
    }
}

export {GetCurrentWallet, GetCurrentWalletProvider}