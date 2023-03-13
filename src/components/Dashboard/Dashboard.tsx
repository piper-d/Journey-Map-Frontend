import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map';


const Dashboard: React.FunctionComponent<any> = (token) => {
    const [name, setName] = useState<string>();
    const [trips, setTrips] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    console.log(axios.defaults.baseURL)

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
                console.log(response.data)
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
        <div>
            <Map trips={trips[0]} />
        </div>
    );
};

export default Dashboard;