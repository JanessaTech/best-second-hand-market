import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheapIcon } from '../../utils/Svgs'
import logger from '../../common/Logger'

const ProfileMenu = ({user, anchorEl, open, handleProfileMenuClose, notifyUserUpdate}) => {
  logger.debug('[ProfileMenu] rendering...')
  const navigate = useNavigate()

    const handleClose = (e) => {
        handleProfileMenuClose()
    }

    const handleDisconnect = () => {
      logger.info('[ProfileMenu] handleDisconnect')
      logger.debug('[ProfileMenu] delete user in localStorage')
      localStorage.removeItem('user')
      logger.debug('[ProfileMenu] user=', localStorage.getItem('user'))
      handleProfileMenuClose()
      notifyUserUpdate()
    }

    const handleClick = (url) => {
      handleProfileMenuClose()
      navigate(url)
    }

  return (
    <Menu
        id='profile-positioned-menu'
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{ onMouseLeave: handleClose }}
        anchorOrigin={{
            vertical: 65,
            horizontal: 100,
          }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <MenuItem onClick={() => handleClick("/profile/nfts")}>
          <ListItemIcon>
            <Avatar alt='JanessaTech lab' src={`/imgs/nfters/${user?.id}/me.png`} sx={{ width: 25, height: 25 }}/>
          </ListItemIcon>
          <ListItemText>My NFTs</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/orders")}>
          <ListItemIcon>
              <CheapIcon name={'my-order'} size={25}/>
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/favorites")}>
          <ListItemIcon>
              <CheapIcon name={'my-favorite'} size={25}/>
          </ListItemIcon>
          <ListItemText>My favorites</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/mint")}>
          <ListItemIcon>
              <CheapIcon name={'mint-nft'} size={25}/>
          </ListItemIcon>
          <ListItemText>Mint your NFT</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/notifications")}> 
          <ListItemIcon>
              <CheapIcon name={'my-notification'} size={25}/>
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/setting")}>
          <ListItemIcon>
              <CheapIcon name={'my-setting'} size={25}/>
          </ListItemIcon>
          <ListItemText>Setting</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick("/profile/balance")}>
          <ListItemIcon>
              <CheapIcon name={'my-balance'} size={25}/>
          </ListItemIcon>
          <ListItemText>My balance</ListItemText></MenuItem>
        <MenuItem onClick={handleDisconnect}>
          <Typography variant='h6' color={'primary'}>Disconnect</Typography>
        </MenuItem>
    </Menu>
  )
}

export default memo(ProfileMenu)

