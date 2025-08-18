import Box from '@mui/material/Box';
// import ModeSelect from '../ModeSelect';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import logoSmall from '~/assets/favicon.ico'
import { Typography } from '@mui/material';
import Home from './Menus/Home';
import News from './Menus/News';
import Upload from './Menus/Upload';
import Login from '../Login';
import Create from '../Create';



function AppBar() {
    return (
        <Box px={4} sx={
            {
                backgroundColor: 'primary.modeselect',
                width: '100%',
                height: (theme) => theme.manifox.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }
        }>
            <Box sx={{display:'flex', alignItems:'center', gap : 3 }}>
                {/* <AppsIcon sx={{color:'primary.appBar'}}/>  */}
                <Box sx={{display:'flex', alignItems:'center', gap : 1 }}>
                    <img src={logoSmall} width="35" height="35" alt="Logo"/>
                    <Typography variant='span' sx={{fontSize:'1.5rem',fontWeight:'bold', color:'primary.appBar'}}> Manifox </Typography>
                </Box >
                <Box sx={{display:'flex', alignItems:'center', gap : 3, ml: 5 }}>
                    <Home/>
                    <News/>
                    <Upload/>
                </Box>
            </Box>
            <Box sx={{display:'flex',  alignItems:'center',gap: 1.8}}>
                <Create/>
                <Login/>
                <ModeSelect />
                
            </Box>
            
           
            
        </Box>
    );
}

export default AppBar;