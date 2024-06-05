import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CheckoutModal = ({ onClose, userData }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    fullName: userData?.name || '',
    email: userData?.contact_email || '',
    address: userData?.permanent_division || '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to process the checkout
      const response = await axiosSecure.post("/checkouts", formData);
      if (response.status === 201) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Checkout Successful',
          text: 'Your order has been successfully processed!',
        });
        onClose(); // Close the modal after successful checkout
      } else {
        throw new Error("Failed to process checkout");
      }
    } catch (error) {
      console.error("Error:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to process checkout',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
          {/* Add more fields as needed */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-gray-900 transition duration-300">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
