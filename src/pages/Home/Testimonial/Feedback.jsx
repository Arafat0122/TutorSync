import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        fetch('https://tutor-sync-server.vercel.app/reviews')
            .then((response) => response.json())
            .then((data) => setFeedbackData(data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 my-6 text-gray-800 rounded-lg">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                {feedbackData.map((feedback, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="flex flex-col max-w-sm mx-4 my- shadow-lg">
                            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-50">
                                <p className="relative px-6 py-1 text-lg italic text-center text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-600">
                                        <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                        <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                    </svg>
                                    {feedback.feedbackText}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-600">
                                        <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                        <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                    </svg>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-violet-600 text-gray-50">
                                <div className="h-32 w-32 rounded-full">
                                    <img
                                        className="w-32 h-32 -mt-20 bg-center bg-cover rounded-full bg-gray-300"
                                        src={`${feedback.image ? `${feedback.image}`: `${feedback.name}` }`}
                                        alt={feedback.name}
                                    />
                                </div>
                                <p className="text-xl font-semibold leading-tight">{feedback.title}</p>
                                <p className="text-xl font-semibold leading-tight uppercase">{feedback.name}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </Carousel>
        </div>
    );
};

export default Feedback;
