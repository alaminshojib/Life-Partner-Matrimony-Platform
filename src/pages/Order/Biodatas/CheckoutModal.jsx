import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CheckoutModal = ({ onClose, userData }) => {
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axiosSecure.get('/checkouts');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleAddToFavorites = async () => {
    const isAlreadyAdded = favorites.some(favorite => favorite.fullName === userData.name && favorite.email === userData.contact_email);

    if (isAlreadyAdded) {
      Swal.fire({
        icon: 'warning',
        title: 'Already Added',
        text: 'This item is already in your favorites!',
      });
      return;
    }

    try {
      const formData = {
        fullName: userData.name,
        email: userData.contact_email,
        address: userData.permanent_division,
        // Add more fields as needed
      };

      // Make API call to add to favorites
      const response = await axiosSecure.post('/checkouts', formData);
      if (response.status === 201) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites',
          text: 'The item has been successfully added to your favorites!',
        });
        onClose(); // Close the modal after successful addition
      } else {
        throw new Error('Failed to add to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add to favorites',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add to Favorites</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <div className="text-center">
          <p>Do you want to add <strong>{userData.name}</strong> to your favorites list?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-gray-900 transition duration-300">
              Cancel
            </button>
            <button onClick={handleAddToFavorites} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Yes, add it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
