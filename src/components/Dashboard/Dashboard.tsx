import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadScript } from '@react-google-maps/api';
import CardGrid from '../CardGrid';
import Map from '../Map';
import { Typography } from '@mui/material';


const Dashboard: React.FunctionComponent<any> = (token) => {
    const [name, setName] = useState<string>();
    const [trips, setTrips] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    async function fetchUserData(token: any) {
        const response = await axios.get(`/user/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        setName(await response.data.username)
    }

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
            fetchUserData(token);
            fetchTripData(token);
        }
    }, [token]);

    if (!isLoaded) return <div>Loading...</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            {trips.trips === "you currently have no trips" ? (
                <>
                    <Typography>
                        No trips to show 
                    </Typography>
                </>
            ) :
                <>
                    <CardGrid cards={trips} />
                </>
            }
        </>
    );
};

export default Dashboard;