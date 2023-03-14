import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Map from './Map';
import { useNavigate } from 'react-router-dom';

interface CardData {
    title: string;
    details: any;
    id: any;
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
    const navigate = useNavigate();
    const { card }: TripPageProps = location.state;
    const token = sessionStorage.getItem("accessToken")
    const [apiResponse, setApiResponse] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    const handleExport = () => {
        setLoading(true)
        axios.get(`/trips/${card.id}/export`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response => {
                setLoading(false)
                setApiResponse(response.data.downloadLink);
            }))
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = () => {
        axios.delete(`/trips/${card.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response => {
                console.log(response)
                navigate('/home');
            }))
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Map trip={card} />
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
                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleExport}>
                        Export Video
                    </Button>
                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleDelete}>
                        Delete Trip
                    </Button>
                    {apiResponse && (
                        <Typography variant="body1" sx={{marginTop: 2}} color="text.secondary">
                            Download Link: <a href={apiResponse}>{apiResponse}</a>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default TripPage;