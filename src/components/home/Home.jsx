    import React, { useState } from "react";
    import {
    FaMap,
    FaCodeBranch,
    FaUsers,
    FaChartLine,
    FaCheckCircle,
    FaLaptopCode,
    FaGlobe,
    FaChartPie,
    FaSignInAlt,
    } from "react-icons/fa";
    import "./Home.css";
    import Logoarea from "../logoarea/Logoarea";
    import Offlineonline from "../onlineoffline/Offlineonline";
    import Navbar from "../navbar/Navbar";
    import { Link } from "react-router-dom";

    export default function Home() {
    const [showInternetConn, setShowInternetConn] = useState(true);

    const showinternetconn = () => {
        const timer = setTimeout(() => {
        setShowInternetConn(false);
        }, 10000);
        return () => clearTimeout(timer);
    };

    showinternetconn();

    return (
        <div className="bg-gray-900 min-h-screen text-white">
        {/* Sidebar */}
        <div className="flex">
            <aside className="hidden md:block bg-gray-800 p-6 w-64 min-h-screen">
            <h2 className="mb-6 font-bold text-blue-400 text-2xl">Roadmap Builder</h2>
            <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                <FaMap className="text-blue-400 text-xl" />
                <span>Interactive Roadmaps</span>
                </li>
                <li className="flex items-center space-x-3">
                <FaCodeBranch className="text-green-400 text-xl" />
                <span>Tech & Non-Tech Paths</span>
                </li>
                <li className="flex items-center space-x-3">
                <FaUsers className="text-yellow-400 text-xl" />
                <span>Community Collaboration</span>
                </li>
                <li className="flex items-center space-x-3">
                <FaChartLine className="text-red-400 text-xl" />
                <span>AI-Powered Insights</span>
                </li>
            </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
            {/* Logo Area */}
            <Logoarea />

            {/* Navbar */}
            <Navbar />

            {/* Internet Connection Alert */}
            {showInternetConn && (
                <div className="mt-4">
                <Offlineonline />
                </div>
            )}

            {/* Hero Section */}
            <section className="mt-8 text-center">
                <h1 className="font-bold text-blue-500 text-4xl">
                Welcome to Roadmap Builder
                </h1>
                <p className="mx-auto mt-2 max-w-2xl text-gray-400 text-lg">
                Create dynamic, AI-powered learning paths for various domains,
                guiding you step-by-step toward expertise.
                </p>
            </section>

            {/* Features Grid */}
            <section className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaMap className="mx-auto mb-4 text-blue-400 text-5xl" />
                <h3 className="font-semibold text-xl">Interactive Roadmaps</h3>
                <p className="mt-2 text-gray-400">
                    Generate dynamic flowchart-based roadmaps for guided learning.
                </p>
                </div>

                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaCodeBranch className="mx-auto mb-4 text-green-400 text-5xl" />
                <h3 className="font-semibold text-xl">Tech & Non-Tech Fields</h3>
                <p className="mt-2 text-gray-400">
                    Explore structured paths for development, business, finance, and
                    more.
                </p>
                </div>

                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaUsers className="mx-auto mb-4 text-yellow-400 text-5xl" />
                <h3 className="font-semibold text-xl">Community Driven</h3>
                <p className="mt-2 text-gray-400">
                    Collaborate and share custom roadmaps with a growing community.
                </p>
                </div>

                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaChartLine className="mx-auto mb-4 text-red-400 text-5xl" />
                <h3 className="font-semibold text-xl">AI-Powered Insights</h3>
                <p className="mt-2 text-gray-400">
                    Get personalized AI-generated roadmap recommendations based on
                    your goals.
                </p>
                </div>

                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaCheckCircle className="mx-auto mb-4 text-green-400 text-5xl" />
                <h3 className="font-semibold text-xl">1000+ Roadmaps</h3>
                <p className="mt-2 text-gray-400">
                    A vast collection of expert-curated learning paths.
                </p>
                </div>

                <div className="bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-lg transition">
                <FaLaptopCode className="mx-auto mb-4 text-blue-400 text-5xl" />
                <h3 className="font-semibold text-xl">Live Project Learning</h3>
                <p className="mt-2 text-gray-400">
                    Hands-on projects to apply your learning in real-world
                    scenarios.
                </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="mt-12 text-center">
                <div className="inline-block bg-gray-800 shadow-lg p-8 rounded-lg">
                <h2 className="font-bold text-blue-400 text-2xl">
                    Get Started with Roadmap Builder
                </h2>
                <p className="mt-2 text-gray-400">
                    check about us and know about Roadmap Builder
                </p>
                <Link to="/about">
                    <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 shadow-lg mx-auto mt-4 px-6 py-3 rounded-full font-bold text-white transition">
                    <FaSignInAlt className="text-xl" />
                    <span>About us.</span>
                    </button>
                </Link>
                </div>
            </section>
            </main>
        </div>
        </div>
    );
    }
