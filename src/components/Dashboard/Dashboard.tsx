import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadScript } from '@react-google-maps/api';
import CardGrid from '../CardGrid';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Dashboard: React.FunctionComponent<any> = (token) => {
    const [trips, setTrips] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    function fetchTripData(token: any) {
        axios.get(`/trips/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        })
            .then((response => {
                setTrips(response.data)
                setLoading(false)
            }));
    }

    useEffect(() => {
        if (token) {
            fetchTripData(token);
        }
    }, [token]);

    if (!isLoaded || isLoading) {
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt:5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {trips.trips === "you currently have no trips" ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                    <Typography variant="h5">
                        Create a trip using our mobile app
                    </Typography>
                </Box>
            ) :
                <CardGrid cards={trips} />
            }
        </>
    );
};

export default Dashboard;
