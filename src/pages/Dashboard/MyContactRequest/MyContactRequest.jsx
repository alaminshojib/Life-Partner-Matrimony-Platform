import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';

// Example dataset
const exampleContactRequests = [
  {
    id: 1,
    name: "John Doe",
    biodataId: "BD001",
    status: "Pending",
    mobileNo: "-",
    email: "-"
  },
  {
    id: 2,
    name: "Jane Smith",
    biodataId: "BD002",
    status: "Approved",
    mobileNo: "123-456-7890",
    email: "jane@example.com"
  },
  {
    id: 3,
    name: "Alice Johnson",
    biodataId: "BD003",
    status: "Pending",
    mobileNo: "-",
    email: "-"
  },
  {
    id: 4,
    name: "Bob Brown",
    biodataId: "BD004",
    status: "Approved",
    mobileNo: "987-654-3210",
    email: "bob@example.com"
  }
];

const MyContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    // Set example data when component mounts
    setContactRequests(exampleContactRequests);
  }, []);

  const handleDeleteRequest = (id) => {
    // Handle deleting contact request with given id
  };

  return (
    <div className="container mx-auto px-4 ">
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
              <tr key={request.id} className="border-b border-gray-300">
                <td className="px-4 py-2">{request.name}</td>
                <td className="px-4 py-2">{request.biodataId}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">{request.status === 'Approved' ? request.mobileNo : '-'}</td>
                <td className="px-4 py-2">{request.status === 'Approved' ? request.email : '-'}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDeleteRequest(request.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
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
