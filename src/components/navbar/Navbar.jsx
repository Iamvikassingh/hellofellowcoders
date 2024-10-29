import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user data is present in local storage
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!userData);
    }, []);

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        toast.success("Logged out successfully!");
    };

    return (
        <>
            {/* All linking section is here */}
            <section>
                <div className='container-fluid mobileview d-flex justify-between gap-4 bg-gray-950 text-white py-2 items-center'>
                    <div className="container-fluid d-flex items-center gap-4 flex-wrap">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/chat">Chat</Link>
                        <Link to="https://myportfoliobyvikassingh.netlify.app" className='text-capitalize' target='_blank'>
                            Visit Myportfolio
                        </Link>
                    </div>
                    <div className="smallviewpostion container-fluid d-flex flex-wrap justify-end gap-4 text-capitalize">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className='btn btn-danger'>
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className='btn btn-primary'>Log in</button>
                                </Link>
                                <Link to="/registration">
                                    <button className='btn btn-success'>Registration</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Navbar;
