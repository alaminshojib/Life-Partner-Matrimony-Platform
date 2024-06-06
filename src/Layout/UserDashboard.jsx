import React from "react";
import { FaHome, FaEdit, FaHeart, FaEnvelopeOpen, FaShoppingCart, FaHistory, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserDashboard = ({ checkouts }) => {
    return (
        <>
            <li>
                <NavLink to="/dashboard/userHome" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaHome className="mr-2" />
                    User Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/edit-biodata" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaEdit className="mr-2" />
                    Edit Biodata
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/view-biodata" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaSearch className="mr-2" />
                    View Biodata
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-contact-request" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaEnvelopeOpen className="mr-2" />
                    My Contact Request
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-favourites-biodata" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaHeart className="mr-2" />
                    My Favourites Biodata
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/checkouts" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaShoppingCart className="mr-2" />
                    My Checkout ({checkouts.length})
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/paymentHistory" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                    <FaHistory className="mr-2" />
                    Real Payment History
                </NavLink>
            </li>
        </>
    );
};

export default UserDashboard;
