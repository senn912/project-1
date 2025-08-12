import Box from '@mui/material/Box';

function BoardBar() {
    return (
        <Box sx={
            {
                backgroundColor: 'primary.boardBar',
                width: '100%',
                height: (theme) => theme.manifox.boardBarHeight,
                display: 'flex',
                alignItems: 'center'
            }
        }>
            Board Bar
        </Box>
    );
}

export default BoardBar;