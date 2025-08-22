import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import theme from './theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <AuthProvider>
      <App />
      </AuthProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>,
)
//