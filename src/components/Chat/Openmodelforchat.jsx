import React, { useState } from "react";
import { BiSend } from "react-icons/bi"; // Importing a send icon (you can install react-icons for this)

const Openmodelforchat = ({ chatUser }) => {
    const [message, setMessage] = useState(""); // State to store the current message being typed
    const [messages, setMessages] = useState([]); // State to store the message history

    // Handle typing in the message input field
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    // Handle sending the message
    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { sender: "You", text: message }]); // Add new message to history
            setMessage(""); // Reset the input field
        }
    };

    return (
            <div className="modal-dialog modal-dialog-centered" style={{display:'block'}}>
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="bg-gray-800 px-2 rounded-3xl text-white modal-header">
                        <i className="bi bi-person-circle profile-icon" style={{ fontSize: "30px" }}></i>
                        <h5 className="modal-title ms-3" id="exampleModalLabel">
                            {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : "Teacher"}
                        </h5>
                    </div>

                    {/* Chat Area */}
                    <div className="modal-body" style={{ overflowY: "auto" }}>
                        {/* Chat Messages */}
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender === "You" ? "sent" : "received"}`}
                                    style={{
                                        textAlign: msg.sender === "You" ? "right" : "left",
                                    }}
                                >
                                    <div
                                        className={`message-bubble ${msg.sender === "You" ? "sent-bubble" : "received-bubble"}`}
                                        style={{
                                            display: "inline-block",
                                            backgroundColor: msg.sender === "You" ? "#dcf8c6" : "#fff",
                                            borderRadius: "20px",
                                            padding: "10px 15px",
                                            marginBottom: "10px",
                                            maxWidth: "80%",
                                        }}
                                    >
                                        <span>{msg.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Input Field */}
                    <div className="modal-footer" style={{ borderTop: "none", paddingTop: "0" }}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type a message"
                                value={message}
                                onChange={handleInputChange}
                                style={{
                                    borderRadius: "20px",
                                    padding: "10px",
                                    marginRight: "10px",
                                    boxShadow: "none",
                                }}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleSendMessage}
                                style={{
                                    borderRadius: "20px",
                                    padding: "10px 20px",
                                    backgroundColor: "#25d366",
                                    borderColor: "#25d366",
                                }}
                            >
                                <BiSend size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Openmodelforchat;
