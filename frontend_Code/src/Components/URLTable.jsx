import React, { useState, useEffect } from 'react';
import axios from 'axios';

function URLTable() {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchURLs = async () => {
            try {
                const response = await axios.get('/api/urls', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUrls(response.data);
            } catch (err) {
                console.error('Fetch URLs Error:', err.response.data.message);
            }
        };

        fetchURLs();
    }, []);

    return (
        <>
            <div className="url-table">
                <h2>My URLs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short URL</th>
                            <th>Click Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url._id}>
                                <td>{url.originalURL}</td>
                                <td>{url.shortURL}</td>
                                <td>{url.clickCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default URLTable