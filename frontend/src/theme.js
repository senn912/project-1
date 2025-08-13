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
                primary: { main: '#c4cebbc4', modeselect: '#139b1aff', boardBar: '#0644097a' },
                secondary: { main: '#558b2f' },
            },

        },
        dark: {
            palette: {
                primary: { main: '#4d524bff', modeselect: '#274932ff', boardBar: '#a38a1a7a' },
                secondary: teal,
            },

        },
    },
    // tranh theo he thong
    colorSchemeSelector: 'data',
});

export default theme;