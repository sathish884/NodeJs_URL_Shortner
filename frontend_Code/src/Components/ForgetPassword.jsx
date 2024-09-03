import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../api'

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('/api/auth/forgot-password', );
            await forgetPassword({ email })
            alert('Check your email for instructions to reset your password.');
            navigate('/reset-password');
        } catch (err) {
            console.error('Forgot Password Error:', err.response.data.message);
        }
    };
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-3">
                <div className="row justify-content-center w-100">
                    <div className="card p-5 mx-auto" style={{ maxWidth: '35rem' }}>
                        <h5 className='text-center'>Forgot Password</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <button type='submit' className='btn btn-primary w-100'>Send Reset Link</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword