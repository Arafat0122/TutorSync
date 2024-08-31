import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TeachOnTutorSync = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const [hasApplied, setHasApplied] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null);

    const { data: teacherRequests = [], refetch } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/teacher-requests');
            return res.data;
        }
    });

    useEffect(() => {
        if (teacherRequests.length > 0) {
            const userRequest = teacherRequests.find(request => request.email === user.email);
            if (userRequest) {
                setHasApplied(true);
                setApplicationStatus(userRequest.status);
            }
        }
    }, [teacherRequests, user.email]);

    const onSubmit = async (data) => {
        data.email = user.email;
        data.image = user.photoURL;
        data.status = 'pending';

        try {
            const response = await axiosPublic.post('teacher-requests', data);
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Application submitted successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to submit application.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (user.role === 'teacher') {
        return (
            <div>
                <Helmet>
                    <title>TutorSync | Teach</title>
                </Helmet>
                <div className="flex flex-col justify-center items-center p-4 bg-blue-50 min-h-screen">
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                        <SectionTitle heading={'Teaching Position Application'}></SectionTitle>
                        <div className="text-center">
                            <p className="text-lg font-bold">You are already a teacher.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>TutorSync | Teach</title>
            </Helmet>
            <div className="flex flex-col justify-center items-center p-4 bg-blue-50 min-h-screen">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                    <SectionTitle heading={'Teaching Position Application'}></SectionTitle>
                    {hasApplied ? (
                        <div className="text-center">
                            {applicationStatus === 'pending' && <p className="text-lg font-bold">Your application is under review.</p>}
                            {applicationStatus === 'accepted' && <p className="text-lg font-bold">Your application has been accepted.</p>}
                            {applicationStatus === 'rejected' && (
                                <div>
                                    <p className="text-lg font-bold">Your application was rejected.</p>
                                    <button
                                        onClick={() => setHasApplied(false)}
                                        className="btn text-blue-900 font-bold bg-gradient-to-l from-blue-200 to-blue-400 hover:border-4 mt-4"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <img src={user.photoURL} alt="User" className="w-24 h-24 rounded-full object-cover mb-4" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Experience Level</span>
                                </label>
                                <select
                                    {...register("experience", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Mid-level">Mid-level</option>
                                    <option value="Experienced">Experienced</option>
                                </select>
                                {errors.experience && <span className="text-red-500 text-sm">Experience level is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Web development">Web Development</option>
                                    <option value="Digital marketing">Digital Marketing</option>
                                    <option value="Data science">Data Science</option>
                                    <option value="Graphic design">Graphic Design</option>
                                    <option value="Cyber security">Cyber Security</option>
                                </select>
                                {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn text-blue-900 font-bold w-full bg-gradient-to-l from-blue-200 to-blue-400 hover:border-4">Submit Application for Review</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeachOnTutorSync;
