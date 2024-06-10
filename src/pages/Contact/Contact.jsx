import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";



const Contact = () => {
    return (
        <div>
            <section>
            <section>
				<div className='h-64 bg-gradient-to-r from-blue-600 to-red-400 text-white'>
					<div className='h-full flex flex-col justify-center items-center border'>
						<h1 className='text-center font-semibold text-4xl'>Contact Us</h1>
						<div className='flex font-medium text-2xl mt-3 gap-2'>
							<Link to={"/"} className='cursor-pointer hover:text-orange-700'>Home</Link>
							<h2>|</h2>
							<Link to={"/biodatas"} className='cursor-pointer hover:text-orange-700'>All Biodatas</Link>
						</div>
					</div>
				</div>
			</section>


                <section>
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row justify-center gap-5 items-center mx-auto px-6">
                            <div className='w-60 h-60 border shadow-lg rounded-md py-4 my-5'>
                                <div className='m-auto justify-center items-center text-center'>
                                    <div>
                                        <div className="w-24 h-24 rounded-full flex flex-col m-auto justify-center bg-gray-200"><FaLocationDot className="m-auto justify-center items-center font-semibold text-4xl text-blue-500" />
                                        </div>
                                        <h1 className="text-xl font-semibold py-3">Address</h1>
                                        <p>7 Green Lake Street</p>
                                        <p>Crawfordsville, IN 47933</p>
                                    </div>
                                </div>

                            </div>
                            <div className='w-60 h-60 border shadow-lg rounded-md py-4 my-3'>
                                <div className='m-auto justify-center items-center text-center'>
                                    <div>
                                        <div className="w-24 h-24 rounded-full flex flex-col m-auto justify-center bg-gray-200"><MdEmail className="m-auto justify-center items-center font-semibold text-4xl text-blue-500" />
                                        </div>
                                        <h1 className="text-xl font-semibold py-3">Email</h1>
                                        <p>contact@yahoo.com</p>
                                        <p>contact@business.com</p>
                                    </div>
                                </div>

                            </div>
                            <div className='w-60 h-60 border shadow-lg rounded-md py-4 my-3'>
                                <div className='m-auto justify-center items-center text-center'>
                                    <div>
                                        <div className="w-24 h-24 rounded-full flex flex-col m-auto justify-center bg-gray-200"><MdAddCall className="m-auto justify-center items-center font-semibold text-4xl text-blue-500" />
                                        </div>
                                        <h1 className="text-xl font-semibold py-3">Call Now</h1>
                                        <p>Fax: 0237496</p>
                                        <p>01704392821</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>


                <section>

                    <section className="mx-auto lg:px-0 mb-5 ">
                        <div className="lg:mx-20 mx-5 px-3 flex flex-col justify-center py-8 shadow-md lg:border-2">
                            <section className="py-6">
                                <div className="grid max-w-6xl grid-cols-1 mx-auto lg:px-8 md:grid-cols-2 md:divide-x-2">
                                    <div className="">
                                        <h1 className="md:text-3xl text-xl font-bold">
                                            <Typewriter
                                                words={['Get in touch']}
                                                loop={0}
                                                typeSpeed={150}
                                                deleteSpeed={0}
                                                delaySpeed={0}
                                                cursor={null}
                                                typeWriterSpan={props => <span {...props} className="inline-block" />}
                                            />

                                        </h1>
                                        <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                                        <div className="space-y-4">
                                            <p className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                                </svg>
                                                <span>Ishwardi, Pabna , 6620 Rajshahi, Bangladesh</span>
                                            </p>
                                            <p className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                                </svg>
                                                <span>+880123456789</span>
                                            </p>
                                            <p className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                </svg>
                                                <span>contact@business.com</span>
                                            </p>
                                        </div>
                                    </div>
                                    <form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                                        <label className="block">
                                            <span className="mb-1">Full name</span>
                                            <input type="text" placeholder="Leroy Jenkins" className="p-1 block px-2 bg-gray-100 text-gray-800 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 " />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1">Email address</span>
                                            <input type="email" placeholder="leroy@jenkins.com" className="p-1 px-2 bg-gray-100 text-gray-800 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 " />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1">Message</span>
                                            <textarea rows="3" className="block w-full rounded-md focus:ring focus:ring-opacity-75 px-2 p-1 bg-gray-100 text-gray-800 focus:ring-violet-400 focus:dark:ring-violet-600 "></textarea>
                                        </label>
                                        <input type="Submit" className='bg-blue-500 hover:bg-green-800 cursor-pointer w-fit mx-auto px-4 py-2 rounded-md text-white' value="Submit" />
                                    </form>
                                </div>
                            </section>

                        </div>
                    </section>
                </section>

            </section>


        </div>
    );
};

export default Contact;