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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'
import db from "../../config/firebase.config"
import '../../App.css';
import darkBackground from '../../images/darkTopo.jpg'
import lightBackground from '../../images/lightTopo.jpg'
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';


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

export default function SignUp() {
    const auth = getAuth()
    const theme = useTheme();

    const [emailr, setEmailr] = useState("eminmammadzada.b@gmail.com")
    const [passwordr, setPasswordr] = useState("admin123")
    const [username, setUsername] = useState("emin")

    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken"))

    const emailRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailr(event.target.value)
    }

    const passwordRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordr(event.target.value)
    }

    const usernameRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const signUpWithPassword = async () => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailr, passwordr)
            const user = userCredential.user;

            if (user) {
                let tkn = await user.getIdToken()
                // set access token in session storage
                sessionStorage.setItem("accessToken", tkn);
                setAuthorizedUser(true);
                await setDoc(doc(db, "Users", user.uid), { username: username, email: emailr, Trips: [] })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {authorizedUser ? (
                <>
                    <>
                        <Navigate to="/home" replace />
                    </>
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
                                Sign Up
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={usernameRegisterChanged}
                                value={username}
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <Box component="form" sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={emailRegisterChanged}
                                    value={emailr}
                                    id="emailr"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={passwordRegisterChanged}
                                    value={passwordr}
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
                                    onClick={signUpWithPassword}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Sign In"}
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