import React from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import phone from '../../images/MobilePhoneImage.png'
import { GooglePlayStoreIcon, AppStoreIcon } from '../AppStoreButtons/Buttons';


const About = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(35deg, rgba(255,138,0,1) 28%, rgba(218,27,96,1) 100%)',
                color: '#fff',
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="lg" sx={{ height: "100%", }}>
                <Grid container spacing={3} alignItems="center" sx={{ height: "100%" }}>
                    <Grid item md={12} lg={8} sx={{ px: 5 }}>
                        <Typography variant="h2" align="left" sx={{ fontWeight: 'bold' }}>
                            Welcome to Journey Map
                        </Typography>
                        <Typography variant="h4" align="left" sx={{ mt: 1 }}>
                            A new and innovative way to track your memories and share them with friends
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item sx={{ width: '200px' }}>
                                <a href="https://google.com" target="_blank" rel="noreferrer">
                                    <AppStoreIcon />
                                </a>
                            </Grid>
                            <Grid item sx={{ width: '200px' }}>
                                <a href="https://google.com" target="_blank" rel="noreferrer">
                                    <GooglePlayStoreIcon />
                                </a>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item md={12} lg={4} sx={{ my: 5 }}>
                        <img src={phone} className='about-image' />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;