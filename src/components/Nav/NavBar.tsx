import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { SwitchModeButton } from '../SwitchModeButton/SwitchModeButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from '@mui/material/styles';

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const auth = getAuth();
    const location = useLocation();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const color = isDarkMode ? '#42454E' : '#42454E';

    const [navBackgroundColor, setNavBackgroundColor] = useState('transparent');
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [activePage, setActivePage] = useState(location.pathname);
    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"))

    function logoutUser() {
        signOut(auth).then(() => {
            // clear session storage
            sessionStorage.clear();
            localStorage.clear();

            setAuthorizedUser(false);
            localStorage.removeItem('card');

            window.location.replace("/");
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }

    // Add an event listener for the scroll event
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.pageYOffset;
            if (offset > 100) {
                setNavBackgroundColor(color);
            } else {
                setNavBackgroundColor('transparent');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const about = () => {
        setActivePage('/about');
        navigate('/about');
    }
    const contact = () => {
        setActivePage('/contact');
        navigate('/contact');
    }
    const login = () => {
        setActivePage('/login');
        navigate('/login');
    }
    const register = () => {
        setActivePage('/register');
        navigate('/register');
    }
    const settings = () => {
        setActivePage('/settings');
        navigate('/settings');
    }
    const home = () => {
        setActivePage('/home');
        navigate('/home');
    }

    const buttonStyle = (path: string) => ({
        my: 2,
        color: activePage === path ? 'primary.main' : 'white',
    });

    return (
        <>
            {sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken") ? (
                <>
                    {/* Navigation bar when user is logged in */}
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: navBackgroundColor, boxShadow: 'none' }} elevation={0}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Journey Map
                                </Typography>

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >
                                        {/* <MenuItem onClick={about}>
                                            <Typography textAlign="center">About</Typography>
                                        </MenuItem> */}
                                        <MenuItem onClick={contact}>
                                            <Typography textAlign="center">Contact Us</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={home}>
                                            <Typography textAlign="center">Archive</Typography>
                                        </MenuItem>

                                    </Menu>
                                </Box>
                                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href=""
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Journey Map
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        onClick={home}
                                        sx={buttonStyle('/home')}>
                                        <Typography textAlign="center">ARCHIVE</Typography>
                                    </Button>
                                    {/* <Button
                                        onClick={about}
                                        sx={buttonStyle('/about')}
                                    >
                                        <Typography textAlign="center">About</Typography>
                                    </Button> */}
                                    <Button
                                        onClick={contact}
                                        sx={buttonStyle('/contact')}
                                    >
                                        <Typography textAlign="center">Contact Us</Typography>
                                    </Button>
                                    <Button
                                        onClick={settings}
                                        sx={buttonStyle('/settings')}
                                    >
                                        <Typography textAlign="center">Settings</Typography>
                                    </Button>

                                </Box>
                                <SwitchModeButton />
                                <Button
                                    variant="contained"
                                    onClick={logoutUser}
                                >
                                    Logout
                                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </>
            ) :
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: navBackgroundColor, boxShadow: 'none' }} elevation={0}>                    <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Journey Map
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {/* <MenuItem onClick={about}>
                                    <Typography textAlign="center">About</Typography>
                                </MenuItem> */}
                                <MenuItem onClick={contact}>
                                    <Typography textAlign="center">Contact Us</Typography>
                                </MenuItem>
                                <MenuItem onClick={login}>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                                <MenuItem onClick={register}>
                                    <Typography textAlign="center">Register</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Journey Map
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* <Button
                                onClick={about}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                About
                            </Button> */}
                            <Button
                                onClick={contact}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Contact Us
                            </Button>
                            <Button
                                onClick={login}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={register}
                                
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Register
                            </Button>
                        </Box>
                        <SwitchModeButton />
                    </Toolbar>
                </Container>
                </AppBar>
            }
        </>

    );
}
export default ResponsiveAppBar;