

const Banner = () => {

    return (
        <>
            <div className="hero min-h-96 text-[#eee]" style={{ backgroundImage: 'url(https://i.ibb.co/2SzXCfW/Banner-Image.png)' }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="">
                    <div className="">
                        <h1 className="mb-5 ml-7 md:ml-0 lg:ml-0 text-4xl md:text-5xl lg:text-6xl font-bold  italic font-exo2">The Best Online <br /> Learning Platform</h1>
                        <p className="mb-5 max-w-xl ml-7 md:ml-0 lg:ml-0 font-cardo">Unlock your potential with our diverse range of courses, taught by industry experts. Join thousands of students who are enhancing their skills and advancing their careers with us. Learn anytime, anywhere, and take the next step towards your success.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;