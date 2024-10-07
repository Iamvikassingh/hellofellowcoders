import React from 'react'
import logoforapp from '../../assets/hellologo.png'
import './Logo.css'


const Logoarea = () => {
    return (
        <>
            <div className="HelloCodersLogo d-flex items-center bg-dark justify-between flex-wrap">
                <div className="leftcontainer d-flex items-center flex-wrap">
                    <img src={logoforapp} className='img-fluid' alt="HelloFellowCoder's" />
                    <h1 className='text-capitalize text-ligth font-bold  text-light text-lg'>
                        <i className="bi bi-chevron-left text-sm"></i>
                        HelloFellowCoder's /
                        <i className="bi bi-chevron-right text-sm "></i>
                    </h1>
                </div>
                <div className="rightcontainer">
                    <h1 className='text-capitalize text-light text-lg mx-2 text-center'>
                        <i className="bi bi-exclamation-circle text-sm  font-bold mx-2"></i>
                        Created By Vikas Singh 😊
                    </h1>
                </div>
            </div>
        </>
    )
}

export default Logoarea
