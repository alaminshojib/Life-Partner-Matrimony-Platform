import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    useEffect(() => {
        // Check if the current user is an admin
        const checkAdminStatus = async () => {
            try {
                const res = await axiosSecure.get('/users/checkAdminStatus');
                setIsAdmin(res.data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
            }
        };

        // Check if the current user is a premium user
        const checkPremiumStatus = async () => {
            try {
                const res = await axiosSecure.get('/users/checkPremiumStatus');
                setIsPremium(res.data.isPremium);
            } catch (error) {
                console.error('Error checking premium status:', error);
            }
        };

        checkAdminStatus();
        checkPremiumStatus();
    }, [axiosSecure]);

    const makeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    setIsAdmin(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.username} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error making admin:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Error making ${user.username} an Admin`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    const makePremium = user => {
        axiosSecure.patch(`/users/premium/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    setIsPremium(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.username} is now Premium!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error making premium:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Error making ${user.username} Premium`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    const handleSearch = async () => {
        try {
            const response = await axios.post('/users/search', { email: searchTerm });
            refetch();
        } catch (error) {
            console.error('Error searching users:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error searching users",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Search
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">User Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {!isAdmin ? (
                                    <button
                                        onClick={() => makeAdmin(user)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none mr-2"
                                    >
                                        Make Admin
                                    </button>
                                ) : (
                                    <span className="text-green-500 font-bold">Admin</span>
                                )}
                                {!isPremium ? (
                                    <button
                                        onClick={() => makePremium(user)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded focus:outline-none"
                                    >
                                        Make Premium
                                    </button>
                                ) : (
                                    <span className="text-yellow-500 font-bold">Premium</span>
                                )}
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
        <QueryClientProvider client={queryClient} key={queryClient._id}>
            <ManageUsers />
        </QueryClientProvider>
    );
};

export default App;
