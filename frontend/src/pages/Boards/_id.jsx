import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/index';
import BoardContent from './BoardContent';
import SideBar from '~/components/SideBar';
import { Box } from '@mui/material';

function Board() {
    return (
         <Container disableGutters maxWidth={false} sx={{ height: '100vh',display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ height: (theme) => theme.manifox.appBarHeight }}>
                <AppBar />
            </Box> 
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <SideBar />
                <BoardContent />
            </Box>
        </Container>
    )
}

export default Board;
