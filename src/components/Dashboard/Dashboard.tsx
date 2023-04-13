import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadScript } from '@react-google-maps/api';
import CardGrid from '../CardGrid';
import { Typography, Box, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import topo from '../../images/SpoonGraphics-Topographic-Map-4.png'


const Dashboard: React.FunctionComponent<any> = (token) => {
    const [trips, setTrips] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

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
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper sx={{
            backgroundImage: `url(${topo})`,
            backgroundRepeat: 'repeat',
            minHeight: '100vh',
        }}>
            {trips.trips === "you currently have no trips" ? (
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h5" color='white' sx={{marginTop: 10}}>
                        Create a trip using our mobile app
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <CardGrid cards={trips} />
                </Box>
            )}
        </Paper>
    );
};

export default Dashboard;
