import React from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { FaCrown, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    const { data: biodatas = [], refetch: refetchBiodatas } = useQuery(['premiumBiodatas'], async () => {
        const biodatasResponse = await axiosSecure.get('/biodatas');
        return biodatasResponse.data.filter(biodata => biodata.isPremium);
    });

    const { data: users = [], refetch: refetchUsers } = useQuery(['premiumUsers'], async () => {
        const usersResponse = await axiosSecure.get('/users');
        return usersResponse.data.filter(user => user.isPremium);
    });

    const makePremiumMutation = useMutation(
        async (contact_email) => {
            await axiosSecure.patch(`/biodatas/premium/${contact_email}`);
        },
        {
            onSuccess: () => {
                refetchBiodatas();
                refetchUsers();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User marked as premium successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: (error) => {
                console.error('Error making user premium:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to mark user as premium. Please try again.',
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
                refetchBiodatas();
                refetchUsers();
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

    const handleMakePremium = (user) => {
        makePremiumMutation.mutate(user.contact_email);
    };

    const handleDeleteUser = (user) => {
        deleteUserMutation.mutate(user.contact_email);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Approved Premium Users</h1>
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
                    {biodatas.concat(users).length > 0 ? (
                        biodatas.concat(users).map((user, index) => (
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
                            <td colSpan="6" className="py-3 px-4 text-center text-gray-500">No premium users available</td>
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
