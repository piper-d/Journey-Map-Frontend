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
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import '../../App.css';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import darkBackground from '../../images/darkTopo.jpg';

export default function SignIn() {
    const auth = getAuth()
    const theme = useTheme();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"))
    const [rememberMe, setRememberMe] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [resetError, setResetError] = useState('');

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



    const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }

    const signInWithPassword = () => {
        const isEmailValid = validateEmail(email);
        if (isEmailValid) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        user.getIdToken()
                            .then((tkn) => {
                                if (rememberMe) {
                                    localStorage.setItem("accessToken", tkn);
                                } else {
                                    sessionStorage.setItem("accessToken", tkn);
                                }
                                setAuthorizedUser(true);
                                setEmail('')
                                setPassword('')
                                setEmailError('')
                                setPasswordError('')

                            })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setEmailError('Invalid email or password')
                    setPasswordError('Invalid email or password')
                });
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setResetError('');
                handleClose();
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setResetError("Email not found.");
                }

            });
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
                                Sign in
                            </Typography>
                            <Box component="form" sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    variant="filled"
                                    onChange={emailChanged}
                                    value={email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    variant="filled"
                                    onChange={passwordChanged}
                                    value={password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handleRememberMeChange} />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={signInWithPassword}
                                    sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                    disabled={!email || !password}
                                >
                                    Sign In
                                </Button>
                                <Box component="form" sx={{ mt: 1 }}>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link onClick={handleClickOpen} variant="body2" style={{ cursor: 'pointer' }}>
                                                Forgot password?
                                            </Link>
                                            <Dialog open={open} onClose={handleClose}>
                                                <Box >
                                                    <DialogTitle>Forgot Password</DialogTitle>
                                                    <DialogContent>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            label="Email"
                                                            onChange={emailChanged}
                                                            value={email}
                                                            id='email'
                                                            type="email"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                        {resetError && (
                                                            <Typography color="error" variant="body2">
                                                                {resetError}
                                                            </Typography>
                                                        )}
                                                        <Button variant="contained" fullWidth sx={{ marginTop: 1 }} onClick={handlePasswordReset}>
                                                            Send Reset Email
                                                        </Button>
                                                    </DialogContent>
                                                </Box>
                                            </Dialog>
                                        </Grid>
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            }
        </>
    );
}
