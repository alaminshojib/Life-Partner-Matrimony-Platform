import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import BioDetailsData from './BioDetailsData';
import useMenu from '../../../hooks/useMenu';
import { useParams } from 'react-router-dom';
import Biodata from './Biodata';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Assuming you have this hook for making secure axios requests

const BioDetails = () => {
    const { id } = useParams();
    const [singleData, setSingleData] = useState(null);
    const [maleData, setMaleData] = useState([]);
    const [femaleData, setFemaleData] = useState([]);
    const [menu] = useMenu();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); // Use secure axios instance
    const [isPremium, setIsPremium] = useState(false); // State to track premium status

    useEffect(() => {
        if (menu) {
            const signData = menu.find((bio) => bio._id === id);
            setSingleData(signData);
        }
    }, [id, menu]);

    useEffect(() => {
        if (singleData) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosSecure.get('/users');
                    const users = response.data;
                    const matchingUser = users.find(userData => userData.contact_email === singleData.contact_email);
                    
                    if (matchingUser && user.email === matchingUser.contact_email) {
                        setIsPremium(true);
                    }else {
                        setIsPremium(false);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsPremium(false);
                }
            };
        
            fetchUserData();
        }
    }, [singleData, user, axiosSecure]);
    
    // Additional useEffect to fetch male and female biodata when `menu` changes
    useEffect(() => {
        if (menu) {
            const maleBiodatas = menu.filter((item) => item.biodata_type === 'Male');
            const femaleBiodatas = menu.filter((item) => item.biodata_type === 'Female');
    
            setMaleData([...maleBiodatas]); // Use spread operator to create a new array
            setFemaleData([...femaleBiodatas]); // Use spread operator to create a new array
        }
    }, [menu]);
    
    return (
        <div>
            <Helmet>
                <title>Life Partner | Biodatas</title>
            </Helmet>
            <section className="pt-14 p-10 bg-gray-100">
                <SectionTitle heading={`Biodata Id: ${singleData ? singleData?.biodataId : ''}`} textColor="text-gray-900" />
                <div className="container grid grid-cols-12 gap-8 mx-auto justify-between">
                    <div className="col-span-12 md:col-span-4 mt-5 pt-5 flex flex-col justify-between py-2">
                        <div className="flex flex-col">
                            <BioDetailsData singleData={singleData} isPremium={isPremium}/>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8 lg:col-span-8">
                        <div className="relative bg-white rounded-lg shadow-md p-6">
                            <p className="text-3xl font-semibold mb-6 text-gray-900 text-center">General Information</p>
                            <div className=" space-y-2 text-sm">
                                <div className="container p-1 mx-auto text-gray-900">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-md  border text-lg ">
                                            <tbody>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500 ">
                                                    <td className="p-6 ">
                                                        <p >Name: <span className='text-black font-normal '>{singleData?.name}</span> </p>
                                                    </td>
                                                    <td className="p-6 ">
                                                        <p>Date of Birth: <span className='text-black font-normal '>{singleData?.date_of_birth}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6 ">
                                                        <p>Height: <span className='text-black font-normal '>{singleData?.height}</span> </p>
                                                    </td>
                                                    <td className="p-6">
                                                        <p>Weight: <span className='text-black font-normal '>{singleData?.weight}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6">
                                                        <p>Age: <span className='text-black font-normal '>{singleData?.age}</span> </p>
                                                    </td>
                                                    <td className="p-6">
                                                        <p>Race: <span className='text-black font-normal '>{singleData?.race}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6">
                                                        <p>Father's Name: <span className='text-black font-normal '>{singleData?.fathers_name}</span> </p>
                                                    </td>
                                                    <td className="p-6">
                                                        <p>Mother's Name: <span className='text-black font-normal '>{singleData?.mothers_name}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6">
                                                        <p>Permanent Division: <span className='text-black font-normal '>{singleData?.permanent_division}</span> </p>
                                                    </td>
                                                    <td className="p-6">
                                                        <p>Present Division: <span className='text-black font-normal '>{singleData?.present_division}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6">
                                                        <p>Expected Partner Age: <span className='text-black font-normal '>{singleData?.expected_partner_age}</span> </p>
                                                    </td>
                                                    <td className="p-6">
                                                        <p>Expected Partner Height: <span className='text-black font-normal '>{singleData?.expected_partner_height}</span> </p>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-opacity-20 border-gray-700 font-medium text-blue-500">
                                                    <td className="p-6">
                                                        <p>Expected Partner Weight: <span className='text-black font-normal '>{singleData?.expected_partner_weight}</span> </p>
                                                    </td>
                                                 
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center border-t-4 text-3xl font-semibold mx-auto p-3 my-5 w-fit border-b-4'>
                    <h1 className="text-gray-900">Some Similar Biodata type</h1>
                </div>
                <div className='flex items-center justify-center gap-5 px-10'>
                    {singleData?.biodata_type === "Male" ? (
                        maleData.slice(0, 3).map((data) => (
                            <Biodata key={data._id} singleData={data} />
                        ))
                    ) : (
                        femaleData.slice(0, 3).map((data) => (
                            <Biodata key={data._id} singleData={data} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default BioDetails;
