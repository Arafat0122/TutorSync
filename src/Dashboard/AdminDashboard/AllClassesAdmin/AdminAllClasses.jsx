import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAllClasses = () => {
    const [classes, setClasses] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const { data } = await axiosSecure.get('/classAdmin');
                setClasses(data);
            } catch {
                return
            }
        };
        fetchClasses();
    }, [axiosSecure]);

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/classReq/approve/${id}`);
            const approvedClass = classes.find(cls => cls._id === id);
            if (approvedClass) {
                setClasses(classes.map(cls => cls._id === id ? { ...cls, status: 'accepted' } : cls));
                const classData = {
                    totalEnrollments: parseFloat(approvedClass.totalEnrollments ? approvedClass.totalEnrollments : 0),
                    status: 'accepted',
                    classId: approvedClass._id,
                    email: approvedClass.email,
                    title: approvedClass.title,
                    image: approvedClass.image,
                    name: approvedClass.name,
                    price: parseFloat(approvedClass.price),
                    description: approvedClass.description,
                };
                await axiosSecure.post('/classes', classData);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class has been approved.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch {
            return
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/classReq/reject/${id}`);
            setClasses(classes.map(cls => cls._id === id ? { ...cls, status: 'rejected' } : cls));
        } catch {
            return
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">All Classes</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Short Description</th>
                            <th>Approved By</th>
                            <th>Actions</th>
                            <th>See Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(cls => (
                            <tr key={cls._id}>
                                <td>{cls.title}</td>
                                <td>
                                    <img src={cls.image} alt={cls.title} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td>{cls.email}</td>
                                <td>{cls.description}</td>
                                <td>{cls.approvedBy || "Admin"}</td>
                                <td>
                                    {cls.status === 'pending' ? (
                                        <div className="flex space-x-2">
                                            <button className="btn btn-primary" onClick={() => handleApprove(cls._id)}>Approve</button>
                                            <button className="btn btn-error" onClick={() => handleReject(cls._id)}>Reject</button>
                                        </div>
                                    ) : 'Class is on progress'}
                                </td>
                                <td>
                                    {cls.status === 'accepted' ? (
                                        <Link to={`/dashboard/progress/${cls._id}`}> <button className="btn btn-info">See Progress</button></Link>
                                    ) : (
                                        <button className="btn btn-disabled" disabled>See Progress</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllClasses;
