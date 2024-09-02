import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function ResetPassword() {

    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/reset-password', { password });
            alert('Your password rested successfully.');
            navigate('/')
        } catch (err) {
            console.error('Login Error:', err.response.data.message);
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
                                    <label className='form-label' htmlFor="password">New Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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