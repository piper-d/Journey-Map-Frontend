import React from 'react';
import { ThemeProvider, CssBaseline, PaletteMode, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import Login from './components/Login/login';
import NavBar from './components/Nav/NavBar'
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { ColorContext } from './ColorContext';

import LayoutComponent from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => 
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  )

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  )

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LayoutComponent />}>
              <Route index element={<Home />} />
              <Route path ='login' element={<Login />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorContext.Provider>

    

  )
}

export default App;
