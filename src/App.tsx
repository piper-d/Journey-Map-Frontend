import React from 'react';
import { ThemeProvider, CssBaseline, PaletteMode, createTheme } from '@mui/material';

import './App.css';

import Login from './components/Login/login';
import NavBar from './components/Nav/NavBar'
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { ColorContext } from './ColorContext';
import { SwitchModeButton } from './components/SwitchModeButton/SwitchModeButton';

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
        <NavBar />
        <Login />
        <SwitchModeButton />

      </ThemeProvider>
    </ColorContext.Provider>

  )
}

export default App;
