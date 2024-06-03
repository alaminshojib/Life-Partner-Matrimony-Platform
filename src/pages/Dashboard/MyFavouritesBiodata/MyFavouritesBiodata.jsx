import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai'; // Import delete icon from React Icons

// Example dataset
const exampleFavourites = [
  {
    id: 1,
    name: "John Doe",
    biodataId: "BD001",
    permanentAddress: "123 Main St, City",
    occupation: "Engineer"
  },
  {
    id: 2,
    name: "Jane Smith",
    biodataId: "BD002",
    permanentAddress: "456 Oak St, Town",
    occupation: "Doctor"
  },
  // Add more example data as needed
];

const MyFavouritesBiodata = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Set example data when component mounts
    setFavourites(exampleFavourites);
  }, []);

  const handleDeleteFavourite = (id) => {
    // Handle deleting favourite with given id
  };

  return (
    <div className="container mx-auto px-4 ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Favourites Biodata</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Biodata Id</th>
              <th className="px-4 py-2 text-left">Permanent Address</th>
              <th className="px-4 py-2 text-left">Occupation</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((favourite) => (
              <tr key={favourite.id} className="border-b border-gray-300">
                <td className="px-4 py-2">{favourite.name}</td>
                <td className="px-4 py-2">{favourite.biodataId}</td>
                <td className="px-4 py-2">{favourite.permanentAddress}</td>
                <td className="px-4 py-2">{favourite.occupation}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDeleteFavourite(favourite.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavouritesBiodata;
