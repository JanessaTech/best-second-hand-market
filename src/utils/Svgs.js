import { Icon } from "@mui/material"

const iconSize = 30
const svgMapping = new Map([
  ['defaut', 'imgs/defaut.svg'],
  ['profile', 'imgs/profile.svg'],
  ['handshake', 'imgs/handshake.svg'],
  ['search', 'imgs/search.svg'],
  ['forward-slash', 'imgs/forward-slash.svg'],
  ['cha', 'imgs/cha.svg'],
  ['cart', 'imgs/cart.svg'],
  ['cart-s', 'imgs/cart-s.svg'],
  ['notification', 'imgs/notification.svg'],
  ['my-nft', 'imgs/profile/my-nft.svg'],
  ['my-order', 'imgs/profile/my-order.svg'],
  ['my-favorite', 'imgs/profile/my-favorite.svg'],
  ['my-notification', 'imgs/profile/my-notification.svg'],
  ['my-setting', 'imgs/profile/my-setting.svg'],
  ['my-balance', 'imgs/profile/my-balance.svg'],
  ['left-arrow', 'imgs/left-arrow.svg'],
  ['right-arrow', 'imgs/right-arrow.svg'],
  ['update', 'imgs/update.svg'],
  ['filter', 'imgs/filter.svg'],
  ['ethereum', 'imgs/ethereum.svg'],
  ['avalanche', 'imgs/avalanche.svg'],
  ['polygon', 'imgs/polygon.svg'],
  ['solana', 'imgs/solana.svg'],
  ['close', 'imgs/close.svg']
])

function generateIcon(src, size) {
  return (
    <Icon sx={{width:size, height:size}}>
      <img src={src} height={size} width={size}/>
    </Icon>
  )
}

export function CheapIcon({name,size}) {return (generateIcon(svgMapping.get(name) || 'imgs/defaut.svg', size || iconSize))}