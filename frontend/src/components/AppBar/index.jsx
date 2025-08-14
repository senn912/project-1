import Box from '@mui/material/Box';
// import ModeSelect from '../ModeSelect';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import logoSmall from '~/assets/favicon.ico'
import { Typography } from '@mui/material';
import Workspaces from './Menus/Workspaces'



function AppBar() {
    return (
        <Box px={2} sx={
            {
                backgroundColor: 'primary.modeselect',
                width: '100%',
                height: (theme) => theme.manifox.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }
        }>
            <Box sx={{display:'flex', alignItems:'center', gap : 2 }}>
                <AppsIcon sx={{color:'primary.appBar'}}/> 
                <Box sx={{display:'flex', alignItems:'center', gap : 1 }}>
                    <img src={logoSmall} width="35" height="35" alt="Logo"/>
                    <Typography variant='span' sx={{fontSize:'1.2rem',fontWeight:'bold', color:'primary.appBar'}}> Manifox </Typography>
                </Box>
                <Workspaces/>
            </Box>
            <Box>
                <ModeSelect />
            </Box>
            
           
            
        </Box>
    );
}

export default AppBar;