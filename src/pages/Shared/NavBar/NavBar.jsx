import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import { Badge } from 'antd';
import logo from '../../../assets/navbar/logo.png';


// const NavBar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const [isAdmin] = useAdmin();
//     const [cart] = useCart();

//     const handleLogOut = () => {
//         logOut()
//             .then(() => { })
//             .catch(error => console.log(error));
//     }

//     const navOptions = <>
//         <li><Link to="/">Home</Link></li>
//         {/* <li><Link to="/menu">Our Menu</Link></li> */}
//         <li><Link to="/biodatas">Biodatas</Link></li>
//         <li><Link to="/order/salad">About Us</Link></li>
//         <li><Link to="/bioDetails">Contact Us</Link></li>
//         {
//             // user ? 'true': 'false'
//             // user ? condition ? 'double true' : 'one true' : 'false' 
//         }
//         {
//             user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
//         }
//         {
//             user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
//         }


//     </>

//     return (
//         <>
//             <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                         </label>
//                         <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                             {navOptions}
//                         </ul>
//                     </div>
//                     <div className="flex justify-center items-center gap-2">
//                         <img className="w-8 h-8" src={logo} alt="logo" />
//                         <Link className="normal-case text-xl">  Life Partner</Link>
//                     </div>

//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         {navOptions}
//                     </ul>
//                 </div>
//                 <div className="navbar-end gap-4 pr-2">
//                     <div>
//                         <Link to="/dashboard/cart">
//                             <div className="flex justify-center items-center gap-1">
//                                 <Badge count= {cart.length}>
//                                     <FaShoppingCart className="w-6 h-6 text-white"/>
//                                 </Badge>
//                             </div>
//                         </Link>


//                     </div>
//                     <div>
//                     {
//                         user ? <>
//                             {/* <span>{user?.displayName}</span> */}
//                             <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
//                         </> : <>
//                             <Link to="/login">Login</Link>
//                         </>
//                     }</div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default NavBar;

import { Fragment, useContext } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../../providers/AuthProvider";

const navigation = [
    { name: 'Home', to: '/', current: true },
    { name: 'Biodatas', to: '/', current: true },
    { name: 'About Us', to: '/team', current: false },
    { name: 'Contact Us', to: '/projects', current: false },
    { name: 'Dashboard', to: '/calendar', current: false },
];

export default function NavBar() {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center gap-2">
                                <img className="h-6 w-6 " src={logo} alt="Your Company" />
                                <h1 className="text-2xl font-bold text-white">Life Partner</h1>
                            </div>


                            <div className="hidden sm:ml-6 sm:block mx-auto justify-center items-center ">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}

                                            to={item.to}
                                            className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                } rounded-md px-3 py-2 text-sm font-medium`}
                                            activeClassName="bg-gray-900 text-white"
                                            exact
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </MenuButton>
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem>
                                            <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700">
                                                {user.displayName || 'Your Profile'}
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <button onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700">
                                                Sign out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                        <div className="sm:hidden">
                            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                            </DisclosureButton>
                        </div>
                    </div>
                    <DisclosurePanel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        } block px-3 py-2 rounded-md text-base font-medium`}
                                    activeClassName="bg-gray-900 text-white"
                                    exact
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
