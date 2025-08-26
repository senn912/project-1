import Box from '@mui/material/Box';
// import ModeSelect from '../ModeSelect';
import { Link } from "react-router-dom";


import ModeSelect from '~/components/ModeSelect';

import logoSmall from '~/assets/favicon.ico'
import { Typography } from '@mui/material';
import Home from './Menus/Home';
import News from './Menus/News';
import Upload from './Menus/Upload';
import LoginButton from './Login/LoginButton';
import CreateButton from './Create/CreateButton';
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../User/UserMenu"



function AppBar() {
    const { user } = useAuth();
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
                <Box component={Link} to="/" sx={{display:'flex', alignItems:'center', gap : 1, textDecoration: "none", 
                color: "inherit","&:hover": {
                textDecoration: "none", 
                }, 
                }}>
                    <img src={logoSmall} width="35" height="35" alt="Logo" />
                    <Typography variant='span' sx={{fontSize:'1.5rem',fontWeight:'bold', color:'primary.appBar'}}> Manifox </Typography>
                </Box >
                <Box sx={{display:'flex', alignItems:'center', gap : 3, ml: 5 }}>
                    <Home/>
                    <News/>
                    <Upload/>
                </Box>
            </Box>
            <Box sx={{display:'flex',  alignItems:'center',gap: 1.8}}>

        <UserMenu />   
                <ModeSelect /> 
                {!useAuth()?.user && (
                    <>
                        <CreateButton/>
                        <LoginButton/>
                    </>
                )}
                
            </Box>
            
        </Box>
    );
}

export default AppBar;