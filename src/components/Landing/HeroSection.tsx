import React from 'react'
import { Paper, Container, Grid, Typography, Box } from '@mui/material';
import background from '../../images/background.png'

export default function HeroSection() {
    return (
        <Box
            sx={{
                height: "90vh",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Container maxWidth="xl" sx={{ height: "100%", }}>
                <Grid container alignItems="center" sx={{ height: "100%" }} >
                    <Grid item xs={8}>
                        <Typography variant="h4" align="left" sx={{ mt: 1 }}>Remember Your Journey</Typography>
                        <Typography variant="h2" align="left" sx={{ fontWeight: 'bold' }}>The Best Way To Capture Your Journey</Typography>
                        <Typography variant="h5" align="left" sx={{ mt: 1 }}>Welcome to Journey Map, the ultimate platform for tracking and sharing your adventures! Our web and mobile application makes it easy to track your journey using GPS and add photos and videos to create a dynamic map of your experience. Download and save your journey as an .mp4 file to relive your adventure anytime. Join the Journey Map community today and start capturing and sharing your unforgettable moments!</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
