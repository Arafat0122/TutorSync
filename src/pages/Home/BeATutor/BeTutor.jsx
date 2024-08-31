import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const BeTutor = () => {
    return (
        <div>
            <SectionTitle heading={'Start Teaching'}></SectionTitle>
            <div className="hero bg-base-200 mb-10">
                <div className="hero-content grid grid-cols-2">
                    <div className="flex justify-center">
                        <img src="https://i.ibb.co/wQ80pVp/Tutor.png" className="h-56 md:h-full rounded-lg shadow-2xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Become an instructor</h1>
                        <p className="lg:py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
                        <Link to={'/teach'}><button className="btn btn-primary">Start Teaching Today</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeTutor;