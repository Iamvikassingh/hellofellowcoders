import React, { useState } from 'react';
import axios from 'axios';
import studentillustrator from '../../assets/studentundraw.svg';

const StudentRegistration = () => {
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});

    const handleStudentChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const validateStudentForm = () => {
        const newErrors = {};
        if (!studentData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!studentData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!studentData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (studentData.password !== studentData.confirmPassword) newErrors.password = 'Passwords must match';
        if (!studentData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone number must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        if (validateStudentForm()) {
            try {
                // console.log('Sending data:', JSON.stringify(studentData, null, 2));
                const response = await axios.post('http://localhost:8000/api/users/registerstudent', studentData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Student registration success:', response.data);
            } catch (error) {
                console.error('Student registration error:', error);
            }
        }
    };

    return (
        <section>
            <div className="container-fluid imageareaforteacher col-11 my-8 rounded-3xl d-flex justify-between py-2 bg-dark">
                <div className="container-fluid imageareacontrol items-center justify-center d-flex">
                    <img src={studentillustrator} className='img-fluid imagesizecontroller' alt="Student illustration" />
                </div>
                <div className="text-white text-justify p-2 textareacontrol">
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
                            <form onSubmit={handleStudentSubmit}>
                                <div className="mb-3 d-flex gap-2 items-center formresponsive">
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
                                    <label htmlFor="exampleInputPassword4" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword4"
                                        name="confirmPassword"
                                        value={studentData.confirmPassword}
                                        onChange={handleStudentChange}
                                    />
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
