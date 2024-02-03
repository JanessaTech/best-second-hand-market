import { Box, Typography } from '@mui/material'
import React from 'react'

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

export default WalletItem

