import React from "react";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, isError } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-bold">Loading...</div>
        </div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-bold text-red-500">Error loading stats</div>
        </div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Admin Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-5xl text-white mb-4">
                        <FaBook />
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Total Biodata Count</div>
                    <div className="text-center text-3xl font-bold text-white">{stats.totalBiodata}</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-5xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Male Biodata Count</div>
                    <div className="text-center text-3xl font-bold text-white">{stats.maleBiodata}</div>
                </div>
                <div className="bg-gradient-to-r from-pink-400 to-red-500 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-5xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Female Biodata Count</div>
                    <div className="text-center text-3xl font-bold text-white">{stats.femaleBiodata}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-5xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Premium Biodata Count</div>
                    <div className="text-center text-3xl font-bold text-white">{stats.premiumBiodata}</div>
                </div>
                <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-5xl text-white mb-4">
                        <FaDollarSign />
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Total Revenue</div>
                    <div className="text-center text-3xl font-bold text-white">${stats.totalRevenue}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
