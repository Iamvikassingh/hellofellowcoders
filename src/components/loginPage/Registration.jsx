import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import teacherillustrator from '../../assets/loginsvg.svg';
import Logoarea from '../logoarea/Logoarea';
import Navbar from '../navbar/Navbar';
import StudentRegistration from './Studentregistration';

const Registration = () => {
    const [isTeacher, setIsTeacher] = useState(true);
    const [teacherData, setTeacherData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        subject: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState(null);

    const changeRegistrationForm = (formType) => {
        setIsTeacher(formType === 'teacher');
    };

    const handleTeacherChange = (e) => {
        setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    };

    const validateTeacherForm = () => {
        const newErrors = {};
        if (!teacherData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!teacherData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!teacherData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (teacherData.password !== teacherData.confirmPassword) newErrors.password = 'Passwords must match';
        if (!teacherData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!/^\d{10}$/.test(teacherData.phone)) newErrors.phone = 'Phone number must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTeacherSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);

        if (validateTeacherForm()) {
            try {
                // console.log('Sending data:', JSON.stringify(teacherData, null, 2));
                const response = await axios.post('http://localhost:8000/api/users/registerteacher', teacherData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Teacher registration success:', response.data);
            } catch (error) {
                console.error('Teacher registration error:', error);

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
        <>
            <section>
                <Logoarea />
            </section>
            <section>
                <Navbar />
            </section>
            <section>
                <div className="container">
                    <div className="registration-heading-area">
                        <h1 className='text-4xl text-light text-center font-bold my-4 text-capitalize font-serif'>Registration</h1>
                    </div>
                    <div className="container-fluid">
                        <div className="container-fluid choose-button-area gap-4 d-flex items-center justify-center">
                            <button
                                className={`btn btn-primary text-capitalize ${isTeacher ? 'active' : ''}`}
                                onClick={() => changeRegistrationForm('teacher')}>
                                Teacher Registration
                            </button>
                            <button
                                className={`btn btn-success text-capitalize ${!isTeacher ? 'active' : ''}`}
                                onClick={() => changeRegistrationForm('student')}>
                                Student Registration
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {isTeacher ? (
                <section>
                    <div className="container-fluid imageareaforteacher col-11 my-8 rounded-3xl d-flex justify-between py-2 bg-dark">
                        <div className="container-fluid imageareacontrol items-center justify-center d-flex">
                            <img src={teacherillustrator} className='img-fluid imagesizecontroller' alt="Teacher illustration" />
                        </div>
                        <div className="text-white text-justify p-2 textareacontrol">
                            <div className="container-fluid">
                                <h1 className='text-gray-100 text-4xl text-center text-capitalize my-4 font-bold'>Teacher Registration</h1>
                            </div>
                            <div className="container-fluid">
                                <div className="w-100">
                                    <p className='text-white text-capitalize text-md my-5'>
                                        Join Hellofellowcoder as a teacher and inspire the next generation of coders! Register now to share your expertise, mentor aspiring developers, and make a difference in their coding journey. Together, let's build a vibrant coding community!
                                    </p>
                                    {submissionError && <p className="text-light">{submissionError}</p>}
                                    <form onSubmit={handleTeacherSubmit}>
                                        <div className="mb-3 d-flex gap-2 items-center formresponsive">
                                            <label htmlFor="teacherFirstName" className="form-label text-left">FirstName</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="teacherFirstName"
                                                name="firstName"
                                                value={teacherData.firstName}
                                                onChange={handleTeacherChange}
                                            />
                                            {errors.firstName && <p className="text-danger">{errors.firstName}</p>}

                                            <label htmlFor="teacherLastName" className="form-label text-left">LastName</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="teacherLastName"
                                                name="lastName"
                                                value={teacherData.lastName}
                                                onChange={handleTeacherChange}
                                            />
                                            {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                name="email"
                                                value={teacherData.email}
                                                onChange={handleTeacherChange}
                                            />
                                            {errors.email && <p className="text-danger">{errors.email}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                name="password"
                                                value={teacherData.password}
                                                onChange={handleTeacherChange}
                                            />
                                            {errors.password && <p className="text-danger">{errors.password}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword2"
                                                name="confirmPassword"
                                                value={teacherData.confirmPassword}
                                                onChange={handleTeacherChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputSubject" className="form-label">Subject Teacher</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputSubject"
                                                name="subject"
                                                value={teacherData.subject}
                                                onChange={handleTeacherChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPhone" className="form-label">Phone number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPhone2"
                                                name="phone"
                                                value={teacherData.phone}
                                                onChange={handleTeacherChange}
                                                maxLength={10}
                                                placeholder="Enter a 10-digit phone number"
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
            ) : (
                <StudentRegistration />
            )}
        </>
    );
};

export default Registration;
