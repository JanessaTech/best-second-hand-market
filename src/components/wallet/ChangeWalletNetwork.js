import { Box, Button, Dialog, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import {GetCurrentWalletProvider} from '../../utils/Wallet'
import logger from '../../common/Logger'
import {getChain} from '../../utils/Chain'

export default function ChangeWalletNetwork({newNetwork, onClose, open, notifyAlertUpdate}) {
    const [add, setAdd] = useState(false)

    const handleClose = () => {
        onClose()
    }

    const handleUpdate = async () => {
        const provider = GetCurrentWalletProvider()
        const newChanid = '0x' + Number(newNetwork).toString(16)
        logger.debug('[ChangeWalletNetwork] handleUpdate. newChanid = ', newChanid)
        if (provider) {
            try {
                await provider.send('wallet_switchEthereumChain', [{chainId: newChanid}])
                logger.debug(`[ChangeWalletNetwork] Changing network to chainId ${newNetwork} is successful.`)
                notifyAlertUpdate([{severity: 'success', message: `Changing network to chainId ${newNetwork} is successful.`}])
                onClose()
            } catch (e) {
                logger.debug('[ChangeWalletNetwork] failed to update network due to ', e)
                if (e?.info?.error?.code === 4001) {
                    logger.debug('[ChangeWalletNetwork] You reject changing network')
                    notifyAlertUpdate([{severity: 'error', message: `You rejected switching network. Please try again by clicking switching network`}])
                } else if (e?.error.code === 4902) {
                    logger.debug('[ChangeWalletNetwork] This network is not available in your wallet')
                    notifyAlertUpdate([{severity: 'error', message: `This network is not available in your wallet. Please add it`}])
                    setAdd(true)
                } else {
                    logger.debug("[ChangeWalletNetwork] Failed to switch to the network") 
                    notifyAlertUpdate([{severity: 'error', message: `Failed to switch to the chaninId ${newNetwork}. Please install it manually and try again`}])
                    onClose()
                }
            }
        }
    }

    const handleAddNetwork = async () => {
        const provider = GetCurrentWalletProvider()
        if (provider) {
            const chain = getChain(newNetwork)
            const hexChanid = '0x' + Number(newNetwork).toString(16)
            logger.debug('[ChangeWalletNetwork] chain by chainId=', newNetwork, chain)
            const params =  [
                {
                "chainId": hexChanid,
                "chainName": chain.chainName,
                "rpcUrls": [
                    chain.rpcUrls
                ],
                "nativeCurrency": {
                    "name": chain.currency,
                    "symbol": chain.currency,
                    "decimals": 18
                }
                }
            ]
            logger.debug('[ChangeWalletNetwork] handleAddNetwork. params =', params)
            onClose()
            try {
                await provider.send('wallet_addEthereumChain', params)
                logger.debug(`[ChangeWalletNetwork] handleAddNetwork. Added new network with chainid ${newNetwork} successfully`)
                notifyAlertUpdate([{severity: 'success', message: `Added new network with chainid ${newNetwork} successfully`}])
            } catch(e) {
                logger.debug('[ChangeWalletNetwork] Failed to add network. Please add it mannually')
                notifyAlertUpdate([{severity: 'error', message: `Failed to add the new network with chaninId ${newNetwork}. Please add it manually in your wallet`}])
                onClose()
            }
        }
    }

  return (
    <Dialog
    sx={{'& .MuiPaper-root.MuiDialog-paper':{width:0.4, height: 'fit-content', borderRadius:5, minWidth:320}}} open={open}>
        <Box sx={{position:'relative', mx:3, my:6}}>
            <Box sx={{mb:2}}>
                <Typography variant='h5' sx={{textAlign:'center'}}>Inconsistent network used in your wallet found</Typography>
                <Typography variant='body2' color='text.secondary' sx={{textAlign:'center'}}>
                   {add ? `Add the network chainId ${newNetwork} to your wallet` : `Change the wallet network to chainId ${newNetwork}`} 
                </Typography>
                <Tooltip title='Close'>
                    <IconButton onClick={handleClose} sx={{position:'absolute', top:-40, right:-20}}>
                        <CheapIcon name={'close'}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <Button sx={{width:88}} variant='outlined' color='customBlack' onClick={handleClose}>Cancel</Button>
                {!add && <Button sx={{width:88}} variant='contained' color='customBlack' onClick={handleUpdate}>Update</Button>}
                {add && <Button sx={{width:88}} variant='contained' color='customBlack' onClick={handleAddNetwork}>Add</Button>}
            </Box>
        </Box>
    </Dialog>
  )
}

