import { Box, Fade, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar(props) {
    
    const {duration, open, timeout,...others} = props
    const [fadeIn, setFadeIn] = useState(open)
    

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after ', duration)
            setFadeIn(false)
        }, duration)
        return () => clearTimeout(timer)
    })
    
    useEffect(() => {
        setFadeIn(open)
    }, [open])

    const handleFadeIn = () => {
        setFadeIn(false)
    }

    return (
        <Fade in={fadeIn} timeout={timeout}>
                <Box sx={{position:'fixed', bottom:10}}>
                    <Box sx={{display:'flex', justifyContent:'end'}}>
                        <Tooltip title="Clear all" placement="right">
                            <IconButton onClick={handleFadeIn}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Stack spacing={0.5}>
                        <Alert severity="error">This is an error message!</Alert>
                        <Alert severity="warning">This is a warning message!</Alert>
                    </Stack>
                </Box>
                
        </Fade>
    )
}

