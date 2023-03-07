import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map';


const Dashboard: React.FunctionComponent<any> = (token) => {
    const [name, setName] = useState<string>();
    const [trips, setTrips] = useState<any>(null);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyC4xjHUUPNEeESInI-7NjLT7EthDehnFJE"
    });

    

    async function fetchUserData(token: any) {
        const response = await axios.get(`http://localhost:8080/user/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        setName(await response.data.username)
    }

    async function fetchTripData(token: any) {
        const response = await axios.get(`http://localhost:8080/trips/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        console.log("Trip Response")
        console.log(response.data)
        setTrips(response.data)
    }

    useEffect(() => {
        if (token) {
            fetchUserData(token);
            fetchTripData(token);
        }
    }, [token]);

    if (!isLoaded) return <div>Loading...</div>


    return (
        <div>
            <Map trips={trips[0]}/>
        </div>
    );
};

export default Dashboard;