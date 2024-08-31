import Rating from "react-rating";
import Modal from 'react-modal';
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

Modal.setAppElement('#root');

const MyEnrollClassDetails = () => {

    const classData = useLoaderData();
    const id = classData.classId;
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [assignments, setAssignments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [terDescription, setTerDescription] = useState('');
    const [terRating, setTerRating] = useState(0);

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await axiosSecure.get(`/assignments/${id}`);
            setAssignments(response.data);
        };
        fetchAssignments();
    }, [id, axiosSecure]);

    const handleSubmitAssignment = async (assignment) => {
        const submissionData = {
            ...assignment,
            classId: id,
            studentName: user.displayName
        }
        await axiosSecure.post('/submissions', submissionData);
    };

    const handleSubmitTER = async () => {
        const reviewData = {
            classID: id,
            image: user.photoURL,
            name: user.displayName,
            feedbackText: terDescription,
            rating: terRating,
            title: classData.title
        }

        try {
            const response = await axiosSecure.post('/reviews', reviewData);
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error('Failed to add review');
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to add review.',
                text: error.response ? error.response.data.message : 'An unexpected error occurred.',
                showConfirmButton: false,
                timer: 1500
            });
        }
        setModalIsOpen(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Enrolled Class Details</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map(assignment => (
                            <tr key={assignment._id}>
                                <td>{assignment.title}</td>
                                <td>{assignment.description}</td>
                                <td>{assignment.deadline}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleSubmitAssignment(assignment)}>Submit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-secondary mt-6" onClick={() => setModalIsOpen(true)}>Create Teaching Evaluation Report (TER)</button>
            <Modal className={'w-fit mt-5 md:mt-16 lg:mt-1/6 bg-gray-50 p-5 mx-auto border-2 rounded-xl'} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Create TER">
                <h2 className="text-2xl font-bold mb-4">Create Teaching Evaluation Report (TER)</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={terDescription}
                        onChange={(e) => setTerDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rating</label>
                    <Rating
                        initialRating={terRating}
                        onChange={(rate) => setTerRating(rate)}
                        emptySymbol={<FaStar className="text-gray-300" />}
                        fullSymbol={<FaStar className="text-yellow-500" />}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSubmitTER}>Send</button>
            </Modal>
        </div>
    );
};

export default MyEnrollClassDetails;