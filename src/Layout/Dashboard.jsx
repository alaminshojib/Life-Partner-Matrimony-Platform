import React, { useState } from "react";
import { FaHome, FaUtensils, FaListAlt, FaEdit, FaHeart, FaEnvelopeOpen, FaUsers, FaShoppingCart, FaHistory, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

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
                        <FaBars  />
                    </button>

                )}
                </div> 

                <nav className="flex items-center px-3 font-bold text-md text-white">
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to="/" className=" hover:text-orange-500">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/order/salad" className=" hover:text-orange-500">Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="/order/contact" className=" hover:text-orange-500">Contact</NavLink>
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
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaUtensils className="mr-2" />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaListAlt className="mr-2" />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaHistory className="mr-2" />
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                    <FaUsers className="mr-2" />
                                    All Users
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
                                        My Favourites Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                                        <FaShoppingCart className="mr-2" />
                                        My Checkout ({cart.length})
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
                        <NavLink to="/order/salad" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaSearch className="mr-2" />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact" className="flex items-center space-x-2 text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-lg">
                            <FaEnvelopeOpen className="mr-2" />
                            Contact
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
