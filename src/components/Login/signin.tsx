import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../App.css';
import darkBackground from '../../images/darkTopo.jpg'
import lightBackground from '../../images/lightTopo.jpg'
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                Journey Map
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const auth = getAuth()
    const theme = useTheme();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken"))

    const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const signInWithPassword = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    console.log(user)
                    user.getIdToken()
                    .then((tkn) => {
                        // set access token in session storage
                        sessionStorage.setItem("accessToken", tkn);

                        setAuthorizedUser(true);
                        setEmail('')
                        setPassword('')
                        
                    })
                }
                // ...
            })
            .catch((error) => {
                console.log(error)

            });
    }

    return (
        <>
            {authorizedUser ? (
                <>
                    <Navigate to="/home" replace/>
                </>
            ) :
                <Paper
                    sx={{
                        height: "90vh",
                        backgroundImage: theme.palette.mode === 'dark' ? `url(${darkBackground})` : `url(${lightBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container component="main" maxWidth="xs" sx={{ paddingTop: 10 }}>
                        <Box

                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: theme.palette.background.default,
                                borderRadius: 5,
                                padding: 4
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={emailChanged}
                                    value={email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={passwordChanged}
                                    value={password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={signInWithPassword}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Copyright sx={{ mt: 3 }} />
                        </Box>
                    </Container>
                </Paper>
            }
        </>
    );
}