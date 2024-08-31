import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({ data }) => {

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const totalPrice = data.price;
    const title = data.title;
    const classId = data.classId;
    const email = user.email;
    const image = data.image;
    const name = data.name;
    const price = data.price;
    const totalEnrollments = data.totalEnrollments;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        // payment confirmation
        const { paymentIntent, error: confrimError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confrimError) {
            setError(confrimError.message);
        } else {
            setTransactionId(paymentIntent.id);

            const payment = {
                TranId: paymentIntent.id,
                price: totalPrice,
                name: user.displayName,
                email: user.email,
                title: title

            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Payment Successful`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            const enrollmentData = {
                classId: classId,
                email: email,
                name: title,
                image: image,
                instructor: name,
                price: price,
                totalEnrollment: totalEnrollments,
            }
            axiosSecure.post('/enrollments', enrollmentData)
            window.location.href = '/dashboard/my-payments';
        }
    }

    return (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="p-4 border border-gray-300 rounded-lg mb-4"
                    />
                </div>
                <div className="flex flex-col space-y-4">
                    <button
                        className="btn btn-primary font-semibold w-full py-3 rounded-lg"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay ${totalPrice.toFixed(2)}
                    </button>
                    {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                    {transactionId && <p className="text-green-500 text-center mt-4">Your Transaction ID: {transactionId}</p>}
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;