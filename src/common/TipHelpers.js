import { Box, Typography } from "@mui/material"
import { useState, memo} from "react"
import { CheapIcon } from "../utils/Svgs"
import CustomPopper from "./CustomPopper"

const NotAvailableNFTHelpContent = () => {
    return (
      <Box>
        <Typography variant='body2'>The item is unavailable because: 1. It has been purchased by someone else 2.The nft is removed from the listing 3.It has expired 4.The nft belongs to the logined user </Typography>
      </Box>
    )
}

const ExchangeRateHelpContent = () => {
  return (
    <Box>
       <Typography variant='body2'>The rate is the number at which how much token we could get in the exchange of 1 crypto currencey. For example, the rate is 100 and we choose ethereum, 1 ETH will be equivalent to 100 token which will be deposited into your account</Typography>
    </Box>
  )
}

/**
 * @text : The text shown beside question mark
 * @idPrefix: The id of string for Popper
 * @width: The width of the prompt dialog box
 * @content: The content shown in the prompt dialog box
 * @placement: where to show the prompt dialog box. Valid options are: 'left', 'top', 'right', 'bottom' etc, see more at : https://mui.com/material-ui/react-popper/
 * @bgcolor: The background color for the prompt dialog box
 * @color: The color of the font used in the prompt dialog box
 */
const CoreTip = memo(({text, idPrefix = 'default', width = 250, content, placement = 'top', bgcolor ='#eee', color = 'black'}) => {
    
  const [anchorEl, setAnchorEl] = useState(null)

  const openHelp = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closeHelp = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{display:'flex', alignItems:'center'}}>
            <Typography variant='body2'>{text}</Typography>
            <Box onMouseOver={openHelp} onMouseLeave={closeHelp}>
                <CheapIcon name='help' size={16}/>
            </Box>
            <CustomPopper 
                idPrefix={idPrefix} 
                anchorEl={anchorEl} 
                width={width} 
                placement={placement} 
                content={content} 
                bgcolor={bgcolor} 
                color={color}/>
    </Box>
  )
})

const UnavailableHelpTip = () => (<CoreTip text={'Not available'} idPrefix={'nft-unavailable'} content={<NotAvailableNFTHelpContent/>}  bgcolor='black' color='#fff'/>)

const ExchangeRateTip = ({text}) => (<CoreTip text={text} idPrefix={'nft-unavailable'} content={<ExchangeRateHelpContent/>}  bgcolor='black' color='#fff'/>)

export {UnavailableHelpTip, ExchangeRateTip}

