import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MyClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classReq'],
        queryFn: async () => {
            const res = await await axiosSecure.get(`/classReq?email=${user.email}`);
            return res.data;
        }
    })


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {

            axiosSecure.delete(`/classReq/${id}`)
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
    }


    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">My Classes</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((cls) => (
                    <div key={cls._id} className="card shadow-lg p-4">
                        <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{cls.title}</h3>
                        <p className="text-gray-600 mb-2">Email: {cls.email}</p>
                        <p className="text-gray-600 mb-2">Price: ${cls.price}</p>
                        <p className="text-gray-600 mb-4">Description: {cls.description}</p>
                        <p className={`status ${cls.status === 'accepted' ? 'text-green-700 font-semibold' : cls.status === 'pending' ? 'text-yellow-500 font-semibold' : 'text-red-500 font-semibold'}`}>Status: {cls.status}</p>
                        <div className="mt-4 flex justify-between">
                            <Link to={`/dashboard/update/${cls._id}`}>
                                <button
                                    className="btn btn-warning"
                                >
                                    Update
                                </button>
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(cls._id)}
                            >
                                Delete
                            </button>
                            <Link to={`/dashboard/class-details/${cls._id}`}>
                                <button
                                    className="btn btn-primary"
                                    disabled={cls.status === 'approved'}
                                >
                                    See Details
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClass;
