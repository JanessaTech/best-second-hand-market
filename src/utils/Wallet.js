
import logger from "../common/Logger"
import {ethers} from 'ethers'

const getMetaMaskWallet = async () => {
    if (window?.ethereum) {
        try {
            const accounts = await window?.ethereum.request({ method: 'eth_accounts' })
            const account = await handleMetaMaskAccounts(accounts)
            const wallet = await getUserByWalletAddress(account)
            return wallet
        } catch (e) {
            logger.error('[Utils - MetaMask] getMetaMaskWallet. error ', e) 
            throw e
        }
    } else {
        return undefined
    }
}

const handleMetaMaskAccounts = async (accounts) => {
    if (!accounts || accounts.length === 0) throw new Error('Metamask is not logined')
    return accounts[0]
}

const getUserByWalletAddress = async (account) => {
    return {address: ethers.getAddress(account), user: {id: 111, name: 'JanessaTech lab'}}
}

const GetCurrentWallet = async () => {
    const walletType = localStorage.getItem('walletType')
    //const walletType = 'metamask'
    console.log('[Utils - wallet] GetCurrentWallet  walletType=', walletType)

    if (walletType) {
        try {
            switch(walletType) {
                case 'metamask':
                    const wallet = await getMetaMaskWallet()
                    return wallet
                default:
                    // we support metamask only currently
                    return undefined
            }
        } catch (e) {
            throw e
        }
    } else {
        return undefined
    }
}

export {GetCurrentWallet}