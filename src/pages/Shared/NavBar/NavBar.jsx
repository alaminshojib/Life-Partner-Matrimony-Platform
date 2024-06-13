import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import useCheckouts from "../../../hooks/useCheckouts";
import useAdmin from "../../../hooks/useAdmin";
import { Badge } from 'antd';
import logo from '../../../assets/navbar/logo.png';



import { useContext } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../../providers/AuthProvider";


export default function NavBar() {
    const [checkouts] = useCheckouts();
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };
    


    const navOptions = <>
        <NavLink className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to='/' > Home </NavLink>
        <NavLink className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to='/biodatas' > Biodatas </NavLink>
        <NavLink className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to='/aboutUs' > About Us </NavLink>
        <NavLink className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to="/contactUs" > Contact Us </NavLink>
        {
            user && isAdmin && <Link className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to="/dashboard/adminHome">Dashboard</Link>
        }
        {
            user && !isAdmin && <Link className={"hover:bg-blue-500 py-1 px-2 rounded-md"} to="/dashboard/userHome">Dashboard</Link>
        }
    </>

    return (
        <Disclosure as="nav" className="navbar fixed z-10 bg-opacity-30 w-screen bg-black text-white">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between px-4 py-4">
                    <div className="sm:hidden">
                            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-50 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                            </DisclosureButton>
                        </div>



                        <div className="flex items-center justify-center gap-2">
                            <img className="h-6 w-6 " src={logo} alt="Your Company" />
                            <h1 className="text-2xl font-bold text-white">Life Partner</h1>
                        </div>

                        <div className="flex items-center">


                            <div className="hidden  sm:ml-6 sm:block mx-auto justify-center items-center ">
                                <div className="flex space-x-4 w-fit  mx-auto justify-center items-center">


                                    {navOptions}

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Link to={"/dashboard/checkouts"}
                                type="button"
                                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                            >
                                 <Badge count= {checkouts.length}>
                                   <FaShoppingCart className="w-6 h-6 text-white mr-2"/>
                                </Badge>
                            </Link>
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user?.photoURL} alt="P" />
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
                                                {user?.displayName || 'Your Profile'}
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                                {
                                                    user ? <>
                                                        {/* <span>{user?.displayName}</span> */}
                                                        <button onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700">LogOut</button>
                                                    </> : <>
                                                        <Link className="block px-4 py-2 text-sm text-gray-700" to="/login">Login</Link>
                                                    </>
                                                }
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                       
                    </div>
                    <DisclosurePanel className="sm:hidden  rounded-r-md  w-2/6 bg-white text-black justify-end">
                        <div className="px-2 pt-2 pb-3 space-y-1 flex divide-y-2 gap-2 flex-col justify-end ">
                            {navOptions}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
