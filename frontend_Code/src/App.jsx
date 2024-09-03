import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword';
import URLShortner from './Components/URLShortner';
import Dashboard from './Components/Dashboard';
import URLTable from './Components/URLTable';
import Navbar from './Components/Navbar';
import ResetPassword from './Components/ResetPassword';
import Activated from './Utilities/Activated';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/shorten" element={<URLShortner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/urls" element={<URLTable />} />
            <Route path="/activate/:token" element={<Activated />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
