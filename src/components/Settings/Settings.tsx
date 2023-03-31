import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";

const Settings: React.FunctionComponent<any> = (token) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const auth = getAuth()

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
                console.log('User logged out');
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
        setUsername(response.data.username)
    }

    useEffect(() => {
        if (token) {
            GetUserData(token);
        }
    }, [token]);


    return (
        <Box
            sx={{
                my: 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Container>
                <Typography variant='h3' sx={{ fontWeight: 'bold', margin: '15px 0 5px', color: '#ffffff' }}>Edit Account Information</Typography>
                <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px', color: '#ffffff' }}>Change Username</Typography>
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
                    sx={{ fontSize: '18px', fontWeight: 600, boxShadow: 3, marginTop: 6, paddingTop: 1.75, paddingBottom: 1.75 }}
                    type='submit'
                    size='large'
                    variant='contained'
                    onClick={handleSubmit}
                    fullWidth
                >
                    Submit
                </Button>
                {/* ... */}
                {/* Change Password */}
                <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px', color: '#ffffff' }}>Change Password</Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        type="email"
                        label="Email"
                        required
                        fullWidth
                        variant="filled"
                        value={email}
                        onChange={emailChanged}
                    />
                    <Button
                        sx={{ fontSize: '18px', fontWeight: 600, boxShadow: 3, marginTop: 6, paddingTop: 1.75, paddingBottom: 1.75 }}
                        type='button'
                        size='large'
                        variant='contained'
                        onClick={handlePasswordChange}
                        fullWidth
                    >
                        Send Password Reset Email
                    </Button>

                    <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px', color: '#ffffff' }}>Delete Account</Typography>
                    <Button
                        sx={{ fontSize: '18px', fontWeight: 600, boxShadow: 3, marginTop: 6, paddingTop: 1.75, paddingBottom: 1.75 }}
                        type='button'
                        size='large'
                        variant='contained'
                        onClick={handleDeleteAccount}
                        fullWidth
                    >
                        Delete Account
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Settings;