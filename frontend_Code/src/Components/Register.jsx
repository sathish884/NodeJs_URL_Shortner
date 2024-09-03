import React, { useState } from 'react';
import axios from 'axios';
import { Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api'


function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ firstName, lastName, email, password })
            // await axios.post('/api/auth/register', { firstName, lastName, email, password });
            alert('Registration successful. Please check your email to activate your account.');
            navigate('/');

        } catch (err) {
            console.error('Registration Error:', err.response.data.message);
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-3">
                <div className="row justify-content-center w-100">
                    <div className="card p-5 mx-auto" style={{ maxWidth: '35rem' }}>
                        <h5 className='text-center'>Register</h5>
                        <form onSubmit={handleSubmit}>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className='form-label' htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <button type='submit' className='btn btn-primary w-100' >Register</button>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12 d-flex justify-content-between">
                                    <Link to={'/'} style={{ fontSize: '16px' }}>Click here to login</Link>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register