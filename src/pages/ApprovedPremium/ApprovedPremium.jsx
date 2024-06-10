import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaCrown } from "react-icons/fa";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: biodatas = [], refetch } = useQuery(['biodatas'], async () => {
        const usersResponse = await axiosSecure.get('/users');
        const usersEmails = usersResponse.data.map(user => user.contact_email);

        const biodatasResponse = await axiosSecure.get('/biodatas');
        const filteredBiodatas = biodatasResponse.data.filter(user => usersEmails.includes(user.contact_email));

        return filteredBiodatas;
    });

    const makePremiumMutation = useMutation(
        async (contact_email) => {
            await axiosSecure.patch(`/biodatas/premium/${contact_email}`);
        },
        {
            onSuccess: () => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Biodata has been marked as premium.',
                });
            },
            onError: (error) => {
                console.error('Error marking biodata as premium:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to mark biodata as premium. Please try again.',
                });
            },
        }
    );

    const deleteUserMutation = useMutation(
        async (contact_email) => {
            await axiosSecure.delete(`/biodatas/${contact_email}`);
        },
        {
            onSuccess: () => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User deleted successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: (error) => {
                console.error('Error deleting user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete user. Please try again.',
                });
            },
        }
    );

    const handleSearch = () => {
        refetch();
    };

    const handleMakePremium = (user) => {
        makePremiumMutation.mutate(user.contact_email);
    };

    const handleDeleteUser = (user) => {
        deleteUserMutation.mutate(user.contact_email);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Approved Premium Users</h1>
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
                        <th className="py-3 px-4 text-center">Biodata Id</th>
                        <th className="py-3 px-4 text-center">Name</th>
                        <th className="py-3 px-4 text-center">Email</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {biodatas.length > 0 ? (
                        biodatas.filter(user => user.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
                            <tr key={user._id} className="border-b transition duration-200 hover:bg-gray-100">
                                <td className="py-3 px-4 text-center">{index + 1}</td>
                                <td className="py-3 px-4 text-center">{user.biodataId}</td>
                                <td className="py-3 px-4 text-center">{user.name}</td>
                                <td className="py-3 px-4 text-center">{user.contact_email}</td>
                                <td className="py-3 px-4 text-center">
                                    {user.isPremium === true ? (
                                        <span className="text-sm font-semibold text-yellow-600 flex items-center justify-center">
                                            <FaCrown className="mr-1" /> Premium
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakePremium(user)}
                                            className="bg-yellow-500 text-white p-2 font-bold rounded-lg hover:bg-yellow-600 transition duration-200 flex items-center justify-center"
                                        >
                                            <FaCrown className="mr-1" /> Make Premium
                                        </button>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        <FaTrashAlt className="text-white text-2xl" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-3 px-4 text-center text-gray-500">No Available Data By This Name</td>
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
            <ApprovedPremium />
        </QueryClientProvider>
    );
};

export default App;
