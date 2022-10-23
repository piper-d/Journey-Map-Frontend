import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

export default function Tasks(props: any) {
    const [tasks, setTasks] = useState<any[]>([])

    async function fetchData(token: any) {
        const response = await axios.get('http://localhost:8080/dummy', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTasks(response.data.tasks)
        console.log(response)
    }

    useEffect(() => {
        if (props.token) {
            fetchData(props.token);
        }
    }, []);

    return (
        <div>{tasks.map((task, index) => (
            <p key={index}>{task.title}</p>
        ))}</div>
    )
}