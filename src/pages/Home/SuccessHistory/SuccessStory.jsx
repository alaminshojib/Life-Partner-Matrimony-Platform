import React, { useEffect, useState, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import SuccessData from './SuccessData';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const SuccessStory = () => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosPublic.get('/success-stories');
      console.log('Response:', response.data); // Log the response data
      if (Array.isArray(response.data)) {
        // Sort reviews in descending order based on timestamp
        const sortedReviews = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setReviews(sortedReviews);
      } else {
        console.error('Invalid response data format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-5xl my-2 md:my-5">
      <h1 className="text-center text-3xl font-bold mb-4">
        <Typewriter
          words={['Customer Reviews']}
          loop={0}
          typeSpeed={250}
          deleteSpeed={0}
          delaySpeed={0}
          cursor={null}
        />
      </h1>
      <p className="text-center text-gray-500 pb-5">Our success hinges on customer satisfaction.</p>

      <div className="relative">
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2" onClick={scrollLeft}>
          &lt;
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-none"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex-none" style={{ minWidth: '33.333%', paddingRight: '10px', scrollSnapAlign: 'start' }}>
              <SuccessData review={review} />
            </div>
          ))}
        </div>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SuccessStory;
