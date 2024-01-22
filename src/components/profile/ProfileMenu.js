import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { CheapIcon } from '../../utils/Svgs'

const ProfileMenu = ({user, anchorEl, open, handleProfileMenuClose}) => {
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
        <MenuItem component={Link} to="/profile/nfts">
          <ListItemIcon>
            <Avatar alt='JanessaTech lab' src={`/imgs/nfters/${user?.id}/me.png`} sx={{ width: 25, height: 25 }}/>
          </ListItemIcon>
          <ListItemText>My NFTs</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile/orders">
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
        <MenuItem component={Link} to="/profile/setting">
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

