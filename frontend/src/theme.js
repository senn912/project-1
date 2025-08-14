import { teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'


// Create a theme instance.
const theme = extendTheme({
    manifox: {
        appBarHeight: '48px',
        boardBarHeight: '58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#030703ff', modeselect: '#119680ff', boardBar: '#0644097a',boardContent: '#cddaceff'  },
                secondary: { main: '#4b7c28ff' },
            },

        },
        dark: {
            palette: {
                primary: { main: '#ffffffff', modeselect: '#119680ff', boardBar: '#0644097a',boardContent: '#242c28ff' },
                secondary: teal,
            },

        },
    },
    // tranh theo he thong
    colorSchemeSelector: 'data',
});

export default theme;