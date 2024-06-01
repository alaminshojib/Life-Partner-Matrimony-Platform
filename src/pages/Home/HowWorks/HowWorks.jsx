import React from 'react';
import { BiMessageAltCheck } from "react-icons/bi";
import { BsSearchHeart } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const HowWorks = () => {
    return (
        <div>
            <SectionTitle heading="How to use the website" ></SectionTitle>

            <section className='px-5 items-center justify-center mx-auto'>
                <div className="container mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-3">

                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full bg-lime-400 text-gray-900"><FaUserPlus className='text-7xl text-white' />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Create Your Profile
                            </h2>
                                <p >
                                    Create your detail profile, add photos and describe your partner preference
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full bg-red-400 text-gray-900"><BsSearchHeart className='text-7xl text-white' />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Search Your Partner</h2>
                                <p >
                                    Search your preferred partner by location, education, interest and so on </p>
                            </div>
                        </div>
                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full bg-sky-400 text-gray-900"><BiMessageAltCheck className='text-7xl text-white' />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Start Communication</h2>
                                <p >
                                    Start communication with suitable profiles by sending message & emails</p></div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HowWorks;