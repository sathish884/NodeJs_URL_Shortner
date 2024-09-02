import React, { useState } from 'react';
import axios from 'axios';

function URLShortner() {
    const [originalURL, setOriginalURL] = useState('');
    const [shortURL, setShortURL] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/api/urls/shorten',
                { originalURL },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setShortURL(response.data.shortURL);
        } catch (err) {
            console.error('Shorten URL Error:', err.response.data.message);
        }
    };
    return (
        <>
            <div className="url-shortener">
                <h2>Shorten URL</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={originalURL}
                        onChange={(e) => setOriginalURL(e.target.value)}
                        required
                    />
                    <button type="submit">Shorten</button>
                </form>
                {shortURL && (
                    <div>
                        <p>Short URL: {shortURL}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default URLShortner