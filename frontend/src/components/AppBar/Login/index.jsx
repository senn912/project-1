import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Login() {
  return (
    <Box sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
      <Button  component={Link} to="/login"
        variant="contained"   // nút màu nền
        color="secondary"       // màu chính
        id="login-button"
      >
        Login
      </Button>
    </Box>
  )
}

export default Login
