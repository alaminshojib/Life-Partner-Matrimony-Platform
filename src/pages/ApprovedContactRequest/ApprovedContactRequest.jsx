import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from "react-icons/fa";
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

    const handleSearch = () => {
        refetch();
    };

    const handleApproveContact = async (contactRequest) => {
        try {
            const res = await axiosSecure.patch(`/payments/${contactRequest._id}`);
            if (res.data.success) {
                await refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Contact request approved!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleDeleteContactRequest = async (contactRequest) => {
        try {
            const res = await axiosSecure.delete(`/payments/${contactRequest._id}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Contact request deleted successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    };

    const filteredContactRequests = contactRequests.filter(contactRequest =>
        contactRequest.name && contactRequest.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th className="py-3 px-4 text-center">Email</th>
                        <th className="py-3 px-4 text-center">Biodata Id</th>
                        <th className="py-3 px-4 text-center">Approved</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {filteredContactRequests.length > 0 ? (
                        filteredContactRequests.map((contactRequest, index) => (
                            <tr key={contactRequest._id} className="border-b transition duration-200 hover:bg-gray-100">
                                <th className="py-3 px-4 text-center">{index + 1}</th>
                                <td className="py-3 px-4 text-center">{contactRequest.name}</td>
                                <td className="py-3 px-4 text-center">{contactRequest.email}</td>
                                <td className="py-3 px-4 text-center">{contactRequest.biodataId}</td>
                                <td className="py-3 px-4 text-center">
                                    {contactRequest.approved ? (
                                        <FaCheck className="text-green-600 text-xl" />
                                    ) : (
                                        <FaTimes className="text-red-600 text-xl" />
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleApproveContact(contactRequest)}
                                        className={`bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200 ${
                                            contactRequest.approved ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={contactRequest.approved}
                                    >
                                        {contactRequest.approved ? 'Approved' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteContactRequest(contactRequest)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-3 px-4 text-center text-gray-500">No Available Contact Requests</td>
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
