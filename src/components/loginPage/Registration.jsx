import React, { useState } from 'react'
import './Registration.css'
import teacherillustrator from '../../assets/teachingastudent.png'
import studentillustrator from '../../assets/studentimg.png'
import Logoarea from '../logoarea/Logoarea'
import Navbar from '../navbar/Navbar'

const Registration = () => {
    const [isTeacher, setIsTeacher] = useState(true); // Set teacher as default

    const changeRegistrationForm = (formType) => {
        setIsTeacher(formType === 'teacher');
    }

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
                        <h1 className='text-3xl text-light text-center font-bold my-4 text-capitalize'>
                            Registration
                        </h1>
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
                <>
                    {/* Teacher registration page */}
                    <section>
                        <div className="container-fluid imageareaforteacher col-10 my-8 rounded-3xl d-flex justify-between py-2">
                            <div className="container-fluid imageareacontrol items-center justify-center d-flex">
                                <img src={teacherillustrator} className='img-fluid imagesizecontroller' alt="Teacher illustration" />
                            </div>
                            <div className="text-white text-justify p-2 textareacontrol">
                                <div className="container-fluid">
                                    <h1 className='text-gray-900 text-4xl text-center text-capitalize my-4 font-bold'>
                                        Teacher Registration
                                    </h1>
                                </div>
                                <div className="container-fluid">
                                    <div className="w-100">
                                        <p className='text-white text-capitalize  text-md my-5'>
                                            Join Hellofellowcoder as a teacher and inspire the next generation of coders! Register now to share your expertise, mentor aspiring developers, and make a difference in their coding journey. Together, let's build a vibrant coding community!
                                        </p>
                                        <form>
                                            <div className="mb-3 d-flex gap-2 items-center formresponsive">
                                                <label for="teacherName" className="form-label">FirstName</label>
                                                <input type="text" className="form-control" id="teacherFirstName" placeholder="Enter your First Name"/>
                                                
                                                <label for="teacherName" className="form-label">LastName</label>
                                                <input type="text" className="form-control" id="teacherLastName" placeholder="Enter your Last Name"/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Subject Teacher</label>
                                                <input type="text" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Phone number</label>
                                                <input type="tel" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="mb-3 form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Check me out if all field are correct </label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    {/* Student registration page */}
                    <section>
                        <div className="container-fluid imageareaforteacher col-10 my-8 rounded-3xl d-flex justify-between">
                            <div className="container-fluid imageareacontrol items-center justify-center d-flex">
                                <img src={studentillustrator} className='img-fluid imagesizecontroller' alt="Student illustration" />
                            </div>
                            <div className="text-white text-justify p-2 textareacontrol">
                                <div className="container-fluid">
                                    <h1 className='text-gray-900 text-4xl text-center text-capitalize my-4 font-bold'>
                                        Student Registration
                                    </h1>
                                </div>
                                <div className="container-fluid">
                                    <div className="w-100">
                                        <p className='text-white text-capitalize  text-md my-5'>
                                            Join Hellofellowcoder as a student and unlock your coding potential! Register now to learn from experienced instructors, enhance your skills, and embark on an exciting journey in programming. Start learning today and become a part of our thriving coding community!
                                        </p>
                                        <form>
                                            <div className="mb-3 d-flex gap-2 items-center formresponsive">
                                                <label for="teacherName" className="form-label">FirstName</label>
                                                <input type="text" className="form-control" id="teacherFirstName" placeholder="Enter your First Name"/>
                                                
                                                <label for="teacherName" className="form-label">LastName</label>
                                                <input type="text" className="form-control" id="teacherLastName" placeholder="Enter your Last Name"/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Phone number</label>
                                                <input type="tel" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="mb-3 form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Check me out if all field are correct </label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default Registration;
