import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    const user = JSON.parse(sessionStorage.getItem('userObj'));

    const logout = () => {
        sessionStorage.removeItem('userObj');
        sessionStorage.removeItem('token');
        document.location.href = '/'
    }

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {user ? (
                                <>  
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shorten">Shorten URL</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/urls">My URLs</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/urls" onClick={logout}>Logout</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/register'}>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/'}>Login</Link>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar