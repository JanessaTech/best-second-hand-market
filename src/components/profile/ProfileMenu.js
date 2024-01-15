import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { memo } from 'react'
import { CheapIcon } from '../../utils/Svgs'

const ProfileMenu = ({anchorEl, open, handleProfileMenuClose}) => {
    const handleClose = (e) => {
        handleProfileMenuClose()
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
        <MenuItem>
          <ListItemIcon>
            <Avatar alt='JanessaTech lab' src='imgs/nfters/me.png' sx={{ width: 25, height: 25 }}/>
          </ListItemIcon>
          <ListItemText>My NFTs</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'my-order'} size={25}/>
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'my-favorite'} size={25}/>
          </ListItemIcon>
          <ListItemText>My favorites</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'mint-nft'} size={25}/>
          </ListItemIcon>
          <ListItemText>Mint your NFT</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'my-notification'} size={25}/>
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'my-setting'} size={25}/>
          </ListItemIcon>
          <ListItemText>Setting</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
              <CheapIcon name={'my-balance'} size={25}/>
          </ListItemIcon>
          <ListItemText>My balance</ListItemText></MenuItem>
        <MenuItem>
          <Typography variant='h6' color={'primary'}>Disconnect</Typography>
        </MenuItem>
    </Menu>
  )
}

export default memo(ProfileMenu)

