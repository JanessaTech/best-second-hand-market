import { Box, Typography } from "@mui/material"
import { useState, memo} from "react"
import { CheapIcon } from "../utils/Svgs"
import CustomPopper from "./CustomPopper"

const HelpContent = () => {
    return (
      <Box>
        <Typography variant='body2'>The item is unavailable because it has been purchased by someone else, the seller has removed the listing or the order has expired </Typography>
      </Box>
    )
}

const UnavailableHelpTip = memo(() => {
    
    const [anchorEl, setAnchorEl] = useState(null)
  
    const openHelp = (e) => {
      setAnchorEl(e.currentTarget)
    }
  
    const closeHelp = () => {
      setAnchorEl(null)
    }
  
    return (
      <Box sx={{display:'flex', alignItems:'center'}}>
              <Typography variant='body2'>Not available</Typography>
              <Box onMouseOver={openHelp} onMouseLeave={closeHelp}>
                  <CheapIcon name='help' size={16}/>
              </Box>
              <CustomPopper idPrefix='nft-unavailable' anchorEl={anchorEl} width={250} placement={'top'} content={<HelpContent/>} />
      </Box>
    )
  })

  export {UnavailableHelpTip}

