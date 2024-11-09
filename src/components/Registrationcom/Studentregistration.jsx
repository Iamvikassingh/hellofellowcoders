import React, { useState } from 'react';
import axios from 'axios';
import studentillustrator from '../../assets/studentundraw.svg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StudentRegistration = () => {
    const sendUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState(null);
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });


    const handleStudentChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const validateStudentForm = () => {
        const newErrors = {};
        if (!studentData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!studentData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!studentData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (!studentData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone number must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        if (validateStudentForm()) {
            try {
                // console.log('Sending data:', JSON.stringify(studentData, null, 2));
                const response = await axios.post(`${sendUrl}/api/users/registerstudent`, studentData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                toast.success('Student registered successfully!', { autoClose: 3000 });
                console.log('Student registration success:', response.data);

                setTimeout(() => navigate('/login'), 4000);

            } catch (error) {
                console.error('Student registration error:', error);
                if (error.response) {
                    console.error('Response error data:', error.response.data);
                    setSubmissionError(error.response.data.error || 'Unable to register. Please try again later.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    setSubmissionError('Network error. Please check your connection and try again.');
                } else {
                    console.error('Error setting up the request:', error.message);
                    setSubmissionError('An unexpected error occurred. Please try again.');
                }
            }
        }
    };

    return (
        <section>
            <ToastContainer />
            <div className="container-fluid imageareaforteacher col-11 my-8 rounded-3xl d-flex justify-between py-2 bg-dark gap-4">
                <div className="container-fluid imageareacontrol items-center justify-center d-flex flex-col gap-2 rounded-xl">
                    <img src={studentillustrator} className='img-fluid imagesizecontroller' alt="Student illustration" width={200} />
                    <div className="text-center text-capitalize text-white font-serif font-bold text-2xl">
                        Student
                    </div>
                </div>
                <div className="text-white text-justify py-4 bg-gray-900 rounded-xl textareacontrol">
                    <div className="container-fluid">
                        <h1 className='text-gray-100 text-4xl text-center text-capitalize my-4 font-bold'>
                            Student Registration
                        </h1>
                    </div>
                    <div className="container-fluid">
                        <div className="w-100">
                            <p className='text-white text-capitalize  text-md my-5'>
                                Join Hellofellowcoder as a student and enhance your coding skills! Register now to gain access to resources, connect with mentors, and grow as a developer. Embark on your coding journey today!
                            </p>
                            {submissionError && <p className="text-danger my-3">{submissionError}</p>}
                            <form onSubmit={handleStudentSubmit}>
                                <div className="mb-3 d-flex gap-2 flex-col formresponsive">
                                    <label htmlFor="studentFirstName" className="form-label text-left">FirstName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="studentFirstName"
                                        name="firstName"
                                        value={studentData.firstName}
                                        onChange={handleStudentChange}
                                    />
                                    {errors.firstName && <p className="text-danger">{errors.firstName}</p>}

                                    <label htmlFor="studentLastName" className="form-label text-left">LastName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="studentLastName"
                                        name="lastName"
                                        value={studentData.lastName}
                                        onChange={handleStudentChange}
                                    />
                                    {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail2"
                                        name="email"
                                        value={studentData.email}
                                        onChange={handleStudentChange}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword3" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword3"
                                        name="password"
                                        value={studentData.password}
                                        onChange={handleStudentChange}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPhone2" className="form-label">Phone number</label>
                                    <input
                                        type="phone"
                                        className="form-control"
                                        id="exampleInputPhone2"
                                        name="phone"
                                        value={studentData.phone}
                                        onChange={handleStudentChange}
                                    />
                                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentRegistration;
