import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Getchatsfromapiteacher = ({ setSelectedChatUser }) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null); // Store selected teacher for modal
    const sendUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get(`${sendUrl}/api/users/teachers`)
            .then((response) => setTeachers(response.data))
            .catch((error) => console.error("Error fetching teachers:", error));
    }, []);

    const handleOpenModal = (teacher) => {
        setSelectedTeacher(teacher);
    };

    const handleCloseModal = () => {
        setSelectedTeacher(null);
    };

    return (
        <div className="container-fluid">
            {teachers.map((teacher, index) => (
                <div
                    key={index}
                    className="d-flex justify-between bg-gray-600 my-2 py-2 rounded-xl btn btn-primary personsinlist"
                    onClick={() => setSelectedChatUser(teacher)}
                >
                    <span className="d-flex justify-start gap-2">
                        <i className="bi bi-person-circle"></i>
                        <p className="text-capitalize">
                            {`${teacher.firstName} ${teacher.lastName}`}
                        </p>
                    </span>
                    <span onClick={(e) => e.stopPropagation()}>
                        <BiDotsVerticalRounded
                            size={24}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenModal(teacher)}
                        />
                    </span>
                </div>
            ))}

            {/* Modal Section */}
            {selectedTeacher && (
                <div
                    className="fade modal show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="bg-gray-800 text-white modal-header">
                                <h5 className="modal-title">Teacher Details</h5>
                                <button
                                    type="button"
                                    className="btn btn-close btn-danger"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                />
                            </div>
                            <div className="bg-gray-800 modal-body">
                                <p><strong>Name:</strong> {`${selectedTeacher.firstName} ${selectedTeacher.lastName}`}</p>
                                <p><strong>Email:</strong> {selectedTeacher.email}</p>
                                <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
                                <p><strong>Joining Date:</strong> {new Date(selectedTeacher.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-gray-800 modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Getchatsfromapiteacher;
