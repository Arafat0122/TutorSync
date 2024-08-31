import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import BeTutor from "./BeATutor/BeTutor";
import Collaborators from "./Collaborators/Collaborators";
import PopularClass from "./PopularClass/PopularClass";
import Stats from "./Stats/Stats";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>TutorSync</title>
            </Helmet>
            <Banner></Banner>
            <Collaborators></Collaborators>
            <PopularClass></PopularClass>
            <Testimonial></Testimonial>
            <Stats></Stats>
            <BeTutor></BeTutor>
        </>
    );
};

export default Home;