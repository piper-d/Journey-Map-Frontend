import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Map from './Map';

interface CardData {
    title: string;
    details: any;
    point_coords: any;
    date: string;
    timestamp: any;
}

interface TripPageProps {
    card: CardData;
}

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

const TripPage = () => {
    const location = useLocation();
    const { card }: TripPageProps = location.state;

    console.log(card)

    return (
        <>
            <Card>
                <CardContent>
                    <Map trips={card.point_coords} />
                    <Typography gutterBottom variant="h5" component="h2" sx={{ marginTop: 1 }}>
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
                </CardContent>
            </Card>
        </>
    );
};

export default TripPage;