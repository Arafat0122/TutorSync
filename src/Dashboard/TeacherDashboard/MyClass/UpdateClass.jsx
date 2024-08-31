import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";


const UpdateClass = () => {

    const clsData = useLoaderData();
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        const classData = {
            ...data,
            name: user.displayName,
            email: user.email,
            totalEnrollments: 0,
            status: 'pending'
        };


        try {
            const response = await axiosSecure.put(`/classReq/${clsData._id}`, classData);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = '/dashboard/my-classes';
            } else {
                throw new Error('Failed to update class');
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update class.',
                text: error.response ? error.response.data.message : 'An unexpected error occurred.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Add New Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        defaultValue={clsData.title}
                        type="text"
                        {...register("title",)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        defaultValue={clsData.description}
                        {...register("description")}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        defaultValue={clsData.price}
                        type="number"
                        {...register("price")}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input
                        defaultValue={clsData.image}
                        type="text"
                        {...register("image")}
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Update Class</button>
            </form>
        </div>
    );
};

export default UpdateClass;