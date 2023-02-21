import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, PaletteMode, createTheme } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

import Login from './components/Login/login';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { ColorContext } from './ColorContext';

import LayoutComponent from './components/Layout/Layout';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import SignIn from './components/Login/signin';
import SignUp from './components/Login/signup';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorage<string>("mode", prefersDarkMode ? "dark" : "light");

  const Home = () => {
    const user = sessionStorage.getItem("accessToken")
    
    if (!user) {
      return <Navigate to="/" replace />;
    }

    return <Dashboard token={user}/>;
  };

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
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
              <Route index element={<Landing />} />
              <Route path ='login' element={<SignIn />} />
              <Route path='register' element={<SignUp />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
              <Route path='home' element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorContext.Provider>
  )
}

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export default App;
