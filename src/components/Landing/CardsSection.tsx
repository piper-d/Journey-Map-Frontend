import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShareIcon from '@mui/icons-material/Share';



export default function CardsSection() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const backgroundColor = isDarkMode ? theme.palette.background.default : '#fff';
    const cardColor = isDarkMode ? '#383B44' : '#fff';
    const textColor = theme.palette.text.primary;

    return (
        <Box sx={{ backgroundColor, paddingTop: 10, paddingBottom: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{
                            backgroundColor: cardColor,
                            boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            minHeight: '250px',
                            paddingX: '25px'
                        }}>
                            <CardContent >
                                <FavoriteIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom sx={{ marginTop: 4, color: textColor }}>
                                    Save Your Memories
                                </Typography>
                                <Typography variant="body1">
                                    Keep track of your memories and experiences in one place, making it easy to look back and reminisce.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{
                            backgroundColor: cardColor,
                            boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            minHeight: '250px',
                            paddingX: '25px'
                        }}>
                            <CardContent>
                                <AddAPhotoIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom sx={{ marginTop: 4, color: textColor }}>
                                    Pinpoint Image Locations
                                </Typography>
                                <Typography variant="body1">
                                    Easily upload images and place them in the exact location on your trip, creating a visual diary of your journey.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{
                            backgroundColor: cardColor,
                            boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            minHeight: '250px',
                            paddingX: '25px'
                        }}>
                            <CardContent>
                                <ShareIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom sx={{ marginTop: 4, color: textColor }}>
                                    Share with Friends
                                </Typography>
                                <Typography variant="body1">
                                    Share your adventures with friends and family, inspiring them to create their own unforgettable memories.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
