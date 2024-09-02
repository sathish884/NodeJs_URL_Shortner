import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    const user = JSON.parse(localStorage.getItem('userObj'));

    const logout = () => {
        localStorage.removeItem('userObj');
        localStorage.removeItem('token');
        window.location.href = '/'
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
                                    {/* <Link to="/das">Home</Link> */}
                                    <Link to="/shorten">Shorten URL</Link>
                                    <Link to="/dashboard">Dashboard</Link>
                                    <Link to="/urls">My URLs</Link>
                                    <div className="dropdown" style={{ position: 'relative' }}>
                                        <button className="btn btn-secondary me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.name}
                                        </button>
                                        <ul className="dropdown-menu" style={{ position: 'absolute', left: '-50px' }}>
                                            <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                                        </ul>
                                    </div>

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