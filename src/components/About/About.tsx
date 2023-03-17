import React from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';
import logo from '../../images/logo.png'
import Grid from '@mui/material/Grid/Grid';
import phone from '../../images/MobilePhoneImage.png'
import { GooglePlayStoreIcon, AppStoreIcon } from '../AppStoreButtons/Buttons';


const About = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundImage: 'linear-gradient(35deg, rgba(255,138,0,1) 28%, rgba(218,27,96,1) 100%)',
                    color: '#fff',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item md={12} lg={8} sx={{ margin: 'auto', padding: 5 }}>
                            <Typography variant="h2" align="left" sx={{ fontWeight: 'bold' }}>
                                Welcome to Journey Map
                            </Typography>
                            <Typography variant="h4" align="left" sx={{ mt: 1 }}>
                                A new and innovative way to track your memories and share them with friends
                            </Typography>
                            <Grid container spacing={2} sx={{mt: 1}}>
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
        </>







        // <div>
        //     <Typography variant="h4" align="center" gutterBottom>
        //         Welcome to Journey Map
        //     </Typography>
        //     <Typography variant="h6" align="center" gutterBottom>
        //         A new and innovative way to track your memories and share them with friends
        //     </Typography>
        //     <Grid container spacing={3} marginTop={2}>
        //         <Grid item md={6} >
        //             <img src={logo} className='about-image' />
        //         </Grid>
        //         <Grid item md={6}>
        //             <Typography variant="body1" align="left" gutterBottom>
        //                 We are proud to introduce Journey Map, a web and mobile application that allows users to track their journeys and create a visual record of their experiences.
        //             </Typography>
        //             <Typography variant="body1" align="left" gutterBottom>
        //                 Our team, consisting of computer science students from the University of Central Florida, developed this project as part of our senior design program. We wanted to create an app that would allow users to easily track and share their journeys with others.
        //             </Typography>
        //             <Typography variant="body1" align="left" gutterBottom>
        //                 Journey Map uses GPS data to track the user's journey and create a map of their route. Users can add photos and videos to their journey, which will be displayed on the map at the location where they were taken. This feature allows users to create a visual record of their journey and relive their experiences.
        //             </Typography>
        //             <Typography variant="body1" align="left" gutterBottom>
        //                 In addition, users can download a .mp4 file that displays the route they took and the pictures that were added to the trip. This feature allows users to easily share their journey with others on social media or with family and friends.
        //             </Typography>
        //             <Typography variant="body1" align="left" gutterBottom>
        //                 Thank you for choosing Journey Map to capture your journey. We hope that our app will help you remember your adventures and share them with your loved ones.
        //             </Typography>
        //         </Grid>
        //     </Grid>

        // </div>
    );
};

export default About;