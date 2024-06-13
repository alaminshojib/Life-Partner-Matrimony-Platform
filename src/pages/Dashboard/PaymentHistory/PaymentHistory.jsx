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
            <table className="w-full table-auto text-center">
              {/* Head */}
              <thead>
                <tr className=" bg-blue-500 rounded-t text-white">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Transaction Id</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">${payment.price.toFixed(2)}</td>
                      <td className="border px-4 py-2">{payment.transactionId}</td>
                      <td className="border px-4 text-green-500 py-2">Successful</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">No payments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};

export default PaymentHistory;
