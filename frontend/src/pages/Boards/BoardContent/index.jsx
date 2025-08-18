import Box from '@mui/material/Box';
import { useState } from 'react';
import theme from '~/theme';


function BoardContent() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("blue");
  
    
    return (
        <Box sx={
            {
                
                width:(theme) => `calc(100vw - ${theme.manifox.sideBarWidth})`,
                height: (theme) => `calc(100vh - ${theme.manifox.appBarHeight})`,
                display: 'flex',
                alignItems: 'center',
                textAlign:  'center',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'primary.boardContent',
                
            }
        }>
            <p>Manifox Technology Solutions </p>
            Welcome to Manifox – delivering innovative, scalable and secure tech solutions for modern businesses.
        <p>Ban da bam {count} lan </p>
        <button onClick={() => setCount(count + 1)} > Bam</button>
        
        <p> The theme is {color} </p>
        <button onClick={() =>setColor("green")}>Click</button> 
        
        
        </Box>
    );
}


export default BoardContent;


