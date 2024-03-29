import Button from '@mui/material/Button'
import { Box } from "@mui/material"
import logger from "../../../common/Logger"


export default function Done({handleNext}) {
    logger.debug('[Mint-Done] rendering...')
    return (
        <Box>
            <Button variant='contained' color='customBlack' onClick={handleNext} sx={{textTransform:'none',mt:1}}>OK</Button>
        </Box>
    )
}