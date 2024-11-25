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
                <div className='d-flex justify-between items-center gap-4 bg-gray-950 py-2 text-white container-fluid mobileview'>
                    <div className="d-flex flex-wrap items-center gap-4 container-fluid">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/chat">Chat</Link>
                        <Link to="https://myportfoliobyvikassingh.netlify.app" className='text-capitalize' target='_blank'>
                            Visit Myportfolio
                        </Link>
                    </div>
                    <div className="d-flex flex-wrap justify-end items-center gap-4 text-capitalize container-fluid smallviewpostion">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className='btn btn-danger btn-sm'>
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className='btn btn-primary btn-sm'>Log in</button>
                                </Link>
                                <Link to="/registration">
                                    <button className='btn btn-sm btn-success'>Registration</button>
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
