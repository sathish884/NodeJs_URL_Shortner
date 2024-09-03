import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Activated() {

    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/auth/activate/${token}`);
                console.log(response);
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000); // Redirect to login page after 3 seconds
            } catch (err) {
                setError(err.response.data.message || 'Something went wrong');
            }
        };

        activateAccount();
    }, [token, navigate]);

    return (
        <>
            <div className="activation-container" role="alert">
                {message && <div className="alert alert-success text-center"><b>{message}</b></div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
            </div>
        </>
    )
}

export default Activated