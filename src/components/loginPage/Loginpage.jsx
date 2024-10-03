import React from 'react'
import './Login.css'
import Logoarea from '../logoarea/Logoarea'
import Navbar from '../navbar/Navbar'
import loginimagesvg from '../../assets/loginsvg.svg'

const Loginpage = () => {
    return (
        <>
            <section>
                <Logoarea />
            </section>
            <section>
                <Navbar />
            </section>
            <section>
                <div className="container-fluid  justify-center d-flex text-black">
                    <div className="container my-10 ">
                        <h1 className='text-center text-4xl font-bold font-serif text-capitalize my-4 text-light'>
                            Student/Teacher log-in
                        </h1>
                        <div className="container-fluid outerloginpagebox col-10 p-5 rounded-3xl d-flex ">
                            <img src={loginimagesvg} className='img-fluid w-80' alt="loginimagesvg" />
                            <div className="innerloginpage p-4 w-100">
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">Check me out if all detail are true</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Loginpage
