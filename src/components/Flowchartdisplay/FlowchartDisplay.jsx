import React, { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logoarea from "../logoarea/Logoarea";
import Navbar from "../navbar/Navbar";
import ReactFlow, { MiniMap, Controls, Background, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import "./FlowchartDisplay.css";

const API_KEY = import.meta.env.VITE_GENERATIVE_AI_API_KEY;

const FlowchartDisplay = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleSearch = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const roadmapPrompt = `Generate a structured learning roadmap for ${searchTerm}, listing key technologies, concepts, or steps in sequential order (1, 2, 3, etc.) from beginner to advanced, full explanations given with the names.`;

            

            const summaryPrompt = `Generate a concise and well-structured summary of ${searchTerm} in bullet points, highlighting its key concepts, importance, applications, and benefits. Keep it clear and informative.`;


            const roadmapResult = await model.generateContent(roadmapPrompt, searchTerm);
            const roadmapText = await roadmapResult.response.text();
            const roadmap = roadmapText.trim();
            const processedData = processFlowData(roadmap);
            
            setNodes(generateNodes(processedData));
            setEdges(generateEdges(processedData));

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


    const processFlowData = (text) => {
        return text.split("\n")
            .map((line, index) => {
                const match = line.match(/^\d+\.\s*(.+)$/);
                return { id: index.toString(), label: match ? match[1] : line };
            });
    };

    const generateNodes = (data) => {
        const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
        
        const minXSpacing = 150, maxXSpacing = 250; // X-axis spacing for snake effect
        const minYSpacing = 100, maxYSpacing = 200; // Y-axis spacing for snake effect
        
        let currentX = 100; // Start position for X
        let currentY = 100; // Start position for Y
        let toggleX = true; // To alternate left-right movement like a snake
        let toggleY = true; // To alternate up-down movement like a snake
    
        return data.map((item, index) => {
            const randomXSpacing = Math.random() * (maxXSpacing - minXSpacing) + minXSpacing;
            const randomYSpacing = Math.random() * (maxYSpacing - minYSpacing) + minYSpacing;
            
            currentX += randomXSpacing; // Increment X progressively
            currentY += toggleY ? randomYSpacing : -randomYSpacing; // Increment or decrement Y progressively
    
            if (index % 2 === 0) {
                toggleX = !toggleX; // Alternate left-right
            } else {
                toggleY = !toggleY; // Alternate up-down
            }
    
            return {
                id: item.id,
                data: { label: item.label },
                position: { x: currentX, y: currentY },
                style: {
                    backgroundColor: colors[index % colors.length],
                    color: "#333",
                    borderRadius: "12px",
                    padding: "12px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                },
            };
        });
    };
    
    
    
    
    
    

    
    

    const generateEdges = (data) => {
        return data.slice(1).map((item, index) => ({
            id: `e${index}-${index + 1}`,
            source: data[index].id,
            target: item.id,
            animated: true, // Adds animation to the edges
            style: { stroke: "#3498db", strokeWidth: 2 }, // Stylish blue edges
        }));
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

                    {!loading && nodes.length > 0 && (
                        <div className="flowchart-container" style={{ height: "600px" }}>
                            <ReactFlow nodes={nodes} edges={edges} fitView>
                                <MiniMap />
                                <Controls />
                                <Background variant="dots" />
                            </ReactFlow>
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
                        <h2 className="mb-4 font-bold text-2xl">Roadmap Summary</h2>
                        <h2 className="mb-4 font-bold text-2xl">{searchTerm}</h2>
                        <p className="text-gray-600">{summary || "No Summary Available"}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlowchartDisplay;
