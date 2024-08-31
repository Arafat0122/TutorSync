import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);
const Payment = () => {

    const data = useLoaderData();

    return (
        <>
            <Helmet>
                <title>TutorSync | Payment</title>
            </Helmet>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12">
                <SectionTitle heading="Payment" />
                <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 mx-auto mt-10">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm data={data} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Payment;