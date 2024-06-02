import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import BioDetailsData from './BioDetailsData';


const BioDetails = () => {
    // State for selected filter options
    const [selectedMinAge, setSelectedMinAge] = useState('18'); // Initial min age
    const [selectedMaxAge, setSelectedMaxAge] = useState('60'); // Initial max age
    const [selectedBiodataType, setSelectedBiodataType] = useState(''); // Initial biodata type
    const [selectedDivision, setSelectedDivision] = useState(''); // Initial division

    // Division options
    const divisionOptions = [
        'Dhaka',
        'Chattogram',
        'Rangpur',
        'Barishal',
        'Khulna',
        'Mymensingh',
        'Sylhet'
    ];

    // Age range options
    const minAgeOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => (18 + i).toString());
    const maxAgeOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => (18 + i).toString());

    // Handle filter change functions
    const handleMinAgeChange = (event) => {
        setSelectedMinAge(event.target.value);
    };

    const handleMaxAgeChange = (event) => {
        setSelectedMaxAge(event.target.value);
    };

    const handleBiodataTypeChange = (event) => {
        setSelectedBiodataType(event.target.value);
    };

    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
    };

    

    return (
        <div>
            <Helmet>
                <title>Life Partner | Biodatas</title>
            </Helmet>

            <section className="px-5 pt-14 pb-5">
                <SectionTitle heading={`Biodata Id: ${menu.lenght}`} ></SectionTitle>

                <div className="container grid grid-cols-12 gap-y-6 md:gap-10 mx-auto">
                    <div className="col-span-12 md:col-span-3 pt-5 pl-4 flex flex-col justify-between py-2 space-y-8 md:space-y-16">
                        <div className="space-y-8 md:space-y-12 flex flex-col">
                            <BioDetailsData></BioDetailsData>
                        </div>

                    </div>
                    {/* Divider */}
                    <div className="col-span-12 md:col-span-1 md:flex justify-center items-center">
                        <div className="h-full border-l border-gray-300"></div>
                    </div>
                    <div className="relative col-span-12 md:col-span-8 lg:col-span-8 bg-center bg-no-repeat bg-cover min-h-96">
                        <p className="p-3 text-3xl font-semibold mx-auto text-center text-black">General Information</p>

                        <div className="px-4 space-y-2 text-sm ">
                            <div className="container  p-1 mx-auto sm:p-4 text-gray-100">
                                <div className="overflow-x-auto">

                                    <table className="min-w-full text-center text-md font-medium border">

                                        <tbody>
                                            <tr className="border-b border-t border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-3 ">
                                                    <p>Type of Biodata :</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Microsoft Corporation</p>
                                                </td>

                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Blood group :</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Tesla Inc.</p>
                                                </td>


                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Birth year :	</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Coca Cola co.</p>
                                                </td>


                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Height :	</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Nvidia Corporation</p>
                                                </td>


                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Weight :	</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Nvidia Corporation</p>
                                                </td>


                                            </tr>
                                            <tr className="border-b border-opacity-20 border-gray-700 text-black ">
                                                <td className="p-6">
                                                    <p>Permanent address :	</p>
                                                </td>
                                                <td className="p-6">
                                                    <p>Nvidia Corporation</p>
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
                    <h1>Some Similar Biodata</h1>
                </div>
                <div className='flex items-center justify-center gap-5'>
                    <BioDetailsData></BioDetailsData>
                    <BioDetailsData></BioDetailsData>
                    <BioDetailsData></BioDetailsData>
                </div>

            </section>
        </div>
    );
};

export default BioDetails;
