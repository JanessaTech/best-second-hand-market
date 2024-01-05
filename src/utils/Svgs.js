import { Icon } from "@mui/material"

const iconSize = 30
const svgMapping = new Map([
  ['handshake', 'imgs/handshake.svg'],
  ['search', 'imgs/search.svg'],
  ['emap-line', 'imgs/emap-line.svg'],
  ['cha', 'imgs/cha.svg'],
  
  

])

function generateIcon(src, size) {
  return (
    <Icon sx={{width:size, height:size}}>
      <img src={src} height={size} width={size}/>
    </Icon>
  )
}

export function CheapIcon({name,size}) {return (generateIcon(svgMapping.get(name) || 'imgs/bookmarker.svg', size || iconSize))}