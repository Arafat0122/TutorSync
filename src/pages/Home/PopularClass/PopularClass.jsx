import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './PopularClass.css';

import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const PopularClass = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("https://tutor-sync-server.vercel.app/classes")
            .then((response) => response.json())
            .then((data) => {
                const sortedCourses = data.sort((a, b) => {
                    return b.totalEnrollments - a.totalEnrollments;
                });
                const topCourses = sortedCourses.slice(0, 12);
                setCourses(topCourses);
            })
    }, []);
    return (
        <>
        <SectionTitle heading={'Recommended Classes for You'}></SectionTitle>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5' >
                <div className='flex flex-col justify-center'>
                    <h1 className="mb-5 ml-7 md:ml-0 lg:ml-0 text-4xl md:text-5xl lg:text-6xl font-bold  italic">Popular Classes</h1>
                    <p className="mb-5 max-w-xl ml-7 md:ml-0 lg:ml-0">
                        Discover a wide range of popular classes designed to help you achieve your learning goals. From web development and digital marketing to data science and graphic design, our expert instructors provide comprehensive training to elevate your skills. Join thousands of learners and start your journey towards mastery today!
                    </p>
                </div>
                <div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper h-[400px]"
                    >
                        {courses.map((course, id) => (
                            <SwiperSlide key={id}>
                                <div className="card w-96 glass">
                                    <figure>
                                    <img src={course.image} alt={course.title} />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{course.title}</h2>
                                        <p>Enrollment: {course.totalEnrollments}</p>
                                        <div className="card-actions justify-end">
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default PopularClass;