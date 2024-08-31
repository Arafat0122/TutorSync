import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddClass = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            const response = await axiosSecure.post('/classReq', classData);
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = '/dashboard/my-classes';
            } else {
                throw new Error('Failed to add class');
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to add class.',
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
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input
                        type="text"
                        {...register("image", { required: "Image URL is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-full">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;
