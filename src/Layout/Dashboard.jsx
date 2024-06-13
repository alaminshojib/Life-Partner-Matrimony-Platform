import React, { useState } from "react";
import { FaHome, FaUtensils, FaListAlt, FaEdit, FaHeart, FaEnvelopeOpen, FaUsers, FaShoppingCart, FaHistory, FaSearch, FaBars, FaTimes, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useCheckouts from "../hooks/useCheckouts";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const [checkouts] = useCheckouts();
    const [isAdmin] = useAdmin();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        logOut()
            .then()
            .catch()
        navigate("/login")
    }

    return (
        <div className="flex flex-col md:flex-row h-fit">
            {/* drawer handle */}
            <div className="md:hidden bg-blue-500 flex items-center justify-between ">
                <div>
                    {isDrawerOpen ? (
                        <button className="text-white p-4" onClick={toggleDrawer}>
                            <FaTimes />
                        </button>
                    ) : (
                        <button className="text-white p-4" onClick={toggleDrawer}>
                            <FaBars />
                        </button>
                    )}
                </div>

                <nav className="flex items-center px-3 font-bold text-md text-white">
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to="/" className=" hover:text-orange-500">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/biodatas" className=" hover:text-orange-500">All Biodatas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contactUs" className=" hover:text-orange-500">Contact</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* dashboard side bar */}
            <div className={`w-full md:w-64 min-h-screen bg-blue-500 md:flex-shrink-0 ${isDrawerOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="menu p-4">
                    {/* sidebar links */}
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaHome className="mr-2" />
                                    Admin Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaUsers className="mr-2" />
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approvedPremium" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaHeart className="mr-2" />
                                    Approved Premium
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approvedContactRequest" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaEnvelopeOpen className="mr-2" />
                                    Approved Contact Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/success-stories" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaEnvelopeOpen className="mr-2" />
                                    Success Stories
                                </NavLink>
                            </li>

                        </>
                            :
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
                                        My favourites Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/success-story" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                        <FaHeart className="mr-2" />
                                       Got Married
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
                    }
                    {/* shared nav links */}
                    <div className="divider my-4 border-b-2 border-white"></div>
                    <li>
                        <NavLink to="/" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaHome className="mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/biodatas" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaSearch className="mr-2" />
                            All Biodatas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactUs" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaEnvelope className="mr-2" />
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleLogout} className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
