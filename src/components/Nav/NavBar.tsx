import * as React from 'react';
import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const auth = getAuth()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    // const [ setAuthorizedUser ] = useState<any>(false || sessionStorage.getItem("accessToken"))

    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"))

    function logoutUser() {
        signOut(auth).then(() => {
            // clear session storage
            sessionStorage.clear();
            localStorage.clear();

            setAuthorizedUser(false);

            alert('Logged Out Successfully');
            window.location.replace("/");
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const about = () => {
        navigate('/about');
    }
    const contact = () => {
        navigate('/contact');
    }
    const login = () => {
        navigate('/login');
    }
    const register = () => {
        navigate('/register');
    }
    const settings = () => {
        navigate('/settings');
    }
    const home = () => {
        navigate('/home');
    }

    return (
        <>
            {sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken") ? (
                <>
                    {/* Navigation bar when user is logged in */}
                    <AppBar position="static">
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
                                        <MenuItem onClick={about}>
                                            <Typography textAlign="center">About</Typography>
                                        </MenuItem>
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
                                        sx={{ my: 2, color: 'white', display: 'block' }}>
                                        <Typography textAlign="center">ARCHIVE</Typography>
                                    </Button>
                                    <Button
                                        onClick={about}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        <Typography textAlign="center">About</Typography>
                                    </Button>
                                    <Button
                                        onClick={contact}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        <Typography textAlign="center">Contact Us</Typography>
                                    </Button>
                                    <Button
                                        onClick={settings}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
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
                <AppBar position="static">
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
                                    <MenuItem onClick={about}>
                                        <Typography textAlign="center">About</Typography>
                                    </MenuItem>
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
                                <Button
                                    onClick={about}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    About
                                </Button>
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

                            {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                        </Toolbar>
                    </Container>
                </AppBar>
            }
        </>

    );
}
export default ResponsiveAppBar;