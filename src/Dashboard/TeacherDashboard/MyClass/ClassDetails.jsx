import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";

const TeacherClassDetails = () => {
    const axiosSecure = useAxiosSecure();
    const classData = useLoaderData();
    const id = classData._id;

    const { data: enrollments = [] } = useQuery({
        queryKey: ['enrollments', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enrollments?classId=${id}`);
            return data;
        },
        enabled: !!classData,
    });

    const { data: assignments = [] } = useQuery({
        queryKey: ['assignments', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignments?classId=${id}`);
            return data;
        },
        enabled: !!classData,
    });

    const { data: submissions = [] } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/submissions?classId=${id}`);
            return data.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        enabled: !!classData,
    });

    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDeadline, setAssignmentDeadline] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");

    const handleCreateAssignment = async () => {
        const newAssignment = {
            title: assignmentTitle,
            deadline: assignmentDeadline,
            description: assignmentDescription,
            classId: id,
        };
        await axiosSecure.post('/assignments', newAssignment);

        // Close modal
        document.getElementById('my_modal_1').close();
    };

    return (
        <div className="p-6">
            <div>
                <button className="btn btn-primary my-4 flex items-center gap-2 text-lg rounded-full" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    <IoMdAddCircleOutline className="text-2xl" /> <span className='hidden lg:flex'>Create Assignment</span>
                </button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Create Assignment</h3>
                        <label className="label">
                            <span className="label-text">Assignment Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Assignment Title"
                            className="input input-bordered w-full"
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                        />
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={assignmentDeadline}
                            onChange={(e) => setAssignmentDeadline(e.target.value)}
                        />
                        <label className="label">
                            <span className="label-text">Assignment Description</span>
                        </label>
                        <textarea
                            placeholder="Assignment Description"
                            className="textarea textarea-bordered w-full"
                            value={assignmentDescription}
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Cancel</button>
                            <button className="btn btn-primary ml-2" onClick={handleCreateAssignment}>Add Assignment</button>
                        </div>
                    </div>
                </dialog>
            </div>
            <div>
                {classData && (
                    <div>
                        <h2 className="text-2xl mb-4">{classData.title} Details</h2>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div className="card shadow-lg p-4">
                                <h3 className="text-xl font-semibold mb-2">Total Enrollment</h3>
                                <p className="text-2xl font-bold">{enrollments.length}</p>
                            </div>
                            <div className="card shadow-lg p-4">
                                <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
                                <p className="text-2xl font-bold">{assignments.length}</p>
                            </div>
                            <div className="card shadow-lg p-4">
                                <h3 className="text-xl font-semibold mb-2">Assignments Submitted Per Day</h3>
                                <p className="text-2xl font-bold">{submissions.length}</p>
                            </div>
                        </div>
                        <div className="card shadow-lg p-4">
                            <h3 className="text-xl font-semibold mb-2">Submitted Assignments </h3>

                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {submissions.map((submission, index) => (
                                    <li key={index} className="border-2 w-fit p-2">
                                        <p><strong>Date:</strong> {new Date(submission.deadline).toLocaleDateString()}</p>
                                        <p><strong>Student:</strong> {submission.studentName}</p>
                                        <p><strong>Assignment:</strong> {submission.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherClassDetails;
