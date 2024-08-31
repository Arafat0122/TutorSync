import { FaUsers } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TbHandClick } from "react-icons/tb";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useClass from "../../../Hooks/useClass";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Stats = () => {
    const axiosSecure = useAxiosSecure();
    const { enrollments, isLoading, error } = useClass();
    const [usersCount, setUsersCount] = useState(0);
    const [classesCount, setClassesCount] = useState(0);
    const [enrollmentsCount, setEnrollmentsCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/users');
                setUsersCount(response.data.length);
            } catch {
                return
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await axiosSecure.get('/classes');
                setClassesCount(response.data.length);
            } catch {
                return
            }
        };

        fetchUsers();
        fetchClasses();
    }, [axiosSecure]);

    useEffect(() => {
        if (enrollments) {
            setEnrollmentsCount(enrollments.length);
        }
    }, [enrollments]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <SectionTitle heading={'Website Overview'}></SectionTitle>
            <section className="p-6 my-6 text-white">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-600">
                            <FaUsers className="text-3xl text-gray-100" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-bold leading-none">{usersCount}</p>
                            <p className="capitalize">Users</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-600">
                            <MdOutlineClass className="text-3xl text-gray-100" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-bold leading-none">{classesCount}</p>
                            <p className="capitalize">Total Classes</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-600">
                            <PiStudent className="text-3xl text-gray-100" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-bold leading-none">{enrollmentsCount}</p>
                            <p className="capitalize">Total Enrollment</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-600">
                            <TbHandClick className="text-3xl text-gray-100" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-bold leading-none">37%</p>
                            <p className="capitalize">Bounce rate</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stats;
