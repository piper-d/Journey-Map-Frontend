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
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import darkBackground from '../../images/darkTopo.jpg';

export default function SignUp() {
    const auth = getAuth()
    const theme = useTheme();

    const [emailr, setEmailr] = useState("");
    const [passwordr, setPasswordr] = useState("");
    const [username, setUsername] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [authorizedUser, setAuthorizedUser] = useState<any>(
        false ||
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken")
    );

    const isValidEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    const validateEmail = (email: string) => {
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const emailRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailr(event.target.value)
    }

    const passwordRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordr(event.target.value)
    }

    const usernameRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const signUpWithPassword = async () => {
        try {
            // const isEmailValid = validateEmail(emailr);
            // const isPasswordValid = validatePassword(passwordr);
            if (true) {
                const userCredential = await createUserWithEmailAndPassword(auth, emailr, passwordr)
                const user = userCredential.user;

                if (user) {
                    let tkn = await user.getIdToken();
                    // Set access token in session or local storage based on remember me
                    if (rememberMe) {
                        localStorage.setItem("accessToken", tkn);
                    } else {
                        sessionStorage.setItem("accessToken", tkn);
                    }

                    setAuthorizedUser(true);
                    await setDoc(doc(db, "Users", user.uid), { username: username, email: emailr, Trips: [] });
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {authorizedUser ? (
                <>
                    <Navigate to="/home" replace />
                </>
            ) :
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        backgroundImage: `url(${darkBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Container maxWidth="sm">
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
                            <Typography component="h1" variant="h4" marginBottom={5}>
                                Sign Up
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="filled"
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
                                    variant="filled"
                                    onChange={emailRegisterChanged}
                                    value={emailr}
                                    id="emailr"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={Boolean(emailError)}
                                    helperText={emailError}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    variant="filled"
                                    onChange={passwordRegisterChanged}
                                    value={passwordr}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={Boolean(passwordError)}
                                    helperText={passwordError}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onChange={handleRememberMeChange} />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={signUpWithPassword}
                                    sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Sign In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            }
        </>
    );
}
