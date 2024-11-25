import React from 'react'
import logoforapp from '../../assets/hellologo.png'
import './Logo.css'


const Logoarea = () => {
    return (
        <>
            <div className="d-flex flex-wrap justify-between items-center bg-dark HelloCodersLogo">
                <div className="leftcontainer d-flex flex-wrap items-center">
                    <img src={logoforapp} className='img-fluid' alt="HelloFellowCoder's" />
                    <h1 className='font-bold font-sens text-lg text-light text-ligth text-capitalize'>
                        HelloFellowCoder's
                    </h1>
                </div>
                <div className="rightcontainer">
                    <h1 className='mx-2 text-center text-lg text-light text-capitalize'>
                        <i className="mx-2 font-bold text-sm bi bi-exclamation-circle"></i>
                        Created By Vikas Singh 😊
                    </h1>
                </div>
            </div>
        </>
    )
}

export default Logoarea
