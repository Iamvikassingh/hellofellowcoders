import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            {/* All linking section is here */}
            <section>
                <div className='container-fluid d-flex justify-between gap-4 bg-gray-950 text-white py-2 itmes-center'>
                    <div className="container-fluid d-flex items-center gap-4">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="https://myportfoliobyvikassingh.netlify.app" className='text-capitalize' target='_blank'>Visit Myportfolio</Link>
                    </div>
                    <div className="container-fluid d-flex justify-end gap-4 text-capitalize">
                        <Link to="/login">
                            <button className='btn btn-primary'>
                                Log in
                            </button>
                        </Link>
                        <Link to="/registration">
                            <button className='btn btn-success'>
                                Registration
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Navbar
