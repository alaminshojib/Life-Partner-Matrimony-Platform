import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyFavouritesBiodata = () => {
  const [favourites, setFavourites] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      if (!user || !user.email) {
        throw new Error("User not logged in");
      }
  
      const response = await axiosSecure.get('/favourites');
      const userFavourites = response.data.filter(favourite => favourite.email === user.email);
      setFavourites(userFavourites);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch favourites',
      });
    }
  };
  
  const handleDeleteFavourite = async (id) => {
    try {
      const result = await axiosSecure.delete(`/favourites/${id}`);
      if (result.status === 200) {
        setFavourites((prevFavourites) =>
          prevFavourites.filter((favourite) => favourite._id !== id)
        );
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Favourite deleted successfully!',
        });
      } else {
        throw new Error('Failed to delete favourite');
      }
    } catch (error) {
      console.error('Error deleting favourite:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete favourite',
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">My Favourite Biodata</h2>
    {loading ? (
      <div className="text-center">Loading...</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Biodata Id</th>
              <th className="py-3 px-4 text-left">Permanent Address</th>
              <th className="py-3 px-4 text-left">Occupation</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {favourites.map((favourite) => (
              <tr key={favourite._id} className="border-b transition duration-200 hover:bg-gray-100">
                <td className="py-3 px-4">{favourite?.name}</td>
                <td className="py-3 px-4">{favourite?.biodataId}</td>
                <td className="py-3 px-4">{favourite?.permanent_division}</td>
                <td className="py-3 px-4">{favourite?.occupation}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteFavourite(favourite._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <AiFillDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};

export default MyFavouritesBiodata;
