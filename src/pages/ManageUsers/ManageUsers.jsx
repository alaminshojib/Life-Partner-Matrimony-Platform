import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUsers, FaCrown } from "react-icons/fa";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: biodatas = [], refetch: refetchBiodatas } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/biodatas');
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${user._id}`);
            if (res.data.modifiedCount > 0) {
                refetchUsers();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is now an admin!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleMakePremium = async (user) => {
        try {
            await axiosSecure.patch(`/biodatas/premium/${user.contact_email}`);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User is now a premium member.',
            });
            refetchBiodatas(); // Refetch to update the state
        } catch (error) {
            handleError(error);
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const res = await axiosSecure.delete(`/users/${user._id}`);
            if (res.data.deletedCount > 0) {
                refetchUsers();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} deleted successfully!`,
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

    // Filter users based on email matching with biodatas contact_email or role is 'admin'
    const filteredUsers = users.filter(user =>
        user.role === 'admin' || biodatas.some(biodata => biodata.contact_email === user.email)
    );

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage Users</h1>
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">#</th>
                        <th className="py-3 px-4 text-center">Name</th>
                        <th className="py-3 px-4 text-center">Username/Email</th>
                        <th className="py-3 px-4 text-center">Role</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {filteredUsers.map((user, index) => (
                        <tr key={user._id} className="border-b transition duration-200 hover:bg-gray-100">
                            <th className="py-3 px-4 text-center">{index + 1}</th>
                            <td className="py-3 px-4 text-center">{user.name || user.displayName}</td>
                            <td className="py-3 px-4 text-center">{user.contact_email || user.email}</td>
                            <td className="py-3 px-4 text-center">
                                {user.role === 'admin' ? (
                                    <span className="text-sm font-semibold text-blue-600">Admin</span>
                                ) : (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-200"
                                    >
                                        <FaUsers className="text-white text-xl" />
                                    </button>
                                )}
                            </td>
                            <td className="py-3 px-4 text-center">
                                {(user.role === "admin" || biodatas.find(biodata => biodata.contact_email === user.contact_email)?.isPremium) ? (
                                    <span className="text-sm font-semibold text-yellow-600">Premium</span>
                                ) : (
                                    <button
                                        onClick={() => handleMakePremium(user)}
                                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-200"
                                    >
                                        <FaCrown className="text-white text-xl" />
                                    </button>
                                )}
                            </td>

                            <td className="py-3 px-4 text-center">
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
                                >
                                    <FaTrashAlt className="text-white text-xl" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ManageUsers />
        </QueryClientProvider>
    );
};

export default App;
