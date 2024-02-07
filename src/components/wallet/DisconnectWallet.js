import { Box, Button, Dialog, IconButton, Tooltip, Typography } from '@mui/material'
import React, { memo } from 'react'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'

const DisconnectWallet = ({onClose, open, notifyResetWallet, notifyWalletUpdate}) => {

    const handleClose = () => {
        /**
         * There are 4 places wen remove login from localStorage
         * 1. here
         * 2. handleDisconnect in ProfileMenu
         * 3. handleDisConnected in Signup
         * 4. handleSignup in Signup
         */
        localStorage.removeItem('login')
        logger.debug('[DisconnectWallet] deleted login in localStorage')
        notifyResetWallet()
        notifyWalletUpdate(undefined)
        onClose()
    }

  return (
    <Dialog
        sx={{'& .MuiPaper-root.MuiDialog-paper':{width:0.3, height: 'fit-content', borderRadius:5, minWidth:320}}} open={open}
    >
        <Box sx={{position:'relative', mx:3, my:6}}>
            <Box sx={{mb:2}}>
                <Typography variant='h5' sx={{textAlign:'center'}}>Disconnect from your wallet</Typography>
                <Typography variant='body2' color='text.secondary' sx={{textAlign:'center'}}>You are about to logout because you changed you wallet address. Set the wallet address to be the one you will be using and try again</Typography>
                <Tooltip title='Close'>
                    <IconButton onClick={handleClose} sx={{position:'absolute', top:-40, right:-20}}>
                        <CheapIcon name={'close'}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Button variant='contained' color='customBlack' onClick={handleClose}>OK</Button>
            </Box>
        </Box>
    </Dialog>
  )
}

export default memo(DisconnectWallet)

