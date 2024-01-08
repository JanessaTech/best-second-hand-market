import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const CheapTheme = createTheme({
    palette: {
        unworkable: {
            main: grey[500],
            contrastText: '#fff'
        },
        normalButton: {
            main: grey[500]
        }
    },
    components:{
        MuiButton: {
            defaultProps: {
                disableRipple: false
            }
        },
    }
})

export default CheapTheme