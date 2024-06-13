import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { FaCheck } from "react-icons/fa";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedContactRequest = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: contactRequests = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
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

    const approveContactMutation = useMutation(
        contactRequest => axiosSecure.patch(`/payments/${contactRequest._id}`),
        {
            onSuccess: () => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Contact request approved!',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: handleError
        }
    );

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

    const handleSearch = () => {
        refetch();
    };

    const handleApproveContact = (contactRequest) => {
        approveContactMutation.mutate(contactRequest);
    };

    const handleDeleteContactRequest = (contactRequest) => {
        deleteContactRequestMutation.mutate(contactRequest);
    };

    const filteredContactRequests = contactRequests.filter(contactRequest =>
        contactRequest.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto ">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Approved Contact Requests</h1>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow focus:outline-none transition duration-200"
                >
                    Search
                </button>
            </div>
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">#</th>
                        <th className="py-3 px-4 text-center">Name</th>
                        <th className="py-3 px-4 text-center">Mobile Number</th>
                        <th className="py-3 px-4 text-center">Email</th>
                        <th className="py-3 px-4 text-center">Biodata Id</th>
                        <th className="py-3 px-4 text-center">Approved</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {filteredContactRequests.length > 0 ? (
                        filteredContactRequests.map((contactRequest, index) => (
                            <React.Fragment key={contactRequest._id}>
                                {contactRequest.items.map((item, subIndex) => (
                                    <tr key={subIndex} className="border-b transition duration-200 hover:bg-gray-100">
                                        <th className="py-3 px-4 text-center">{index + 1}.{subIndex + 1}</th>
                                        <td className="py-3 px-4 text-center">{item.name}</td>
                                        <td className="py-3 px-4 text-center">{item.mobile_number}</td>
                                        <td className="py-3 px-4 text-center">{item.contact_email}</td>
                                        <td className="py-3 px-4 text-center">{item.biodataId}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => handleApproveContact(contactRequest)}
                                                className={` font-bold p-2 rounded-full text-green-600 transition duration-200 ${
                                                    contactRequest.approved ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                disabled={contactRequest.status === "Approved"}
                                            >
                                                {contactRequest.status === "Approved" ?  <FaCheck className="text-green-600 text-xl" /> : 'Approve'}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => handleDeleteContactRequest(contactRequest)}
                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
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
