    import React from "react";
    import logoforapp from "../../assets/hellologo.png";
    import "./Logo.css";
    import { FaHeart } from "react-icons/fa";

    const Logoarea = () => {
    return (
        <>
        <div className="d-flex flex-wrap justify-between items-center bg-dark HelloCodersLogo">
            <div className="leftcontainer d-flex flex-wrap items-center">
            <img src={logoforapp} className="img-fluid" alt="Roadmap Builder" />
            <h1 className="font-sens font-bold text-light text-ligth text-lg text-capitalize">
                Roadmap Builder
            </h1>
            </div>
            <div className="rightcontainer">
            <p className="mr-2 text-gray-400 text-md">
                Built with <FaHeart className="inline mx-1 text-red-500" /> by{" "}
                <span className="font-semibold text-blue-400">Vikas Singh</span>
            </p>
            </div>
        </div>
        </>
    );
    };

    export default Logoarea;
