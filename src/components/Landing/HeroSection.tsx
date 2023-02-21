import React from 'react'
import { Paper, Container, Grid, Typography } from '@mui/material';
import background from '../../images/background.png'

export default function HeroSection() {
    return (
        <Paper
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
                        <Typography sx={{ fontWeight: 'ExtraBold', fontSize: 32}}>Remember Your Journey</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 64 }}>The Best Way To Capture Your Journey</Typography>
                        <Typography sx={{ fontWeight: 'medium', fontSize: 24 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                    </Grid>

                </Grid>
            </Container>
        </Paper>
    )
}
