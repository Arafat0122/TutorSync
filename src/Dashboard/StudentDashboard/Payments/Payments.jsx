import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBook, FaDollarSign } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Payments = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch(`https://tutor-sync-server.vercel.app/my-payments?email=${user.email}`)
            .then(response => response.json())
            .then(data => setPayments(data))
    }, [user.email]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Payments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-900 text-2xl text-gray-100">
                            <th className="py-2 px-4"></th>
                            <th className="py-2 px-4">TranID</th>
                            <th className="py-2 px-4"><FaUser /></th>
                            <th className="py-2 px-4"><FaEnvelope /></th>
                            <th className="py-2 px-4"><FaBook /></th>
                            <th className="py-2 px-4"><FaDollarSign /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="bg-blue-100 hover:bg-gray-100 font-semibold">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{payment.TranId}</td>
                                <td className="py-2 px-4 border-b">{payment.name}</td>
                                <td className="py-2 px-4 border-b">{payment.email}</td>
                                <td className="py-2 px-4 border-b">{payment.title}</td>
                                <td className="py-2 px-4 border-b">${payment.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
