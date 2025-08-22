import React from 'react'
import Box  from '@mui/material/Box';

import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home() {
  
  return (
    <Box sx={{height:1}}>
     <Button 
        id="basic-button-home" component={Link} to="/"
      >
        Home
      </Button>
    </Box>
  )
}

export default Home