import React, { useState } from "react";
import { BiSend } from "react-icons/bi";

const Openmodelforchat = ({ chatUser }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { sender: "You", text: message }]);
            setMessage("");
        }
    };

    return (
        <>
            <div className="modal-dialog modal-dialog-centered" style={{ display: chatUser ? "block" : "none" }}>
                <div className="modal-content">
                    <div className="d-flex items-center gap-2 bg-gray-800 px-2 rounded-3xl text-white modal-header">
                        <i className="bi bi-person-circle profile-icon" style={{ fontSize: "30px" }}></i>
                        <h5 className="text-light text-capitalize modal-title">
                            {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : "Chat"}
                        </h5>
                    </div>
                    <div className="modal-body" style={{ overflowY: "auto" }}>
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender === "You" ? "sent" : "received"}`}
                                    style={{ textAlign: msg.sender === "You" ? "right" : "left" }}
                                >
                                    <div className={`message-bubble ${msg.sender === "You" ? "sent-bubble" : "received-bubble"} my-2  p-2`}>
                                        <span className="bg-blue-900 p-2 rounded-lg text-light">{msg.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleSendMessage}>
                                <BiSend size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Openmodelforchat;
