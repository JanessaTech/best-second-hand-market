import { Icon } from "@mui/material"

const iconSize = 30
const svgMapping = new Map([
  ['defaut', 'imgs/defaut.svg'],
  ['profile', 'imgs/profile.svg'],
  ['handshake', 'imgs/handshake.svg'],
  ['search', 'imgs/search.svg'],
  ['emap-line', 'imgs/emap-line.svg'],
  ['cha', 'imgs/cha.svg'],
  ['cart', 'imgs/cart.svg'],
  ['notification', 'imgs/notification.svg']
])

function generateIcon(src, size) {
  return (
    <Icon sx={{width:size, height:size}}>
      <img src={src} height={size} width={size}/>
    </Icon>
  )
}

export function CheapIcon({name,size}) {return (generateIcon(svgMapping.get(name) || 'imgs/defaut.svg', size || iconSize))}