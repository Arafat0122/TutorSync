import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Collaborators = () => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container mx-auto space-y-6 text-center lg:p-8 lg:space-y-16">
                    <SectionTitle heading={'Collaborators'}></SectionTitle>
                    <h2 className="text-xl md:text-2xl lg:text-4xl">Learn from <span className="font-bold">325+</span> leading universities and companies with TutorSync</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-10">
                        <div className="flex justify-center items-center">
                            <img className="w-3/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/1cf37d98b6fd015d85b68f95a84163c4.svg?auto=format%2Ccompress&dpr=1&h=32" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-2/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/d266099ac753c0c93d7d291257fee686.png?auto=format%2Ccompress&dpr=1&h=37" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-2/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/80cdb2567bfa0103fbbfb573784d479c.png?auto=format%2Ccompress&dpr=1&h=32" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-1/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/49f6fc3123e17dd16361d5b70bc258a9.png?auto=format%2Ccompress&dpr=1&h=55" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-3/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/25920b7c8bd5d2b415220fa76b7e9590.png?auto=format%2Ccompress&dpr=1&h=37" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-3/6" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/6c3c9b24dc786777991cb1c6b5d82933.png?auto=format%2Ccompress&dpr=1&h=32" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Collaborators;