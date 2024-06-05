import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    {/* Head */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Transaction Id</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">${payment.price}</td>
                                <td className="border px-4 py-2">{payment.transactionId}</td>
                                <td className="border px-4 py-2">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {payments.length === 0 && (
                <p className="text-gray-500 mt-4">No payments found.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
