import React, { useState } from 'react';
import './Logincss/Login.css';
import Logoarea from '../logoarea/Logoarea';
import Navbar from '../navbar/Navbar';
import loginimagesvg from '../../assets/loginsvg.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Loginpage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/users/logindetail', formData);

            if (response.status === 200) {
                const { name, email } = response.data;

                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify({ name, email }));
                toast.success("Login successful");
                setInterval(() => {
                    window.location.href = '/';
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred. Please try again.");
            setInterval(() => {
            }, 4000);
            console.error("Error posting login data:", error);
        }
    };


    return (
        <>
            <ToastContainer />
            <section>
                <Logoarea />
            </section>
            <section>
                <Navbar />
            </section>
            <section>
                <div className="container-fluid justify-center d-flex text-black">
                    <div className="container my-10">
                        <h1 className="text-wrap text-center text-4xl font-bold font-serif text-capitalize my-4 text-light">
                            Student/Teacher log-in
                        </h1>
                        <div className="container-fluid outerloginpagebox col-10 p-5 rounded-3xl d-flex formloginmobileview">
                            <img src={loginimagesvg} className="img-fluid w-80" alt="login" />
                            <div className="innerloginpage w-100">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">Remember me!</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Loginpage;
