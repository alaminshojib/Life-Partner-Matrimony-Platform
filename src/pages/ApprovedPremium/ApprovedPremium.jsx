import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovedPremium = () => {
    const [premiumRequests, setPremiumRequests] = useState([]);

    useEffect(() => {
        axios.get('/premium-requests')
            .then(response => {
                setPremiumRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching premium requests:', error);
            });
    }, []);

    const makePremium = (id) => {
        axios.patch(`/premium-requests/${id}/make-premium`)
            .then(response => {
                setPremiumRequests(prevRequests => {
                    return prevRequests.map(request => {
                        if (request.id === id) {
                            return { ...request, isPremium: true };
                        }
                        return request;
                    });
                });
            })
            .catch(error => {
                console.error('Error making request premium:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Premium Approval Requests</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-100">Name</th>
                        <th className="px-4 py-2 bg-gray-100">Email</th>
                        <th className="px-4 py-2 bg-gray-100">Biodata ID</th>
                        <th className="px-4 py-2 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {premiumRequests.map(request => (
                        <tr key={request.id}>
                            <td className="border px-4 py-2">{request.name}</td>
                            <td className="border px-4 py-2">{request.email}</td>
                            <td className="border px-4 py-2">{request.biodataId}</td>
                            <td className="border px-4 py-2">
                                {request.isPremium ? (
                                    <span className="text-green-500 font-bold">Premium</span>
                                ) : (
                                    <button 
                                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                                        onClick={() => makePremium(request.id)}
                                    >
                                        Make Premium
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedPremium;
