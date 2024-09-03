import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../api'

function ResetPassword() {

    const [gettokens, setGetToken] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const resetPassword = async ({ token, password }) => {
    //     const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
    //         token,
    //         password
    //     });
    //     return response.data;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword({ token: gettokens, password });
            console.log(response);
            alert('Your password was reset successfully.');
            navigate('/');
        } catch (err) {
            console.error('Reset Password Error:', err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-3">
                <div className="row justify-content-center w-100">
                    <div className="card p-5 mx-auto" style={{ maxWidth: '35rem' }}>
                        <h5 className='text-center'>Reset Password</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-5">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="gettokens">Token</label>
                                    <input type="text" className="form-control" name="gettokens" placeholder='Enter token' value={gettokens} onChange={(e) => setGetToken(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="password">New Password</label>
                                    <input type="password" className="form-control" name="password" placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <button type='submit' className='btn btn-primary w-100'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword