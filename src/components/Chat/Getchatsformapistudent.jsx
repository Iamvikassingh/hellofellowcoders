import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Chat/ChatCss/Chatfunction.css';

const Getchatsformapistudent = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // To store selected student's details
    const sendUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${sendUrl}/api/users/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleViewDetails = (student) => {
        setSelectedStudent(student); // Set the selected student details
    };

    const handleCloseModal = () => {
        setSelectedStudent(null); // Close the modal by resetting the selected student
    };

    return (
        <>
            <div type="button" className='bg-gray-600 my-2 rounded-xl btn btn-primary container-fluid' data-bs-toggle="modal"  data-bs-target="#exampleModal" >
                {students.length > 0 ? (
                    students.map((student, index) => {
                        const fullName = `${student.firstName} ${student.lastName}`; // Combine first and last names

                        return (
                            <div key={index} className="d-flex justify-between py-2 personsinlist">
                                <span className='d-flex justify-start gap-2'>
                                    <i className="bi bi-person-circle"></i>
                                    <p className='text-capitalize'>
                                        {fullName} {/* Display the full name */}
                                    </p>
                                </span>
                                <button
                                    className='text-right p-0 btn btn-link'
                                    onClick={() => handleViewDetails(student)} // Handle the button click
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="d-flex justify-center items-center bg-transparent container">
                        
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for student details */}
            {selectedStudent && (
                <div className="modal-container">
                    <div className="modal-contentforchat">
                        <button className="close-modalforchat" onClick={handleCloseModal}>
                            &times;
                        </button>
                        <div className="modal-body">
                            <div className="text-center profile-section">
                                <i className="bi bi-person-circle profile-icon"></i>
                                <h4 className='text-lg text-capitalize'>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</h4>
                                <p className='text-center text-light text-sm text-capitalize'>Student</p>
                            </div>
                            <div className="details-section">
                                <p><strong>Email:</strong> {selectedStudent.email}</p>
                                <p><strong>Phone:</strong> {selectedStudent.phone || 'N/A'}</p>
                                <p><strong>Joined On:</strong> {new Date(selectedStudent.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Getchatsformapistudent;