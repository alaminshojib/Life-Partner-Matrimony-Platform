import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchContactRequests();
  }, []);

  const fetchContactRequests = async () => {
    try {
      const response = await axiosSecure.get('/checkouts');
      setContactRequests(response.data);
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const result = await axiosSecure.delete(`/checkouts/${id}`);
      if (result.status === 200) {
        // Remove the deleted contact request from the state
        setContactRequests((prevRequests) =>
          prevRequests.filter((request) => request?._id !== id)
        );
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Contact request deleted successfully!',
        });
      } else {
        throw new Error('Failed to delete contact request');
      }
    } catch (error) {
      console.error('Error deleting contact request:', error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete contact request',
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Biodata Id</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Mobile No</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.map((request) => (
              <tr key={request?._id} className="border-b border-gray-300">
                <td className="px-4 py-2">{request?.name || 'N/A'}</td>
                <td className="px-4 py-2">{request?._id || 'N/A'}</td>
                <td className="px-4 py-2">
                  {request?.status === 'Approved' ? request?.email || 'N/A' : 'Pending'}
                </td>
                <td className="px-4 py-2">{request?.mobile_number || 'N/A'}</td>
                {/* <td className="px-4 py-2">{(request?.status === 'Approved')? request?.mobile_number : 'N/A'}</td> */}

                <td className="px-4 py-2">{request?.contact_email || 'N/A'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteRequest(request?._id)}
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
    </div>
  );
};

export default MyContactRequest;
