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
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Favourites Biodata</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                <tr key={favourite._id} className="border-b border-gray-300">
                  <td className="px-4 py-2">{favourite?.name}</td>
                  <td className="px-4 py-2">{favourite?.biodataId}</td>
                  <td className="px-4 py-2">{favourite?.permanent_division}</td>
                  <td className="px-4 py-2">{favourite?.occupation}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteFavourite(favourite._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <AiFillDelete />
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
