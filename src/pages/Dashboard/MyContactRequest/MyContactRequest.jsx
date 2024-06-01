import React, { useState, useEffect } from 'react';

const MyContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    // Fetch contact requests from server or local storage
    const fetchedContactRequests = []; // Fetch contact requests here
    setContactRequests(fetchedContactRequests);
  }, []);

  const handleDeleteRequest = (id) => {
    // Handle deleting contact request with given id
  };

  return (
    <div>
      <h2>My Contact Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Biodata Id</th>
            <th>Status</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.biodataId}</td>
              <td>{request.status}</td>
              <td>{request.status === 'Approved' ? request.mobileNo : '-'}</td>
              <td>{request.status === 'Approved' ? request.email : '-'}</td>
              <td>
                <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContactRequest;
