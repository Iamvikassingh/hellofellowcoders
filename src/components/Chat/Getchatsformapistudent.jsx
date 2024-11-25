import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Getchatsformapistudent = ({ setSelectedChatUser }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for modal
    const sendUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get(`${sendUrl}/api/users/students`)
            .then((response) => setStudents(response.data))
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
    };

    return (
        <div className="container-fluid">
            {students.map((student, index) => (
                <div
                    key={index}
                    className="d-flex justify-between bg-gray-600 my-2 py-2 rounded-xl btn btn-primary personsinlist"
                    onClick={() => setSelectedChatUser(student)}
                >
                    <span className="d-flex justify-start gap-2">
                        <i className="bi bi-person-circle"></i>
                        <p className="text-capitalize">
                            {`${student.firstName} ${student.lastName}`}
                        </p>
                    </span>
                    <span onClick={(e) => e.stopPropagation()}>
                        <BiDotsVerticalRounded
                            size={24}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenModal(student)}
                        />
                    </span>
                </div>
            ))}

            {/* Modal Section */}
            {selectedStudent && (
                <div
                    className="fade modal show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="bg-gray-800 text-white modal-header">
                                <h5 className="modal-title">Student Details</h5>
                                <button
                                    type="button"
                                    className="btn btn-close btn-danger"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                />
                            </div>
                            <div className="bg-gray-800 modal-body">
                                <p><strong>Name:</strong> {`${selectedStudent.firstName} ${selectedStudent.lastName}`}</p>
                                <p><strong>Email:</strong> {selectedStudent.email}</p>
                                <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                                <p><strong>Joining Date:</strong> {new Date(selectedStudent.createdAt).toLocaleDateString()}</p>
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

export default Getchatsformapistudent;
