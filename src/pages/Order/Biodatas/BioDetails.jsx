import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import BioDetailsData from './BioDetailsData';
import useMenu from '../../../hooks/useMenu';
import { useParams } from 'react-router-dom';

const BioDetails = () => {
    const [singleData, setSingleData] = useState(null);
    const [menu] = useMenu();
    const [maleData, setMaleData] = useState([]);
    const [femaleData, setFemaleData] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        if (menu) {
            const signData = menu.find((bio) => bio._id === id);
            setSingleData(signData);
        }
    }, [id, menu]);

    useEffect(() => {
        if (menu) {
            const maleData = menu.filter((item) => item.biodata_type === "Male");
            const femaleData = menu.filter((item) => item.biodata_type === "Female");
            setMaleData(maleData);
            setFemaleData(femaleData);
        }
    }, [menu]);

    return (
        <div>
            <Helmet>
                <title>Life Partner | Biodatas</title>
            </Helmet>
            <section className="pt-14 pb-5">
                <SectionTitle heading={`Biodata Id: ${singleData ? singleData._id : ''}`} />
                <div className="container grid grid-cols-12 mx-auto justify-between">
                    <div className="col-span-12 md:col-span-3 mt-5 pt-5 flex flex-col justify-between py-2">
                        <div className="flex flex-col">
                            <BioDetailsData singleData={singleData} />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-1 md:flex justify-center items-center">
                        <div className="h-full border-l border-gray-300"></div>
                    </div>
                    <div className="relative col-span-12 md:col-span-8 lg:col-span-8 bg-center bg-no-repeat bg-cover min-h-96">
                        <p className="p-3 text-3xl font-semibold mx-auto text-center text-black">General Information</p>
                        <div className="px-4 space-y-2 text-sm">
                            <div className="container p-1 mx-auto sm:p-4 text-gray-100">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-center text-md font-medium border">
                                        <tbody>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-3 ">
                                                    <p>Name: {singleData?.name}</p>
                                                </td>
                                                <td className="p-3 ">
                                                    <p>Date of Birth: {singleData?.date_of_birth}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-3 ">
                                                    <p>Height: {singleData?.height}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Weight: {singleData?.weight}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Age: {singleData?.age}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Race: {singleData?.race}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Father's Name: {singleData?.fathers_name}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Mother's Name: {singleData?.mothers_name}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Permanent Division: {singleData?.permanent_division}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Present Division: {singleData?.present_division}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Expected Partner Age: {singleData?.expected_partner_age}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Expected Partner Height: {singleData?.expected_partner_height}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Expected Partner Weight: {singleData?.expected_partner_weight}</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Contact Email: {singleData?.contact_email}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6" colSpan="2">
                                                    <p>Mobile Number: {singleData?.mobile_number}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center border-t-4 text-3xl font-semibold mx-auto p-3 my-5 w-fit border-b-4'>
                    <h1>Some Similar Biodata type</h1>
                </div>
                <div className='flex items-center justify-center gap-5'>
                    {/* Conditionally render similar biodata based on selected biodata type */}
                    {singleData?.biodata_type === "Male" ? (
                        maleData.slice(0, 3).map((data) => (
                            <BioDetailsData key={data._id} singleData={data} />
                        ))
                    ) : (
                        femaleData.slice(0, 3).map((data) => (
                            <BioDetailsData key={data._id} singleData={data} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default BioDetails;
