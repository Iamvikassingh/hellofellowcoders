import React, { useState } from 'react';
import './ChatCss/Chatfunction.css';
import Navbar from "../navbar/Navbar";
import Getchatsformapistudent from './Getchatsformapistudent';
import Getchatsfromapiteacher from './Getchatsfromapiteacher';
import Openmodelforchat from './Openmodelforchat';

function Chatfunction() {
    const [openChat, setOpenChat] = useState(false);
    const [chatType, setChatType] = useState(''); // For toggling between student and teacher chats
    const [showAllChats, setShowAllChats] = useState(true); // Default to show all chats
    const [textareaValue, setTextareaValue] = useState(''); // State for textarea value

    const Openchatbox = () => {
        setOpenChat(!openChat);
    };

    const handleChatType = (type) => {
        setChatType(type); // Set chat type based on the button clicked
        setShowAllChats(false); // Reset showAllChats when a specific chat type is selected
    };

    const handleShowAllChats = () => {
        setChatType(''); // Reset chatType to default
        setShowAllChats(true); // Show all chats
    };

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
        e.target.style.height = 'auto'; // Reset the height to auto to adjust correctly
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the height dynamically based on scroll height
    };

    return (
        <>
            {/* Header Section */}
            <div className="sticky sticky-top d-flex flex-col flex-wrap bg-gray-900 p-2 border-b-2 container-fluid">
                <div className="bg-gray-800 py-3 rounded-xl chatarea col-8">
                    <h1 className='font-sens text-center text-white text-wrap text-capitalize'>
                        Chat with teacher's / Student's
                    </h1>
                </div>
                <div className="d-flex justify-end items-center container-fluid">
                    <button onClick={Openchatbox} className='btn btn-outline-primary buttonstyle'>
                        {openChat ? "Close Chat" : "Open Chat"}
                    </button>
                </div>
                <div className="bg-white chat-persons container"></div>
            </div>
            <Navbar />

            {/* Chat Section */}
            {openChat && (
                <>
                    <div className="bg-gray-950 py-2 min-h-dvh text-light chatboxsection">
                        <div className="d-flex flex-wrap justify-between items-center bg-gray-800 my-1 py-2 rounded-xl container-fluid">
                            <button
                                className='items-center cursor-pointer btn btn-outline-primary btn-sm'
                                onClick={handleShowAllChats} // Click to show all chats
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-people-fill"></i>
                                <p>
                                    People to Chat
                                </p>
                            </button>
                            <button
                                className={`btn btn-outline-primary btn-sm ${chatType === 'teacher' ? 'active' : ''}`}
                                onClick={() => handleChatType('teacher')}
                            >
                                <i className="bi bi-people-fill"></i>
                                <p className='text-center text-sm text-capitalize'>
                                    Teacher
                                </p>
                            </button>
                            <button
                                className={`btn btn-outline-primary btn-sm ${chatType === 'student' ? 'active' : ''}`}
                                onClick={() => handleChatType('student')}
                            >
                                <i className="bi bi-people-fill"></i>
                                <p className='text-center text-sm text-capitalize'>
                                    Student
                                </p>
                            </button>
                        </div>
                        <div className="container-fluid">
                            {/* Show all chats if showAllChats is true */}
                            {showAllChats && (
                                <>
                                    <Getchatsformapistudent />
                                    <Getchatsfromapiteacher />
                                </>
                            )}
                            {/* Show specific chats based on chatType */}
                            {!showAllChats && chatType === 'student' && <Getchatsformapistudent />}
                            {!showAllChats && chatType === 'teacher' && <Getchatsfromapiteacher />}
                        </div>
                    </div>
                </>
            )}

            {/* Dynamic Input Chatbox */}
            <div
                className={`outerinputchatbox rounded-xl py-0 ${openChat ? "expanded" : "collapsed"}`}
                style={{
                    width: openChat ? "80dvw" : "100dvw", // Adjust width based on openChat
                    height: openChat ? "82dvh" : "82dvh", // Adjust height based on openChat
                    paddingBottom: openChat ? '0px' : '0', // Adjust padding to ensure typing area is always visible
                    position: openChat ? 'fixed' : 'fixed',
                }}
            >
                <div className="my-2 chatareainputfields container-fluid">
                    <Openmodelforchat />
                </div>
            </div>

        </>
    );
}

export default Chatfunction;
