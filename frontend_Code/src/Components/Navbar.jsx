import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/shorten">Shorten URL</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/urls">My URLs</Link>
            </nav>
        </>
    )
}

export default Navbar