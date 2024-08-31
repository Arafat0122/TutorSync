import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const AllClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://tutor-sync-server.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, []);
    return (
        <div>
            <Helmet>
                <title>TutorSync | All Classes</title>
            </Helmet>
            <div className='container mx-auto px-4 pt-5 bg-blue-50'>
                <SectionTitle heading={'All Classes'}></SectionTitle>
                <p className="text-lg md:text-xl lg:text-2xl text-center my-4 max-w-xl mx-auto">
                    Discover a wide range of popular classes designed to help you achieve your learning goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {classes.map((course, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-2">
                            <img className="w-full h-56 object-cover object-center" src={course.image} alt={course.title} />
                            <div className="p-4 h-52">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">By {course.name}</p>
                                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-bold text-gray-800">{course.price}</p>
                                    <p className="text-gray-600 text-sm">Enrollment: {course.totalEnrollments}</p>
                                </div>
                            </div>
                            <Link to={`/classes/${course._id}`}><button className="btn w-full">Enroll</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllClasses;