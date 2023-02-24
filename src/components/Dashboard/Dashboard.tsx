import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FunctionComponent<any> = (token) => {
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
    }, [token]);

    return (
        <div>
            Welcome {name}
        </div>
    );
};

export default Dashboard;