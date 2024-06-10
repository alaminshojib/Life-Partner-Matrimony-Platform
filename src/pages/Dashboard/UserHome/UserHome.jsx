import React from "react";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <h2 className="text-3xl text-center mb-4 font-bold text-blue-800">Welcome to Your Dashboard</h2>
                <p className="text-lg text-center mb-6 text-gray-600">
                    {user?.displayName ? `Hello, ${user.displayName}!` : `Hello!`}
                </p>
                <div className="mt-8">
                    <h3 className="text-xl mb-4 font-semibold text-gray-800">Performance Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 text-center text-gray-800">Orders Completed</h4>
                            <p>Content related to orders completed can be displayed here.</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 text-center text-gray-800">Order Status</h4>
                            <p>Content related to order status can be displayed here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
