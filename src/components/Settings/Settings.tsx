import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';

const Settings: React.FunctionComponent<any> = (token) => {
    const [username, setUsername] = useState("")

    const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleSubmit = () => {
        const data = {
            username: username
        }
        PutUserData(token, data)
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
                <Typography variant='h3' sx={{ color: '#ffffff' }}>Edit Account Information</Typography>
                <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px', color: '#ffffff' }}>Username</Typography>
                <Box component="form" sx={{ mt: 1 }}>
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
                </Box>
            </Container>


        </Box>
    );
};

export default Settings;