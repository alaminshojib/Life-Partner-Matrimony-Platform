import React from 'react';
import Featured from './Featured'; 
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const FeaturedGrid = () => {
  

  const[menu]=useMenu
  return (
    <div className="featured-item  bg-fixed text-white  py-5">
    <SectionTitle heading="Some premium Members!" ></SectionTitle>
    <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-4 justify-around px-5 pt-3">
      {[...Array(6)].map((_, index) => (
        <Featured key={index} />
      ))}
    </div>
    </div>

  );
};

export default FeaturedGrid;
