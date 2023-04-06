import React from 'react';
import Map from './Map';
import { Card, CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import topo from '../images/SpoonGraphics-Topographic-Map-4.png'

interface CardData {
    title: string;
    details: any;
    point_coords: any;
    date: string;
    timestamp: any;
};

interface CardGridProps {
    cards: CardData[];
};

function formatDate(timestamp: any): string {
    if (typeof timestamp === 'object') {
        timestamp = timestamp._seconds
    } else {
        timestamp = timestamp / 1000
    }

    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return `Time: ${formattedTime.toString()} ${formattedDate.toString()}`;
}

const CardGrid = ({ cards }: CardGridProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const backgroundColor = isDarkMode ? theme.palette.background.default : '#fff';
    const cardColor = isDarkMode ? '#1E1E1E' : '#fff';

    const handleViewTrip = (card: CardData) => {
        // Navigate to the new page with the `card` prop in the state
        localStorage.setItem('card', JSON.stringify(card));
        navigate('/trip');
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${topo})`,
                backgroundRepeat: 'repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Grid container spacing={3} maxWidth='xl' sx={{marginTop: 10}}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                        <Card
                            sx={{
                                backgroundColor: cardColor,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)', // Add boxShadow for shadow effect
                                transition: 'all 0.15s ease-out', // Add transition for smooth effect
                                '&:hover': {
                                    boxShadow: '0 8px 14px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.12)', // Add boxShadow on hover for shadow effect
                                },
                            }}>
                            <CardContent sx={{}}>
                                <Map trip={card} />
                                <Typography gutterBottom variant="h5" component="h2" sx={{ marginTop: 1 }}>
                                    {card.title}
                                </Typography>
                                <Grid container spacing={6}>
                                    <Grid item>
                                        <Typography variant="body1" color="text.secondary">
                                            Average Pace: {card.details.average_speed} / mile
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Duration: {Math.round(card.details.duration / 60)} minutes
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" color="text.secondary">
                                            Distance Traveled: {Math.round(card.details.distance * 100) / 100} miles
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" >
                                            {formatDate(card.details.start_time)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                               

                            <Button variant="contained" fullWidth sx={{ marginTop: 4 }} onClick={() => handleViewTrip(card)}>
                                View Trip
                            </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
};

export default CardGrid;
