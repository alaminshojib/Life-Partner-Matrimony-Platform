import React from 'react';
import Biodata from './Biodata';

const FeaturedGrid = () => {
  return (
    <div className=" bg-fixed text-white ">
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-around">
      {[...Array(6)].map((_, index) => (
        <Biodata key={index} />
      ))}
    </div>
    </div>

  );
};

export default FeaturedGrid;
