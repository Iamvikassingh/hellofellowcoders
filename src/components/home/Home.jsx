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
        </>
    )
}

export default Home
