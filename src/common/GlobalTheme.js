import { createTheme } from '@mui/material/styles';
import { grey,black } from '@mui/material/colors';

const CheapTheme = createTheme({
    palette: {
        unworkable: {
            main: grey[500],
            contrastText: '#fff'
        },
        customGrey: {
            main: grey[500],
            contrastText: '#fff'
        },
        customBlack: {
            main: '#000',
            contrastText: '#fff'
        }
    },
    components:{
        MuiButton: {
            defaultProps: {
                disableRipple: false
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor:'#9e9e9e'}
                }
            }
        }
    }
})

export default CheapTheme