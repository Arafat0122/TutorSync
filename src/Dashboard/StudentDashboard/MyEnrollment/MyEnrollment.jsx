import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const MyEnrollment = () => {

    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`https://tutor-sync-server.vercel.app/enrollments?email=${user.email}`)
            .then(response => response.json())
            .then(data => setClasses(data))
    }, [user.email]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Hi, {user.displayName}</h1>
            <p className="text-lg mb-6">Here you will see the list of classes you have enrolled in.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map(classItem => (
                    <div key={classItem._id} className="card bg-white shadow-md rounded-lg p-4">
                        <img src={classItem.image} alt={classItem.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-2xl font-semibold mb-2 h-24">{classItem.name}</h2>
                        <p className="text-gray-700 mb-4">Posted by: {classItem.instructor}</p>
                        <Link to={`${classItem._id}`} className="btn btn-primary">Continue</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrollment;