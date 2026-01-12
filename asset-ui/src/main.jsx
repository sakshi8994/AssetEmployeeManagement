import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";  
import { SnackbarProvider } from './context/SnackbarContext.jsx'; 

createRoot(document.getElementById('root')).render(
  
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
      <App />
      </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  
);
