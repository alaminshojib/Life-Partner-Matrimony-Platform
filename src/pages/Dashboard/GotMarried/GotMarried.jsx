import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2'; // Import SweetAlert

const GotMarried = () => {
  const [partnerBiodataId, setPartnerBiodataId] = useState('');
  const [coupleImageLink, setCoupleImageLink] = useState('');
  const [story, setStory] = useState('');
  const [myselfBiodataId, setMyselfBiodataId] = useState('');
  const [submittedData, setSubmittedData] = useState(null); // State to hold submitted data
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const axiosSecure = useAxiosSecure();
  const [menu, refetch] = useMenu();
  const { user } = useAuth();

  useEffect(() => {
    if (menu.length > 0 && user?.email) {
      const findBiodata = menu.find(item => item.contact_email === user.email);
      if (findBiodata) {
        setMyselfBiodataId(findBiodata.biodataId);
      }
    }
  }, [menu, user]);

  useEffect(() => {
    // Check if the user has already submitted the form
    const hasSubmitted = sessionStorage.getItem('submitted');
    if (hasSubmitted) {
      // If user has submitted, set the submittedData state to prevent further submission
      setSubmittedData(JSON.parse(hasSubmitted));
    }
  }, []);

  useEffect(() => {
    // Set default values when edit mode is activated
    if (editMode && submittedData) {
      setPartnerBiodataId(submittedData.partnerBiodataId);
      setCoupleImageLink(submittedData.coupleImageLink);
      setStory(submittedData.story);
    }
  }, [editMode, submittedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        selfBiodataId: myselfBiodataId,
        partnerBiodataId,
        coupleImageLink,
        story,
      };

      // Post the data to the server
      const response = await axiosSecure.post('http://localhost:5000/success-stories', payload);

      // Save submitted data for rendering
      setSubmittedData(payload);

      // Save to session storage to track submission
      sessionStorage.setItem('submitted', JSON.stringify(payload));

      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message,
      }).then(() => {
        // Close modal after saving
        setEditMode(false);
      });

      // Clear the form fields
      setPartnerBiodataId('');
      setCoupleImageLink('');
      setStory('');
    } catch (error) {
      console.error('Error submitting success story:', error);

      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to submit success story. Please try again.',
      });
    }
  };

  const handleEdit = () => {
    // Enable edit mode
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    // Disable edit mode and reset form fields to submitted data
    setEditMode(false);
    setPartnerBiodataId(submittedData.partnerBiodataId);
    setCoupleImageLink(submittedData.coupleImageLink);
    setStory(submittedData.story);
  };

  const handleSaveEdit = async () => {
    // Submit the edited data
    await handleSubmit();
    // Disable edit mode
    setEditMode(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
     {submittedData && !editMode && (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submitted Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-gray-600 text-sm mb-2"><strong>Myself Biodata ID:</strong></p>
        <p className="text-gray-800 font-semibold">{submittedData.selfBiodataId}</p>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <p className="text-gray-600 text-sm mb-2"><strong>Partner Biodata ID:</strong></p>
        <p className="text-gray-800 font-semibold">{submittedData.partnerBiodataId}</p>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <p className="text-gray-600 text-sm mb-2"><strong>Couple Image Link:</strong></p>
        <p className="text-blue-500 hover:underline cursor-pointer">{submittedData.coupleImageLink}</p>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <p className="text-gray-600 text-sm mb-2"><strong>Your Story:</strong></p>
        <p className="text-gray-800">{submittedData.story}</p>
      </div>
    </div>
    <div className="flex justify-end mt-6">
      <button
        onClick={handleEdit}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Edit
      </button>
    </div>
  </div>
)}


      {(editMode || !submittedData) && (
        <><h1 className="text-2xl font-bold mb-6 text-center">Share Your Success Story</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="myselfBiodataId" className="block text-sm font-medium text-gray-700">Myself Biodata ID:</label>
            <input
              type="text"
              id="myselfBiodataId"
              value={myselfBiodataId}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="partnerBiodataId" className="block text-sm font-medium text-gray-700">Partner Biodata ID:</label>
            <input
              type="text"
              id="partnerBiodataId"
              value={partnerBiodataId}
              onChange={(e) => setPartnerBiodataId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="coupleImageLink" className="block text-sm font-medium text-gray-700">Couple Image Link:</label>
            <input
              type="text"
              id="coupleImageLink"
              value={coupleImageLink}
              onChange={(e) => setCoupleImageLink(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">Your Story:</label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editMode ? 'Save' : 'Submit'}
            </button>
          </div>
        </form></>
      )}
    </div>
  );
};

export default GotMarried;