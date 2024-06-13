import React from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: contactRequests = [], refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      // Filter contactRequests where contact_email matches user's email
      return res.data.filter(request => request.email === user.email);
    }
  });

  const handleError = (error) => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  };

  const deleteContactRequestMutation = useMutation(
    contactRequest => axiosSecure.delete(`/payments/${contactRequest._id}`),
    {
      onSuccess: () => {
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Contact request deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      onError: handleError
    }
  );

  const handleDeleteContactRequest = (contactRequest) => {
    deleteContactRequestMutation.mutate(contactRequest);
  };

  console.log(contactRequests);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Contact Requests</h1>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="py-3 px-4 text-center">#</th>
            <th className="py-3 px-4 text-center">Biodata Id</th>
            <th className="py-3 px-4 text-center">Name</th>
            <th className="py-3 px-4 text-center">Mobile Number</th>
            <th className="py-3 px-4 text-center">Email</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contactRequests.length > 0 ? (
            contactRequests.map((transaction, index) => (
              transaction.items.map((item, i) => (
                <tr key={`${index}-${i}`} className="border-b text-center transition duration-200 hover:bg-gray-100">
                  <td className="py-3 px-4">#</td>
                  <td className="py-3 px-4">{item.biodataId || 'N/A'}</td>
                  <td className="py-3 px-4">{item.name || 'N/A'}</td>
                  <td className="py-3 px-4">{transaction.status === 'Approved' ? item.mobile_number : 'N/A'}</td>
                  <td className="py-3 px-4">{transaction.status === 'Approved' ? item.contact_email : 'N/A'}</td>
                  <td className="py-3 px-4 text-green-500 font-bold">{transaction.status}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteContactRequest(transaction)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-4 text-center text-gray-500">No Available Contact Requests</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApprovedContactRequest />
    </QueryClientProvider>
  );
};

export default App;
