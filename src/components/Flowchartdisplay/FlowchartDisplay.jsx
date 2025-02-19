import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logoarea from "../logoarea/Logoarea";
import Navbar from "../navbar/Navbar";
import "./FlowchartDisplay.css"; // Import CSS for styling the flowchart

// Fetch API key from .env file
const API_KEY = import.meta.env.VITE_GENERATIVE_AI_API_KEY;

const FlowchartDisplay = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [flowData, setFlowData] = useState([]);
    const [Summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSearch = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Generate a roadmap for ${searchTerm}. 
                Provide only the names of technologies or concepts in sequential order, 
                each on a new line, prefixed with a number (1, 2, 3, etc.). 
                Do not add any extra symbols, explanations, or formatting.`;

                const summaryPrompt = `Provide a concise summary of ${searchTerm} in a well-structured bullet-point format. 
                Each point should be clear, informative, and relevant, avoiding unnecessary details or repetition. 
                Do not include extra symbols like asterisks or dashes—only use plain text.`;
                

            const result = await model.generateContent(searchTerm,prompt);
            const response = await result.response;
            const text = await response.text();

            const data = processFlowData(text);
            setFlowData(data);


            const summaryResult = await model.generateContent(searchTerm, summaryPrompt);
            const summaryResponse = await summaryResult.response;
            let summaryText = await summaryResponse.text();
            summaryText = cleanGeneratedText(summaryText);
            setSummary(summaryText);


        } catch (err) {
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const cleanGeneratedText = (text) => {
        return text.replace(/[*\-]/g, "").replace(/\s+/g, " ").trim();
    };

    // ✅ Function to clean and extract step numbers and names
    const processFlowData = (text) => {
        const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");

        return lines.map((line, index) => {
            const match = line.match(/^(\d+)\.\s*(.+)$/); // Extracts "1. Topic" format
            return match
                ? { id: index, number: match[1], name: match[2] }
                : { id: index, number: index + 1, name: line }; // Fallback if AI doesn't provide numbers
        });
    };

    return (
        <>
            <Logoarea />
            <Navbar />
            <div className="flex flex-wrap md:flex-nowrap h-screen">
                <div className="flex flex-col justify-between bg-gray-800 p-6 w-full md:w-64 text-white">
                    <h2 className="font-bold text-3xl text-center">Roadmap Builder</h2>
                    <footer className="mt-auto text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} Roadmap Builder</p>
                        
                    </footer>
                </div>
                <div className="flex-1 bg-gray-100 p-6">
                    <div className="flex md:flex-row flex-col justify-center md:space-x-4 mb-6">
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter a topic..."
                            className="px-4 py-2 border rounded-md md:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
                        />
                        <button
                            onClick={handleSearch}
                            className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md md:rounded-r-lg focus:outline-none w-full md:w-1/4 text-white"
                        >
                            <FaSearch className="mr-2" />
                            Search
                        </button>
                    </div>

                    {loading && <div>Loading flowchart...</div>}
                    {error && <div className="text-red-500">{error}</div>}

                    {!loading && flowData.length > 0 && (
                        <div className="flowchart-container">
                            {flowData.map((step, index) => (
                                <div key={step.id} className="flowchart-node">
                                    <span className="step-number">{step.number}.</span> {step.name}
                                    {index < flowData.length - 1 && <div className="connector"></div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Sidebar Button */}
                <button onClick={toggleSidebar} className="top-4 right-4 z-50 fixed bg-blue-500 shadow-lg p-3 rounded-full focus:outline-none text-white">
                    {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* Right Sidebar */}
                <div className={`fixed top-0 right-0 h-full w-full md:w-1/4 bg-white shadow-lg transition-transform transform overflow-scroll ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="p-4">
                        <h2 className="mb-4 font-bold text-2xl">Roadmap Builder</h2>
                        <h2 className="mb-4 font-bold text-2xl">{searchTerm}</h2>
                        <p className="text-gray-600">{(Summary !== "") ? Summary : "No Summary"}</p>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default FlowchartDisplay;
