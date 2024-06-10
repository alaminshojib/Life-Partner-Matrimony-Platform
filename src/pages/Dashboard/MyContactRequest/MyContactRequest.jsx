import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyContactRequest = () => {
  const { user } = useAuth();
  const [contactRequests, setContactRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchContactRequests();
  }, []);

  const fetchContactRequests = async () => {
    try {
      const response = await axiosSecure.get('/payments');
      const filteredRequests = response.data.filter(request => request.email === user.email);
      setContactRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    }
  };

  const handleDeleteRequest = async (requestId, biodataId) => {
    try {
      // Send a DELETE request to the server endpoint with the biodataId
      const response = await axios.delete(`/payments/${biodataId}`);
      
      // If the deletion is successful, update the state to reflect the changes
      if (response.status === 200) {
        // Filter out the deleted item from the contactRequests array
        const updatedRequests = contactRequests.map(request => ({
          ...request,
          items: request.items.filter(item => item.biodataId !== biodataId)
        })).filter(request => request.items.length > 0);
        
        // Update the state with the modified contact requests
        setContactRequests(updatedRequests);
  
        // Show a success message to the user
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item deleted successfully',
        });
      }
    } catch (error) {
      // Handle errors if the deletion fails
      console.error('Error deleting item:', error);
      
      // Show an error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete item. Please try again later.',
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
            {contactRequests.map(request =>
              request.items.map((item, index) => (
                <tr key={`${request._id}-${index}`} className="border-b border-gray-300">
                  <td className="px-4 py-2">{item.name || 'N/A'}</td>
                  <td className="px-4 py-2">{item.biodataId || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {request.status === 'Approved' ? request.email || 'N/A' : 'Pending'}
                  </td>
                  <td className="px-4 py-2">{item.mobile_number || 'N/A'}</td>
                  <td className="px-4 py-2">{item.contact_email || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteRequest(request._id, item.biodataId)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
