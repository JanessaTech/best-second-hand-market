import { Box, Fade, IconButton, Stack, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar(props) {
    
    const {duration, timeout, alerts, clearAlerts, ...others} = props
    const [fadeIn, setFadeIn] = useState(alerts && alerts.length > 0 ? true : false)

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after ', duration)
            handleClearAlerts()
        }, duration)
        return () => clearTimeout(timer)
    })

    useEffect(() => {
        console.log('alerts.length > 0 :', alerts.length > 0)
        setFadeIn(alerts && alerts.length > 0 ? true : false)
    }, [alerts])

    const handleClearAlerts = () => {
        setFadeIn(false)
        clearAlerts()
    }

    return (
        <Fade in={fadeIn} timeout={timeout}>
                <Box sx={{position:'fixed', zIndex:1, top:80, right:0}}>
                    {alerts && alerts.length > 0 && 
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
                            alerts.map((a) => (
                                <Alert key={a.id} severity={a.severity}>{a.message}</Alert>
                            ))
                        }
                    </Stack>
                </Box>               
        </Fade>
    )
}

