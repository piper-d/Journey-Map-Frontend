import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import darkBackground from '../../images/darkTopo.jpg';
import lightBackground from '../../images/lightTopo.jpg';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function Contact() {
    const theme = useTheme();
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Add API post call using axios
        axios.post('/contact/', formData)
            .then(response => {
                if (response.status === 200) {
                    setSuccessMessage('Email has been sent.');
                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    });
                } else {
                    setSuccessMessage('Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.log(error);
                setSuccessMessage('Something went wrong. Please try again.');
            });
    };

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
                        Contact Us
                    </Typography>
                    <Typography color="success.main">{successMessage}</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="message"
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    sx={{ fontSize: "18px", fontWeight: 600, boxShadow: 3, marginTop: 2, paddingTop: 1.75, paddingBottom: 1.75 }}
                                    type="submit"
                                    size="large"
                                    fullWidth
                                    variant="contained"
                                >
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </Paper>
    );
}
