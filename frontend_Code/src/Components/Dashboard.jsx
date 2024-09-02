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
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="card dashboard p-5 text-center" style={{ width: '18rem' }}>
                        <h5 className="card-title">Dashboard</h5>
                        <p>Total Clicks: {totalClicks}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard