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
            <div className="container">
                <div className="row p-5 justify-content-center">
                    <div className="card p-5">
                        <div className="url-shortener d-flex justify-content-center align-items-center flex-md-column">
                            <h2 className='text-center mb-3'>Shorten URL</h2>
                            <form class="row g-3" onSubmit={handleSubmit}>

                                <div class="col-auto">
                                    <label for="inputPassword2" class="visually-hidden">Enter Url</label>
                                    <input type="text" class="form-control" placeholder="Enter URL" value={originalURL} onChange={(e) => setOriginalURL(e.target.value)} required />
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-3">Shorten</button>
                                </div>
                            </form>
                            {shortURL && (
                                <div>
                                    <p>Short URL: {shortURL}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default URLShortner