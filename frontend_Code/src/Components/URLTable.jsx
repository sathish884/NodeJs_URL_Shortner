import React, { useState, useEffect } from 'react';
import axios from 'axios';

function URLTable() {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const fetchURLs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/urls', {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            <div className="container">
                <div className="row">
                    <div className="url-table">
                        <h2 className='text-center mb-5'>My URLs</h2>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Original URL</th>
                                        <th scope="col">Short URL</th>
                                        <th scope="col">Click Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls && urls.map((url) => (
                                        <tr key={url._id}>
                                            <td>{url.originalURL}</td>
                                            <td>{url.shortURL}</td>
                                            <td>{url.clickCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default URLTable