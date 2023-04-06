import React from 'react';
import { Paper, Container, Grid, Typography, Box } from '@mui/material';
import background from '../../images/background.png';
import rightImage from '../../images/iphoneTesting2.png';
import qrcode from '../../images/My_App.png'
import { useTheme } from '@mui/material/styles';

import { GooglePlayStoreIcon, AppStoreIcon } from '../AppStoreButtons/Buttons';

export default function HeroSection() {
    const overlayOpacity = 0.5;
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    console.log(isDarkMode)
    const polygonFillColor = isDarkMode ? '#1E1E1E' : 'white';

    return (
        <Box
            sx={{
                height: '80vh',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, ' + overlayOpacity + ')',
                }}
            ></Box>
            <Container maxWidth="xl" sx={{ height: '100%', zIndex: 1, position: 'relative' }}>
                <Grid container alignItems="center" sx={{ height: '100%' }}>
                    <Grid item xs={8}>
                        <Typography
                            variant="h1"
                            align="left"
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Arial, sans-serif',
                                color: '#FFF',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            Journey Map
                        </Typography>
                        <Typography
                            variant="h6"
                            align="left"
                            sx={{
                                mt: 1,
                                fontFamily: 'Arial, sans-serif',
                                color: '#FFF',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            A new and innovative way to track your memories and share them with friends
                        </Typography>
                        <Typography
                            variant="h6"
                            align="left"
                            sx={{
                                mt: '2rem',
                                fontFamily: 'Arial, sans-serif',
                                color: '#FFF',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            Download our app!
                        </Typography>
                        <img src={qrcode} alt="QR Code" style={{ width: '25%', height: 'auto', marginTop: '1rem' }} />

                    </Grid>
                    <Grid item xs={4} sx={{ zIndex: 2 }}>
                        <img src={rightImage} alt="Right-side image" style={{ width: '110%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Container>
            <Box
                component="svg"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 'auto',
                    zIndex: 2,
                }}
            >
                <polygon points="0,10 100,0 100,10" fill={polygonFillColor} />
            </Box>
        </Box >
    );
}
