import React from 'react';
import Map from './Map';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

function viewTrip(trip: object) {
    console.log(trip)
}

const CardGrid = ({ cards }: CardGridProps) => {
    const navigate = useNavigate();

    const handleViewTrip = (card: CardData) => {
        // Navigate to the new page with the `card` prop in the state
        navigate('/trip', { state: { card } });
    };
    return (
        <>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                        <Card >
                            <CardContent sx={{}}>
                                <Map trips={card.point_coords} />
                                <Typography gutterBottom variant="h5" component="h2" sx={{marginTop: 1}}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Average Speed: {Math.round(card.details.average_speed_mph)} mph
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Distance Traveled: {Math.round(card.details.distance_traveled_miles)} miles
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {formatDate(card.details.start_time)}
                                </Typography>
                                <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => handleViewTrip(card)}>
                                    View Trip
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>

    );
};

export default CardGrid;
