import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='container mt-5'>
            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Welcome to Auth System!</h2>
                        <p>This is an incredible authentication system with production level featured</p>
                        <Link className="btn btn-outline-light" to="/login" role="button">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;