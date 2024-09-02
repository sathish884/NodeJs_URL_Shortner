import React, { useState } from 'react';
import axios from 'axios';

function ForgetPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/forgot-password', { email });
            alert('Check your email for instructions to reset your password.');
        } catch (err) {
            console.error('Forgot Password Error:', err.response.data.message);
        }
    };
    return (
        <>
            <div className="forgot-password">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword