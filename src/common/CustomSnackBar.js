import { Box, Fade, IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// we need to refator this function to make it more readable
export default function CustomSnackBar(props) {
    console.log('CustomSnackBar rendering ...')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const {duration, timeout, alerts, clearAlerts} = props
    const [fadeIn, setFadeIn] = useState(alerts && alerts.length > 0 ? true : false)
    const [allAlerts, setAllAlerts] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after ', duration)
            handleClearAlerts()
        }, duration)
        return () => clearTimeout(timer)
    })

    useEffect(() => {
        setAllAlerts([...allAlerts, ...alerts])
        console.log('[...allAlerts, ...alerts]', [...allAlerts, ...alerts])
    }, [alerts])

    useEffect(() => {
             setFadeIn(alerts && alerts.length > 0 ? true : false)
    }, [alerts])

    const handleClearAlerts = () => {
        setFadeIn(false)
        setAllAlerts([])
        clearAlerts()
    }

    return (
        <Fade in={fadeIn} timeout={timeout}>
                <Box sx={{position:'fixed', zIndex:1301, top:80, right: isSmallScreen ? 16: 24}}>
                    {allAlerts && allAlerts.length > 0 && 
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
                            allAlerts.map((a) => (
                                <Alert key={a.id} severity={a.severity}>{a.message}</Alert>
                            ))
                        }
                    </Stack>
                </Box>               
        </Fade>
    )
}

