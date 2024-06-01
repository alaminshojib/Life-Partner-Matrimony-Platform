import React from 'react';
import { BiMessageAltCheck } from "react-icons/bi";
import { BsSearchHeart } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import logo from '../../../assets/SuccessPartner/dp_logo.svg';
import patropatri from '../../../assets/SuccessPartner/patropatri.svg';
import patro from '../../../assets/SuccessPartner/patro.svg';
import patri from '../../../assets/SuccessPartner/patri.svg';


const SuccessPartner = () => {
    return (
        <div>
            <SectionTitle heading="Devoted partner success" ></SectionTitle>

            <section className='px-5 items-center justify-center mx-auto'>
                <div className="container mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-4">

                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full text-gray-900"><img src={logo} alt="" />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Total marriage completed :
                            </h2>
                                <p className='text-3xl font-bold'>
                                    86+
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full  text-gray-900"> <img src={patropatri} alt="Patro-Patri" />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Biodata of total bridegroom :
                            </h2>
                                <p className='text-3xl font-bold'>
                                    48+
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full  text-gray-900"> <img className='w-24 h-24' src={patro} alt="Patro" />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Total container biodata :
</h2>
                                <p className='text-3xl font-bold'>
                                    123+
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col p-8 space-y-4 rounded-md ">
                            <div className="flex items-center justify-center mx-auto flex-shrink-0 w-32 h-32 text-xl font-bold rounded-full text-gray-900"> <img className='w-24 h-24' src={patri} alt="Patri" />
                            </div>
                            <div className='text-center w-sm p-2'><h2 className='font-bold text-2xl mb-2'>Total bride biodata :
</h2>
                                <p className='text-3xl font-bold'>
                                    76+
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

        </div>
    );
};

export default SuccessPartner;