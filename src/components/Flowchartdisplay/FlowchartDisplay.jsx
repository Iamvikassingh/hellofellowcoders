    import React, { useState, useCallback, useEffect } from "react";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
    import Logoarea from "../logoarea/Logoarea";
    import Navbar from "../navbar/Navbar";
    import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    } from "reactflow";
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

        const roadmapPrompt = `Generate a structured learning roadmap for ${searchTerm}, listing key technologies, concepts, or steps in sequential order.`;
        const summaryPrompt = `Generate a concise summary of ${searchTerm}.`;

        const roadmapResult = await model.generateContent(roadmapPrompt);
        const roadmapText = await roadmapResult.response.text();
        const processedData = processFlowData(roadmapText);

        setNodes(generateNodes(processedData));
        setEdges(generateEdges(processedData));

        const summaryResult = await model.generateContent(summaryPrompt);
        const summaryResponse = await summaryResult.response.text();
        setSummary(cleanGeneratedText(summaryResponse));
        } catch (err) {
        setError("Error fetching data. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    const cleanGeneratedText = (text) =>
        text.replace(/[*\-]/g, "").replace(/\s+/g, " ").trim();

    const processFlowData = (text) => {
        return text.split("\n").map((line, index) => {
        const match = line.match(/^\d+\.\s*(.+)$/);
        return { id: index.toString(), label: match ? match[1] : line };
        });
    };

    const generateNodes = (data) => {
        const colors = [
        "#ffadad",
        "#ffd6a5",
        "#fdffb6",
        "#caffbf",
        "#9bf6ff",
        "#a0c4ff",
        "#bdb2ff",
        "#ffc6ff",
        ];
        let currentX = 100,
        currentY = 100,
        toggleY = true;

        return data.map((item, index) => {
        currentX += 180;
        currentY += toggleY ? 100 : -100;
        toggleY = !toggleY;

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
            draggable: true,
        };
        });
    };

    const generateEdges = (data) => {
        return data.slice(1).map((item, index) => ({
        id: `e${index}-${index + 1}`,
        source: data[index].id,
        target: item.id,
        animated: true,
        style: { stroke: "#3498db", strokeWidth: 2 },
        }));
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    );

    const handleNodeClick = async (event, node) => {
        if (node.id.startsWith("details-")) {
        // Delete the node if it is a details node
        setNodes((nds) => nds.filter((n) => n.id !== node.id));
        setEdges((eds) =>
            eds.filter((e) => e.source !== node.id && e.target !== node.id)
        );
        return;
        }

        setLoading(true);

        try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const detailsPrompt = `Provide an explanation of ${node.data.label}, including definition, importance, use cases, and related concepts.`;

        const detailsResult = await model.generateContent(detailsPrompt);
        const detailsText = await detailsResult.response.text();
        const cleanedDetails = cleanGeneratedText(detailsText);

        const colors = [
            "#ffadad",
            "#ffd6a5",
            "#fdffb6",
            "#caffbf",
            "#9bf6ff",
            "#a0c4ff",
            "#bdb2ff",
            "#ffc6ff",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newNode = {
            id: `details-${node.id}`,
            data: {
            label: (
                <div style={{ position: "relative" }}>
                {cleanedDetails}
                <FaTimes
                    style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    cursor: "pointer",
                    display: "none",
                    }}
                    className="delete-icon"
                />
                </div>
            ),
            },
            position: { x: node.position.x + 200, y: node.position.y },
            style: {
            backgroundColor: randomColor,
            color: "#333",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            width: "400px",
            whiteSpace: "pre-wrap",
            },
            draggable: true,
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [
            ...eds,
            {
            id: `e${node.id}-details`,
            source: node.id,
            target: newNode.id,
            animated: true,
            },
        ]);
        } catch (err) {
        console.error("Error fetching details:", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const handleMouseOver = (event) => {
        const deleteIcon = event.target.querySelector(".delete-icon");
        if (deleteIcon) deleteIcon.style.display = "block";
        };

        const handleMouseOut = (event) => {
        const deleteIcon = event.target.querySelector(".delete-icon");
        if (deleteIcon) deleteIcon.style.display = "none";
        };

        const nodes = document.querySelectorAll(".react-flow__node");
        nodes.forEach((node) => {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        });

        return () => {
        nodes.forEach((node) => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
        });
        };
    }, [nodes]);

    return (
        <>
        <Logoarea />
        <Navbar />
        <div className="flex flex-wrap md:flex-nowrap h-screen">
            <div className="flex flex-col justify-between bg-gray-800 p-6 w-full md:w-64 text-white">
            <h2 className="font-bold text-3xl text-center">Roadmap Builder</h2>
            </div>

            <div className="flex-1 bg-gray-100 p-6">
            <div className="flex md:flex-row flex-col justify-center md:space-x-4 mb-6">
                <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter a topic..."
                className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
                />
                <button
                onClick={handleSearch}
                className="d-flex justify-center items-center bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <div className="flowchart-container" style={{ height: "700px" }}>
                <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={handleNodeClick}
                fitView
                >
                <MiniMap />
                <Controls />
                <Background variant="dots" />
                </ReactFlow>
            </div>
            </div>
            {/* Sidebar Button */}
            <button
            onClick={toggleSidebar}
            className="top-4 right-4 z-50 fixed bg-blue-500 shadow-lg p-3 rounded-full text-white"
            >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Right Sidebar */}
            <div
            className={`fixed top-0 right-0 h-full w-full md:w-1/4 bg-white shadow-lg transition-transform transform overflow-scroll ${
                sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            >
            <div className="p-4">
                <h2 className="mb-4 font-bold text-2xl">
                {searchTerm || "Node Details"}
                </h2>
                <p className="text-gray-600">
                {summary || "Click a node to see details"}
                </p>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default FlowchartDisplay;
