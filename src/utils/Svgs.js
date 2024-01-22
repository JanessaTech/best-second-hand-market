import { Icon } from "@mui/material"

const iconSize = 30
const svgMapping = new Map([
  // for common svgs used global
  ['cart', '/imgs/common/cart.svg'],
  ['notification', '/imgs/common/notification.svg'],
  ['defaut', '/imgs/common/defaut.svg'],
  ['close', '/imgs/common/close.svg'],
  ['update', 'imgs/common/update.svg'],
  ['help', 'imgs/common/help.svg'],
  ['filter', '/imgs/common/filter.svg'],
  ['left-arrow', '/imgs/common/left-arrow.svg'],
  ['right-arrow', '/imgs/common/right-arrow.svg'],
  ['home', 'imgs/common/home.svg'],
  
  // for header
  ['handshake', '/imgs/header/handshake.svg'],
  ['search', '/imgs/header/search.svg'],
  ['forward-slash', '/imgs/header/forward-slash.svg'],
  ['cha', '/imgs/header/cha.svg'],
  ['connect-wallet', 'imgs/header/connect-wallet.svg'],


  // for network options
  ['ethereum', '/imgs/networks/ethereum.svg'],
  ['avalanche', '/imgs/networks/avalanche.svg'],
  ['polygon', '/imgs/networks/polygon.svg'],
  ['solana', '/imgs/networks/solana.svg'],

  // for nft detail page
  ['view', '/imgs/nft-detail/view.svg'],
  ['cart-black', '/imgs/nft-detail/cart-black.svg'],
  ['my-favorite-red', '/imgs/nft-detail/my-favorite-red.svg'],
  ['minus', '/imgs/nft-detail/minus.svg'],

  // for profile
  ['my-order', '/imgs/profile/my-order.svg'],
  ['my-favorite', '/imgs/profile/my-favorite.svg'],
  ['mint-nft', '/imgs/profile/mint-nft.svg'],
  ['my-notification', '/imgs/profile/my-notification.svg'],
  ['my-setting', '/imgs/profile/my-setting.svg'],
  ['my-balance', '/imgs/profile/my-balance.svg']
])

function generateIcon(src, size, sx) {
  return (
    <Icon sx={{width:size, height:size, display:'flex', ...sx}}>
      <img src={src} height={size} width={size}/>
    </Icon>
  )
}

export function CheapIcon({name,size, sx}) {return (generateIcon(svgMapping.get(name) || '/imgs/common/defaut.svg', size || iconSize, sx || {}))}