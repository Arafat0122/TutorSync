import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} has been promoted to Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <>
            <Helmet>
                <title>TS Dashboard | All Users</title>
            </Helmet>
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black font-medium">
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <tr key={user._id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.photo} alt={user.name} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{user.name}</div>
                            </td>
                            <td>
                                <div className="font-medium">{user.email}</div>
                            </td>
                            <td>
                                <div>
                                    {user.role === 'admin' ? <button onClick={() => handleMakeAdmin(user)} className="w-fit p-2 font-bold rounded-lg bg-blue-700 text-white text-2xl"><MdOutlineAdminPanelSettings /></button> : <button onClick={() => handleMakeAdmin(user)} className="w-fit p-2 font-bold rounded-lg bg-blue-700 text-white text-2xl"><FaUser /></button>}
                                </div>
                            </td>
                            <td>
                                <div><button onClick={() => handleDelete(user)} className="w-fit p-2 font-bold rounded-lg bg-red-500 text-white text-2xl"><FaTrash></FaTrash></button></div>
                            </td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default AllUsers;