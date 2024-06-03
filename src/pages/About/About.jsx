
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
	return (
		<div>
			<section>
				<div className='h-64 bg-gradient-to-r from-blue-600 to-red-400 text-white'>
					<div className='h-full flex flex-col justify-center items-center border'>
						<h1 className='text-center font-semibold text-4xl'>About Us</h1>
						<div className='flex font-medium text-2xl mt-3 gap-2'>
							<Link to={"/"} className='cursor-pointer hover:text-orange-700'>Home</Link>
							<h2>|</h2>
							<Link to={"/rooms"} className='cursor-pointer hover:text-orange-700'>Rooms</Link>
						</div>
					</div>
				</div>
			</section>


			<section className="container mx-auto px-4 md:px-8">
				<h1 className="text-xl md:text-2xl font-bold text-center py-8">EXPLORE THE ROOMS THROUGH BEAUTIFUL VIDEOS.</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:py-10 lg:pb-16 gap-3 justify-center">
					<div className="aspect-w-16 aspect-h-9">
						<iframe
							id="youtube-player"
							className="mx-auto rounded-md"
							src="https://www.youtube.com/embed/zumJJUL_ruM"
							title="Beautiful Interior Details | Luxury Home Tour"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
					<div className="flex flex-col justify-center px-6">
						<p className="pb-5 text-md md:text-xl">Take a tour of our luxurious rooms and explore the beautiful interior details.</p>
						<button className="btn btn-primary text-white w-fit justify-start ">Explore Rooms</button>
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
								<img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${index}`} />
								<p className="text-lg font-semibold">{`Meroy Adamth`}</p>
								<p className="text-gray-400 ">Founder and CEO</p>
							</div>
						))}

						<div className="grid grid-cols-2 gap-8 justify-between items-center w-fit mx-auto mt-8">

							{[...Array(2)].map((_, index) => (
								<div key={index} className="flex flex-col items-center">
									<img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${index}`} />
									<p className="text-lg font-semibold">{`Sekio Jamika`}</p>
									<p className="text-gray-400 ">Co-Founder</p>
								</div>
							))}
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">

							{[...Array(4)].map((_, index) => (
								<div key={index} className="flex flex-col items-center">
									<img alt="" className="w-24 h-24 mb-2 rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${index}`} />
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
