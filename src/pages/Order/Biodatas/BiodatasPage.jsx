// BiodatasPage.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import Biodata from './Biodata';

const BiodatasPage = () => {
    // State for selected filter options
    const [selectedMinAge, setSelectedMinAge] = useState('18'); // Initial min age
    const [selectedMaxAge, setSelectedMaxAge] = useState('60'); // Initial max age
    const [selectedBiodataType, setSelectedBiodataType] = useState(''); // Initial biodata type
    const [selectedDivision, setSelectedDivision] = useState(''); // Initial division
    const [currentPage, setCurrentPage] = useState(1); // State for current page

    const [menu] = useMenu();

    // Division names
    const divisionNames = ['Dhaka', 'Chattogram', 'Rangpur', 'Barishal', 'Khulna', 'Mymensingh', 'Sylhet'];

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

    // Filter biodatas based on selected filter options
    const filteredBiodatas = menu.filter((bio) => {
        const age = new Date().getFullYear() - new Date(bio.date_of_birth).getFullYear();
        return (
            age >= parseInt(selectedMinAge) &&
            age <= parseInt(selectedMaxAge) &&
            (selectedBiodataType === '' || bio.biodata_type.toLowerCase() === selectedBiodataType) &&
            (selectedDivision === '' || bio.division === selectedDivision)
        );
    });

    // Number of items to display per page
    const itemsPerPage = 6;
    // Calculate the index of the first and last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Slice the array of biodatas to display only the items for the current page
    const currentBiodatas = filteredBiodatas.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Helmet>
                <title>Life Partner | Biodatas</title>
            </Helmet>

            <section className="px-5 pt-14 pb-5">
                <SectionTitle heading="All Biodatas " ></SectionTitle>

                <div className="container grid grid-cols-12 gap-y-6 justify-between mx-auto">
                    <div className="col-span-12 md:col-span-3 flex flex-col justify-between py-2 space-y-8 md:space-y-16">
                        <div className="space-y-8 md:space-y-12 flex flex-col">
                            <div className="space-y-2 flex flex-col">
                                <h3 className="text-3xl font-semibold items-center space-x-2 ">
                                    Filter options
                                </h3>
                                <p className="text-sm">Once you select the option here, the filter will be applied!</p>
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
                                        {divisionNames.map((division, index) => (
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
                    <div className=" md:flex justify-center items-center">
                        <div className="h-full border-l border-gray-300"></div>
                    </div>
                    <div className="relative col-span-12 md:col-span-8 lg:col-span-8 bg-center bg-no-repeat bg-cover min-h-96">
                        <div className=" bg-fixed text-white ">
                            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-around">
                                {currentBiodatas.map((bio, index) => (
                                    <Biodata key={index} bio={bio} />
                                ))}
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center mt-4">
                                {filteredBiodatas.length > itemsPerPage && (
                                    <ul className="flex space-x-2">
                                        {Array.from({ length: Math.ceil(filteredBiodatas.length / itemsPerPage) }, (_, i) => (
                                            <li key={i}>
                                                <button
                                                    onClick={() => paginate(i + 1)}
                                                    className={`px-4 py-2 rounded-md ${
                                                        currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BiodatasPage;
