import { Menu, MenuItem } from '@mui/material'
import React from 'react'

export default function ProfileMenu({anchorEl, open, handleProfileMenuClose}) {
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
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: -100,
          }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <MenuItem>My NFTs</MenuItem>
        <MenuItem >My orders</MenuItem>
    </Menu>
  )
}

