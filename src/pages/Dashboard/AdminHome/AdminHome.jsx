import React from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminHome = () => {
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
            <div className="text-3xl font-bold text-blue-500">Loading...</div>
        </div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-3xl font-bold text-red-500">Error loading stats</div>
        </div>;
    }

    const pieData = {
        labels: ['Total Biodata', 'Male Biodata', 'Female Biodata', 'Premium Biodata'],
        datasets: [
            {
                data: [stats.totalBiodata, stats.maleBiodata, stats.femaleBiodata, stats.premiumBiodata],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="bg-green-500 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-6xl text-white mb-4">
                        <FaBook />
                    </div>
                    <div className="text-center text-xl font-semibold text-white">Total Biodata Count: </div>
                    <div className="text-center text-3xl font-bold text-white">{stats.totalBiodata}</div>
                </div>
                <div className="bg-yellow-500 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-6xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-semibold text-white">Male Biodata Count: </div>
                    <div className="text-center text-3xl font-bold text-white">{stats.maleBiodata}</div>
                </div>
                <div className="bg-pink-500 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-6xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-semibold text-white">Female Biodata Count: </div>
                    <div className="text-center text-3xl font-bold text-white">{stats.femaleBiodata}</div>
                </div>
                <div className="bg-purple-500 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-6xl text-white mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-semibold text-white">Premium Biodata Count: </div>
                    <div className="text-center text-3xl font-bold text-white">{stats.premiumBiodata}</div>
                </div>
                <div className="bg-teal-500 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center text-6xl text-white mb-4">
                        <FaDollarSign />
                    </div>
                    <div className="text-center text-xl font-semibold text-white">Total Revenue: </div>
                    <div className="text-center text-3xl font-bold text-white">${stats.totalRevenue}</div>
                </div>
            </div>
            <div className="mt-12">
                <h1 className="text-bold text-3xl text-center py-5">Summarry Details By PieChart :</h1>
                <div className="w-full lg:w-2/6 mx-auto">
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
