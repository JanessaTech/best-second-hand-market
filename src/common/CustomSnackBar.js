import { Box, Fade, IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import MuiAlert from '@mui/material/Alert'
import DeleteIcon from '@mui/icons-material/Delete'
import logger from './Logger'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// to do: we need to refator this function to make it more readable
export default function CustomSnackBar(props) {
    logger.debug('[CustomSnackBar] rendering...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const {duration, timeout, alerts, clearAlerts} = props
    const [fadeIn, setFadeIn] = useState(alerts && alerts.length > 0 ? true : false)
    const [accAlerts, setAccAlerts] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            logger.debug('[CustomSnackBar] This will run after ', duration)
            handleClearAlerts()
        }, duration)
        return () => clearTimeout(timer)
    })

    useEffect(() => {
        setAccAlerts([...accAlerts, ...alerts])
        logger.debug('[...accAlerts, ...alerts]', [...accAlerts, ...alerts])
    }, [alerts])

    useEffect(() => {
             setFadeIn(alerts && alerts.length > 0 ? true : false)
    }, [alerts])

    const handleClearAlerts = () => {
        setFadeIn(false)
        setAccAlerts([])
        clearAlerts()
    }

    return (
        <Fade in={fadeIn} timeout={timeout}>
                <Box sx={{position:'fixed', zIndex:1301, top:80, right: isSmallScreen ? 16: 24}}>
                    {accAlerts && accAlerts.length > 0 && 
                        <Box sx={{display:'flex', justifyContent:'end'}}>
                            <Tooltip title="Clear all" placement="right">
                                <IconButton onClick={handleClearAlerts}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    } 
                    <Stack spacing={0.5}>
                        {
                            accAlerts.map((a) => (
                                <Alert key={a.id} severity={a.severity}>{a.message}</Alert>
                            ))
                        }
                    </Stack>
                </Box>               
        </Fade>
    )
}

