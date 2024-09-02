import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

    const [totalClicks, setTotalClicks] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/urls/stats', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTotalClicks(response.data.totalClicks);
            } catch (err) {
                console.error('Fetch Stats Error:', err.response.data.message);
            }
        };

        fetchStats();
    }, []);

    return (
        <>
            <div className="dashboard">
                <h2>Dashboard</h2>
                <p>Total Clicks: {totalClicks}</p>
            </div>
        </>
    )
}

export default Dashboard