import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import Biodata from './Biodata';

const BiodatasPage = () => {
    const [selectedMinAge, setSelectedMinAge] = useState('18');
    const [selectedMaxAge, setSelectedMaxAge] = useState('60');
    const [selectedBiodataType, setSelectedBiodataType] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [menu] = useMenu();
    const divisionNames = ['Dhaka', 'Chattogram', 'Rangpur', 'Barishal', 'Khulna', 'Mymensingh', 'Sylhet'];
    const minAgeOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => (18 + i).toString());
    const maxAgeOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => (18 + i).toString());
    const itemsPerPage = 6;

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

    const handleResetFilters = () => {
        setSelectedMinAge('18');
        setSelectedMaxAge('60');
        setSelectedBiodataType('');
        setSelectedDivision('');
    };

    const filteredBiodatas = menu.filter((bio) => {
        const age = new Date().getFullYear() - new Date(bio.date_of_birth).getFullYear();
        return (
            age >= parseInt(selectedMinAge) &&
            age <= parseInt(selectedMaxAge) &&
            (selectedBiodataType === '' || bio.biodata_type.toLowerCase() === selectedBiodataType) &&
            (selectedDivision === '' || bio.division === selectedDivision)
        );
    });

    const totalItems = filteredBiodatas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1); // Reset current page when filters change
    }, [selectedMinAge, selectedMaxAge, selectedBiodataType, selectedDivision]);

    const currentBiodatas = filteredBiodatas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-blue-50 py-10">
            <Helmet>
                <title>Life Partner | Biodatas</title>
            </Helmet>

            <section>
                <SectionTitle heading="All Biodatas" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-10">
                    <div className="md:col-span-3 bg-white rounded-lg shadow-md p-3">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Filter options</h3>
                                <p className="text-sm text-gray-600">Once you select the option here, the filter will be applied!</p>
                            </div>
                            <div>
                                <label htmlFor="minAge" className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                                <select
                                    id="minAge"
                                    name="minAge"
                                    value={selectedMinAge}
                                    onChange={handleMinAgeChange}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    {minAgeOptions.map((age, index) => (
                                        <option key={index} value={age}>{age}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="maxAge" className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
                                <select
                                    id="maxAge"
                                    name="maxAge"
                                    value={selectedMaxAge}
                                    onChange={handleMaxAgeChange}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    {maxAgeOptions.map((age, index) => (
                                        <option key={index} value={age}>{age}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="biodataType" className="block text-sm font-medium text-gray-700 mb-1">Biodata Type</label>
                                <select
                                    id="biodataType"
                                    name="biodataType"
                                    value={selectedBiodataType}
                                    onChange={handleBiodataTypeChange}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    <option value="">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                <select
                                    id="division"
                                    name="division"
                                    value={selectedDivision}
                                    onChange={handleDivisionChange}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    <option value="">All</option>
                                    {divisionNames.map((division, index) => (
                                        <option key={index} value={division}>{division}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleResetFilters} className="text-sm text-blue-500 underline">Reset Filters</button>
                        </div>
                    </div>
                    <div className="md:col-span-9 bg-white rounded-lg shadow-md p-6">
                        {totalItems === 0 ? (
                            <p className="text-red-500 text-center mt-10 text-2xl font-semibold">No matching Biodata found at this time.</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                    {currentBiodatas.map((bio, index) => (
                                        <Biodata key={index} singleData={bio} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-4">
                                        <ul className="flex space-x-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <li key={i}>
                                                    <button
                                                        onClick={() => paginate(i + 1)}
                                                       
                                                        className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-blue-300 text-gray-800'}`}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    };
    
    export default BiodatasPage;
    