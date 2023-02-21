import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { getAuth } from "firebase/auth";

const Dashboard: React.FunctionComponent<any> = (token) => {
    const [data, setData] = useState<any>();
    const [name, setName] = useState<string>();

    async function fetchData(token: any) {
        const response = await axios.get(`http://localhost:8080/user/`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        setName(await response.data.username)
    }

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, []);

    return (
        <div>
            Welcome {name}
        </div>
    );
};

export default Dashboard;