import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('userObj', response.data);
            localStorage.setItem('token', response.data.token);
            onLogin();
            navigate('/dasboard')
        } catch (err) {
            console.error('Login Error:', err.response.data.message);
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-3">
                <div className="row justify-content-center w-100">
                    <div className="card p-5 mx-auto" style={{ maxWidth: '35rem' }}>
                        <h5 className='text-center'>Sign in</h5>
                        <p className='text-center'>For security, please sign in to access your information</p>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <button type='submit' className='btn btn-primary w-100'>Sign in</button>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 d-flex justify-content-between">
                                    <Link to={'/register'}>Create account</Link>
                                    <Link to={'/forgot-password'}><i className="bi bi-person-fill-lock"></i>&nbsp;Forget password</Link>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <hr className="flex-grow-1" />
                                    <p className="mx-3 mb-0">or sign in with</p>
                                    <hr className="flex-grow-1" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className="btn btn-outline-secondary w-100">
                                        <img src="imgs/google.webp" alt="Google" width={30} height={30} className="me-2" />
                                        <b>Google</b>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login