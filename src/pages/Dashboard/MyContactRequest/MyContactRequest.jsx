import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyContactRequest = () => {
  const { user } = useAuth();
  const [contactRequests, setContactRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchContactRequests();
  }, [currentPage]);

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
      const response = await axiosSecure.delete(`/payments/${biodataId}`);
      if (response?.status === 200) {
        const updatedRequests = contactRequests.map(request => ({
          ...request,
          items: request?.items?.filter(item => item?.biodataId !== biodataId)
        })).filter(request => request?.items?.length > 0);
        setContactRequests(updatedRequests);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item deleted successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete item. Please try again later.',
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Biodata Id</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Mobile No</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map(request =>
              request.items.map((item, index) => (
                <tr key={`${request._id}-${index}`} className="border-b transition duration-200 hover:bg-gray-100">
                  <td className="py-3 px-4">{item.biodataId || 'N/A'}</td>
                  <td className="py-3 px-4">{item.name || 'N/A'}</td>
                  <td className="py-3 px-4">{request.status === 'Approved' ? item.mobile_number || 'N/A' : 'N/A'}</td>
                  <td className="py-3 px-4">{request.status === 'Approved' ? item.contact_email || 'N/A' : 'N/A'}</td>
                  <td className="py-3 px-4">{request.status === 'Approved' ? request.status || 'N/A' : 'Pending'}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteRequest(request._id, item.biodataId)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow focus:outline-none transition duration-200"
                    >
                      <AiFillDelete className="text-white text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-full focus:outline-none transition duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= contactRequests.length}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-full focus:outline-none transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyContactRequest;
