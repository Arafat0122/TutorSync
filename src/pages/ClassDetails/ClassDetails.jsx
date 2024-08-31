import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";

const ClassDetails = () => {
    const classData = useLoaderData();


    return (
        <>
            <Helmet>
                <title>TutorSync | {classData.title}</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-blue-100">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={classData.image} alt={classData.title} className="w-full h-64 object-cover object-center" />
                    <div className="p-6">
                        <h2 className="text-4xl font-cardo font-bold text-blue-800">{classData.title}</h2>
                        <p className="mt-3 text-lg font-cardo text-gray-600">{classData.description}</p>
                        <div className="flex flex-col md:flex-row justify-between lg:items-center mt-6">
                            <div className="text-lg font-exo-2 text-blue-800">
                                <p className="font-semibold">Instructor:</p>
                                <p>{classData.name}</p>
                            </div>
                            <div className="text-lg font-exo-2 text-blue-800 mt-4 md:mt-0">
                                <p className="font-semibold">Price:</p>
                                <p>{classData.price}</p>
                            </div>
                            <div className="text-lg font-exo-2 text-blue-800 mt-4 md:mt-0">
                                <p className="font-semibold">Total Enrolment:</p>
                                <p>{classData.totalEnrollments}</p>
                            </div>
                        </div>
                        <div className="text-center pt-5">
                            <Link to={`/payment/${classData._id}`}><button className="btn w-full lg:w-1/3 mx-auto">Payment</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassDetails;
