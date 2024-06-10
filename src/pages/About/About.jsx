import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    // Array to store image links
    const imageLinks = [
        "https://i.ibb.co/r2Hfw9C/jjkm.jpg",
        "https://i.ibb.co/1QTt8q8/rt.webp",
        "https://i.ibb.co/9sMyfXN/tft.jpg",
        "https://i.ibb.co/qrTpkWd/jnn.jpg",
        "https://i.ibb.co/qrTpkWd/jnn.jpg",
        "https://i.ibb.co/qrTpkWd/jnn.jpg",
		"https://i.ibb.co/9sMyfXN/tft.jpg",

    ];

    return (
        <div>
            <section>
                <div className='h-64 bg-gradient-to-r from-blue-600 to-red-400 text-white'>
                    <div className='h-full flex flex-col justify-center items-center border'>
                        <h1 className='text-center font-semibold text-4xl'>About Us</h1>
                        <div className='flex font-medium text-2xl mt-3 gap-2'>
                            <Link to={"/"} className='cursor-pointer hover:text-orange-700'>Home</Link>
                            <h2>|</h2>
                            <Link to={"/rooms"} className='cursor-pointer hover:text-orange-700'>All Biodatas</Link>
                        </div>
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-4 md:px-8">
                <h1 className="text-xl md:text-2xl font-bold text-center py-8">EXPLORE THE VIDEOS HOW CAN YOU FIND OUT YOUR BEST LIFE PARTNER.</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:py-10 lg:pb-16 gap-3 justify-center">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe width="612" height="320" src="https://www.youtube.com/embed/mdj70f2_2ao" title="যেভাবে ফিল্টার করে বায়োডাটা খুঁজবেন ! Deendarpartner.com" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="flex flex-col justify-center px-6">
                        <p className="pb-5 text-md md:text-xl">Start walking with your spouse
                            Finally, get married to your eternal life partner. Insha Allah will make dua for us when the marriage is completed. Allah will give you Barakah in your married life Insha Allah. When the marriage is completed, there is a gift for you from Dindar Partner Team. Click the button below to receive the gift and provide the information!</p>
                        <button className="btn btn-primary text-white w-fit justify-start ">Explore Biodatas</button>
                    </div>
                </div>
            </section>



            <section>
                <section className="py-6 ">
                    <div className="container mx-auto px-4 md:px-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-center">Meet our team</h1>
                        <p className="max-w-md mx-auto text-center text-gray-400  text-xs my-6">Meet the dedicated individuals who work tirelessly to bring you the best experience. From creative minds to diligent organizers, our team is here to serve you with passion and expertise!</p>
                        {[...Array(6)].slice(0, 1).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={imageLinks[index]} />
                                <p className="text-lg font-semibold">{`Meroy Adamth`}</p>
                                <p className="text-gray-400 ">Founder and CEO</p>
                            </div>
                        ))}

                        <div className="grid grid-cols-2 gap-8 justify-between items-center w-fit mx-auto mt-8">

                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={imageLinks[index + 1]} />
                                    <p className="text-lg font-semibold">{`Sekio Jamika`}</p>
                                    <p className="text-gray-400 ">Co-Founder</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">

                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={imageLinks[index + 3]} />
                                    <p className="text-lg font-semibold">{`Leroy Jenkins ${index}`}</p>
                                    <p className="text-gray-400 ">Manager</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default About;
