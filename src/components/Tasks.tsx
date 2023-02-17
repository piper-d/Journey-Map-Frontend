import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

export default function Tasks(props: any) {
    const [trip, setTrip] = useState<any>([])

    async function fetchData(token: any) {
        const response = await axios.get(`http://localhost:8080/trips/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
    }

    useEffect(() => {
        if (props.token) {
            fetchData(props.token);
        }
    }, []);

    return (
        <div>
            <p>Check your console!</p>
        </div>
    )
}