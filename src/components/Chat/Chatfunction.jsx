import React, { useState } from "react";
import "./ChatCss/Chatfunction.css";
import Navbar from "../navbar/Navbar";
import Getchatsformapistudent from "./Getchatsformapistudent";
import Getchatsfromapiteacher from "./Getchatsfromapiteacher";
import Openmodelforchat from "./Openmodelforchat";

function Chatfunction() {
    const [openChat, setOpenChat] = useState(true);
    const [chatType, setChatType] = useState(""); // To toggle between teacher and student chats
    const [showAllChats, setShowAllChats] = useState(true); // Default to show all chats
    const [selectedChatUser, setSelectedChatUser] = useState(null); // Store selected user

    const toggleChatBox = () => {
        setOpenChat(!openChat);
    };

    const handleChatType = (type) => {
        setChatType(type);
        setShowAllChats(false);
    };

    const handleShowAllChats = () => {
        setChatType("");
        setShowAllChats(true);
    };

    return (
        <>
            {/* Header Section */}
            <div className="sticky sticky-top d-flex flex-col flex-wrap bg-gray-900 p-2 border-b-2 container-fluid">
                <div className="bg-gray-800 py-3 rounded-xl chatarea col-8">
                    <h1 className="font-sens text-center text-white text-wrap text-capitalize">
                        Chat with Teachers / Students
                    </h1>
                </div>
                <div className="d-flex justify-end items-center container-fluid">
                    <button onClick={toggleChatBox} className="btn btn-outline-primary btn-sm buttonstyle">
                        {openChat ? "Close Chat" : "Open Chat"}
                    </button>
                </div>
            </div>
            <Navbar />

            {/* Chat Section */}
            {openChat && (
                <div className="bg-gray-950 py-2 min-h-dvh text-light chatboxsection">
                    <div className="d-flex flex-wrap justify-between items-center bg-gray-800 my-1 py-2 rounded-xl container-fluid">
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleShowAllChats}
                        >
                            Show All Chats
                        </button>
                        <button
                            className={`btn btn-outline-primary btn-sm ${chatType === "teacher" ? "active" : ""}`}
                            onClick={() => handleChatType("teacher")}
                        >
                            Teachers
                        </button>
                        <button
                            className={`btn btn-outline-primary btn-sm ${chatType === "student" ? "active" : ""}`}
                            onClick={() => handleChatType("student")}
                        >
                            Students
                        </button>
                    </div>

                    <div className="container-fluid">
                        {showAllChats && (
                            <>
                                <Getchatsformapistudent setSelectedChatUser={setSelectedChatUser} />
                                <Getchatsfromapiteacher setSelectedChatUser={setSelectedChatUser} />
                            </>
                        )}
                        {!showAllChats && chatType === "teacher" && (
                            <Getchatsfromapiteacher setSelectedChatUser={setSelectedChatUser} />
                        )}
                        {!showAllChats && chatType === "student" && (
                            <Getchatsformapistudent setSelectedChatUser={setSelectedChatUser} />
                        )}
                    </div>
                </div>
            )}

            {/* Dynamic Chat Box */}
            <div
                className={`outerinputchatbox rounded-xl py-0 ${openChat ? "expanded" : "collapsed"
                    }`}
                style={{
                    width: openChat ? "80dvw" : "100dvw",
                    height: "82dvh",
                    position: "fixed",
                }}
            >
                <div className="my-2 chatareainputfields container-fluid">
                    <Openmodelforchat chatUser={selectedChatUser} />
                </div>
            </div>
        </>
    );
}

export default Chatfunction;
