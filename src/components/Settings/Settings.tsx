import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import Grid from '@mui/material/Grid';
import darkBackground from '../../images/darkTopo.jpg';
import { useTheme } from '@mui/material';

const Settings: React.FunctionComponent<any> = (token) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const auth = getAuth()
    const theme = useTheme();

    const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleSubmit = () => {
        const data = {
            username: username
        }
        PutUserData(token, data)
    }

    const handlePasswordChange = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    function logoutUser() {
        signOut(auth).then(() => {
            // clear session storage
            sessionStorage.clear();
            localStorage.clear();

            localStorage.removeItem('card');

            window.location.replace("/");
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await axios.delete(`/user/`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                });

                // Log the user out
                // Replace this with your own logout implementation
                logoutUser();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const PutUserData = async (token: any, data: { username: string }) => {
        try {
            const response = await axios.put(`/user/`,
                {
                    ...data
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    async function GetUserData(token: any) {
        const response = await axios.get(`/user/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        setEmail(response.data.email)
        setUsername(response.data.username)
    }

    useEffect(() => {
        if (token) {
            GetUserData(token);
        }
    }, [token]);


    return (
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
                    <Typography component="h1" variant="h4" marginBottom={5}>
                        Edit Account Information
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", margin: "15px 0 5px"}}>
                                Change Username
                            </Typography>
                            <TextField
                                type="text"
                                label="Username"
                                required
                                fullWidth
                                variant="filled"
                                value={username}
                                onChange={usernameChanged}
                            />
                            <Button
                                sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                type="submit"
                                size="large"
                                variant="contained"
                                onClick={handleSubmit}
                                fullWidth
                                disabled={!username.trim()}
                            >
                                Change Username
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                type="button"
                                size="large"
                                variant="contained"
                                onClick={handlePasswordChange}
                                fullWidth
                                disabled={!email.trim()}
                            >
                                Send Password Reset Email
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                type="button"
                                color="error"
                                size="large"
                                variant="contained"
                                onClick={handleDeleteAccount}
                                fullWidth
                                
                            >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper >
    );
};

export default Settings;