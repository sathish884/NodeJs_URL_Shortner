import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword';

function AuthRouters() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/forget-password' element={<ForgetPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/register-user' element={<Register />} />
                </Routes>
            </Router>
        </>
    )
}

export default AuthRouters