import { useLoaderData } from "react-router-dom";
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const Progress = () => {
    const reviewsData = useLoaderData();

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewsData.map(reviewData => (
                    <div key={reviewData._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src={reviewData.image} alt={reviewData.name} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{reviewData.name}</h3>
                                    <Rating
                                        initialRating={reviewData.rating}
                                        readonly
                                        emptySymbol={<FaStar className="text-gray-300" />}
                                        fullSymbol={<FaStar className="text-yellow-500" />}
                                    />
                                </div>
                            </div>
                            <p className="text-gray-700"><span className="font-bold"> Feedback: </span>{reviewData.feedbackText}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Progress;
