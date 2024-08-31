import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: teacherRequests = [], refetch } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacher-requests');
            return res.data;
        }
    });

    const handleApprove = async (requestId, userEmail) => {
        try {
            const res = await axiosSecure.patch(`/teacher-requests/approve/${requestId}`);
            if (res.status === 200) {
                await axiosSecure.patch(`/users/role/${userEmail}`, { role: 'teacher' });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Teacher request approved.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to approve request.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleReject = async (requestId) => {
        try {
            const res = await axiosSecure.patch(`/teacher-requests/reject/${requestId}`);
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Teacher request rejected.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to reject request.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Experience</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherRequests.map(request => (
                        <tr key={request._id}>
                            <td>{request.name}</td>
                            <td>
                                <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full object-cover" />
                            </td>
                            <td>{request.experience}</td>
                            <td>{request.title}</td>
                            <td>{request.category}</td>
                            <td>{request.status}</td>
                            <td>
                                <button
                                    onClick={() => handleApprove(request._id, request.email)}
                                    className="btn btn-success btn-sm mr-2"
                                    disabled={request.status !== 'pending'}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(request._id)}
                                    className="btn btn-danger btn-sm"
                                    disabled={request.status !== 'pending'}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherRequests;
