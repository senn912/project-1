import { teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'


// Create a theme instance.
const theme = extendTheme({
    manifox: {
        appBarHeight: '60px',
        boardBarHeight: '58px',
        sideBarWidth: '280px',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#030707ff', modeselect: '#85C1A9', boardBar: '#82cf877a',boardContent: '#e3f7ee98' ,sideBar: '#85c7ad8e' },
                secondary: { main: '#2C3E50' },
            },

        },
        dark: {
            palette: {
                primary: { main: '#ffffffff', modeselect: '#09473dff', boardBar: '#1bca237a',boardContent: '#04221d67', sideBar: '#1196802f' },
                secondary: teal,
            },

        },
    },
    // tranh theo he thong
    colorSchemeSelector: 'data',
});

export default theme;