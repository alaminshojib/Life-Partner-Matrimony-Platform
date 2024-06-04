import React from "react";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-4xl text-secondary mb-4">
                        <FaBook />
                    </div>
                    <div className="text-center text-xl font-bold">Total Biodata Count</div>
                    <div className="text-center text-2xl font-bold">{stats.totalBiodata}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-4xl text-secondary mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-bold">Male Biodata Count</div>
                    <div className="text-center text-2xl font-bold">{stats.maleBiodata}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-4xl text-secondary mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-bold">Female Biodata Count</div>
                    <div className="text-center text-2xl font-bold">{stats.femaleBiodata}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-4xl text-secondary mb-4">
                        <FaUsers />
                    </div>
                    <div className="text-center text-xl font-bold">Premium Biodata Count</div>
                    <div className="text-center text-2xl font-bold">{stats.premiumBiodata}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-4xl text-secondary mb-4">
                        <FaDollarSign />
                    </div>
                    <div className="text-center text-xl font-bold">Total Revenue</div>
                    <div className="text-center text-2xl font-bold">${stats.totalRevenue}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
