import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Chat/ChatCss/Chatfunction.css';

const Getchatsformapiteacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null); // To store selected teacher's details
    const sendUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${sendUrl}/api/users/teachers`)
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleViewDetails = (teacher) => {
        setSelectedTeacher(teacher); // Set the selected teacher details
    };

    const handleCloseModal = () => {
        setSelectedTeacher(null); // Close the modal by resetting the selected teacher
    };

    return (
        <>
            <div type="button" className='bg-gray-600 my-2 rounded-xl btn btn-primary container-fluid' data-bs-toggle="modal" data-bs-target="#exampleModal">
                {teachers.length > 0 ? (
                    teachers.map((teacher, index) => {
                        const fullName = `${teacher.firstName} ${teacher.lastName}`; // Combine first and last names

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
                                    onClick={() => handleViewDetails(teacher)} // Handle the button click
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="d-flex justify-center items-center container">

                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for teacher details */}
            {selectedTeacher && (
                <div className="bg-gray-950 modal-container">
                    <div className="modal-contentforchat">
                        <button className="close-modalforchat" onClick={handleCloseModal}>
                            &times;
                        </button>
                        <div className="modal-body">
                            <div className="text-center profile-section">
                                <i className="bi bi-person-circle profile-icon"></i>
                                <h4 className='text-lg text-capitalize'>{`${selectedTeacher.firstName} ${selectedTeacher.lastName}`}</h4>
                                <p className='text-center text-light text-sm text-capitalize'>Teacher</p>
                            </div>
                            <div className="details-sectio">
                                <p><strong>Email:</strong> {selectedTeacher.email}</p>
                                <p><strong>Phone:</strong> {selectedTeacher.phone || 'N/A'}</p>
                                <p><strong>Joined On:</strong> {new Date(selectedTeacher.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Getchatsformapiteacher;