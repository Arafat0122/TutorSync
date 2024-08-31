import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";


const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const { createUser, signInWithGithub, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const onSubmit = (data) => {
        createUser(data.email, data.password, data.displayName, data.photoURL)
            .then(() => {

                const userInfo = {
                    name: data.displayName,
                    email: data.email,
                    photo: data.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();

                            navigate('/');
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
        setIsSubmitSuccessful(true);
    }

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Sign in successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            //navigate
                            navigate('/');
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Logged in successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            //navigate
                            navigate('/');
                        }
                    })

            })
            .catch(() => {
                // Show error toast
                toast.error('Invalid email or password. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const handleGithubLogIn = () => {
        signInWithGithub()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Sign in successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            //navigate
                            navigate('/');
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Logged in successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            //navigate
                            navigate('/');
                        }
                    })

            })
            .catch(() => {
                // Show error toast
                toast.error('Invalid email or password. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                displayName: "",
                email: "",
                photo: "",
                password: "",
            });
            setIsSubmitSuccessful(false);
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div>
            <Helmet>
                <title>TutorSync | Register</title>
            </Helmet>
            <div className="flex bg-[url('')] bg-blue-50 bg-center lg:bg-cover p-4">
                <div className="w-2/3 mx-auto rounded-md shadow sm:p-8 text-gray-800 animate__animated animate__zoomIn">
                    <SectionTitle heading={'Register'}></SectionTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Name</label>
                                <input type="text" {...register("displayName", { required: true })} name="displayName" placeholder="Your name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                                {errors.displayName && <span className="text-sm text-red-500">Name is required</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Email address:</label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Your Email Address" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                                {errors.email && <span className="text-sm text-red-500">Email Address is required</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Photo URL</label>
                                <input type="text" name="photoURL" {...register("photoURL", { required: true })} placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                                {errors.photoURL && <span className="text-sm text-red-500">Email Address is required</span>}
                            </div>
                            <div className="space-y-2 relative">
                                <div className="">
                                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/i
                                    })}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                                {errors.password?.type === "required" && <span className="text-sm text-red-500">Password is required</span>}
                                {errors.password?.type === "minLength" && <span className="text-sm text-red-500">Minimum 6 characters</span>}
                                {errors.password?.type === "pattern" && <span className="text-sm text-red-500">Password must have a number, a uppercase, a lowercase and a special character</span>}
                                <span
                                    className="absolute top-9 right-3"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash className="text-2xl"></FaEyeSlash> : <FaEye className="text-2xl"></FaEye>
                                    }

                                </span>
                            </div>
                        </div>
                        <div className="text-center"><input className="w-1/3 mx-auto px-8 py-3 font-semibold rounded-md bg-gradient-to-l from-[#46cadb] to-[#6887dd] text-gray-50" type="submit" value="Submit" /></div>
                    </form>
                    <p className="text-sm text-center font-medium bg-[#1111115e] w-fit mx-auto p-2 rounded-xl mt-10">Already have account?
                        <Link to={'/login'} className="focus:underline hover:underline"> Login here</Link>
                    </p>
                    <div className="my-6 space-y-4 content-center">
                        <button onClick={handleGoogleLogIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border-2 hover:border-4 rounded-md focus:ring-2 focus:ring-offset-1 border-white focus:ring-blue-600 bg-cyan-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current font-medium text-white">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p className="font-medium text-white">Login with Google</p>
                        </button>
                        <button onClick={handleGithubLogIn} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border-2 hover:border-4 rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 bg-cyan-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current font-medium text-white">
                                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                            </svg>
                            <p className="font-medium text-white">Login with GitHub</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;