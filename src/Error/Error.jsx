import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="bg-blue-50">
            <div className="flex flex-col w-fit mx-auto h-screen my-auto items-center justify-center">
                <img src="https://i.ibb.co/5cVsR7X/404.png" alt="" />
                <Link><button className="btn mt-5 mb-10 bg-blue-700 text-white">Return to Home</button></Link>
            </div>
        </div>
    );
};

export default Error;