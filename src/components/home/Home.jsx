import { React, useState } from 'react'
import './Home.css'
import Logoarea from '../logoarea/Logoarea'
import Offlineonline from '../onlineoffline/Offlineonline';
import Navbar from '../navbar/Navbar';

function Home() {

    const [showInternetConn, setShowInternetConn] = useState(true);

    const showinternetconn = () => {
        const timer = setTimeout(() => {
            setShowInternetConn(false)
        }, 10000)
        return () => clearTimeout(timer)
    }
    showinternetconn();
    return (
        <>

            <section>
                {/* section to make a logoarea */}
                <Logoarea />
            </section>

            {/* section for navlink */}
            <section>
                <Navbar />
            </section>

            {/* section to check user internet connection */}
            <section>
                {
                    showInternetConn && (
                        <Offlineonline />
                    )
                }
            </section>
            <section>
                <div className="container-fluid bg-gray-950 mt-8 ">
                    <div className="container-fluid col-11 p-5 bg-gray-200 rounded-xl">
                        <p className='text-center text-capitalize text-xl font-serif font-bold text-wrap'>
                            Before using any functionality you need to Register/login
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
