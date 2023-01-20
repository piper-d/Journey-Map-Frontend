import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import './index.css';
import App from './App';
import './config/firebase.config'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={{ mode: 'light' }}>
    <App />
  </ThemeProvider>
);