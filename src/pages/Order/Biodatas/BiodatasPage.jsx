import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import BioGrids from './BioGrids';

const BiodatasPage = () => {
    // State for selected filter options
    const [selectedMinAge, setSelectedMinAge] = useState('18'); // Initial min age
    const [selectedMaxAge, setSelectedMaxAge] = useState('60'); // Initial max age
    const [selectedBiodataType, setSelectedBiodataType] = useState(''); // Initial biodata type
    const [selectedDivision, setSelectedDivision] = useState(''); // Initial division

    // Division options
    const divisionOptions = [
        'Dhaka',
        'Chattagram',
        'Rangpur',
        'Barisal',
        'Khulna',
        'Maymansign',
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
                <SectionTitle heading="All Biodatas" ></SectionTitle>

                <div className="container grid grid-cols-12 gap-y-6 md:gap-10 mx-auto">
                    <div className="col-span-12 md:col-span-3 flex flex-col justify-between py-2 space-y-8 md:space-y-16">
                        <div className="space-y-8 md:space-y-12 flex flex-col">
                            <div className="space-y-2 flex flex-col">
                                <h3 className="text-3xl font-semibold items-center space-x-2 ">
                                    Filter options
                                </h3>
                                <p className="text-sm ">Once you select the option here, the filter will be applied!</p>
                            </div>
                            <div className="space-y-4">
                                {/* Age Range */}
                                <div className="flex space-x-4">
                                    <div>
                                        <label htmlFor="minAge" className="block text-sm font-medium text-gray-700">Min Age</label>
                                        <select
                                            id="minAge"
                                            name="minAge"
                                            value={selectedMinAge}
                                            onChange={handleMinAgeChange}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                                        >
                                            {minAgeOptions.map((age, index) => (
                                                <option key={index} value={age}>{age}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="maxAge" className="block text-sm font-medium text-gray-700">Max Age</label>
                                        <select
                                            id="maxAge"
                                            name="maxAge"
                                            value={selectedMaxAge}
                                            onChange={handleMaxAgeChange}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                                        >
                                            {maxAgeOptions.map((age, index) => (
                                                <option key={index} value={age}>{age}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* Biodata Type */}
                                <div>
                                    <label htmlFor="biodataType" className="block text-sm font-medium text-gray-700">Biodata Type</label>
                                    <select
                                        id="biodataType"
                                        name="biodataType"
                                        value={selectedBiodataType}
                                        onChange={handleBiodataTypeChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                {/* Division */}
                                <div>
                                    <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
                                    <select
                                        id="division"
                                        name="division"
                                        value={selectedDivision}
                                        onChange={handleDivisionChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All</option>
                                        {divisionOptions.map((division, index) => (
                                            <option key={index} value={division}>{division}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 w-full flex flex-col">
                            <div className="flex w-full h-1 bg-violet-400 bg-opacity-10">
                                <div className="w-1/2 h-full bg-violet-400"></div>
                            </div>
                            <a href="#" className="flex justify-between items-center w-full">
                                <span className="text-xs font-bold tracking-wider uppercase">See more exclusives</span>
                                <svg className="w-4 stroke-current text-violet-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="col-span-12 md:col-span-1 md:flex justify-center items-center">
                        <div className="h-full border-l border-gray-300"></div>
                    </div>
                    <div className="relative col-span-12 md:col-span-8 lg:col-span-8 bg-center bg-no-repeat bg-cover min-h-96">
                        <BioGrids></BioGrids>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default BiodatasPage;
