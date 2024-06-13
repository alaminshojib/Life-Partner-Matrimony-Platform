// Import necessary libraries
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

// Define the GotMarried component
const GotMarried = () => {
  // Define state variables
  const [partnerBiodataId, setPartnerBiodataId] = useState('');
  const [coupleImageLink, setCoupleImageLink] = useState('');
  const [story, setStory] = useState('');
  const [myselfBiodataId, setMyselfBiodataId] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loading
  const axiosSecure = useAxiosSecure();
  const [menu, refetch] = useMenu();
  const { user } = useAuth();

  // useEffect to fetch menu data and set user biodata ID
  useEffect(() => {
    if (menu.length > 0 && user?.email) {
      const findBiodata = menu.find(item => item.contact_email === user.email);
      if (findBiodata) {
        setMyselfBiodataId(findBiodata.biodataId);
      }
    }
  }, [menu, user]);

  // useEffect to fetch submitted success story data
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axiosSecure.get('https://life-partner-matrimony-server.vercel.app/success-stories');
        const userStory = response.data.find(story => story.selfBiodataId === myselfBiodataId);
        if (userStory) {
          setSubmittedData(userStory);
        }
      } catch (error) {
        console.error('Error fetching success stories:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch success stories. Please try again.',
        });
      }
    };

    fetchSuccessStories();
  }, [axiosSecure, myselfBiodataId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    // Define payload for submission
    const payload = {
      selfBiodataId: myselfBiodataId,
      partnerBiodataId,
      coupleImageLink,
      story,
    };

    try {
      if (submittedData) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have already submitted your success story. You cannot submit again.',
        });
      } else {
        const response = await axiosSecure.post('https://life-partner-matrimony-server.vercel.app/success-stories', payload);
        setSubmittedData(payload);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
        });
      }

      // Reset form fields after submission
      setPartnerBiodataId('');
      setCoupleImageLink('');
      setStory('');
    } catch (error) {
      console.error('Error submitting success story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to submit success story. Please try again.',
      });
    }
    setLoading(false); // Set loading to false after submission
  };

  // Return JSX for the GotMarried component
  return (
    <div className="mx-auto bg-white p-8 rounded-lg shadow-md max-w-3xl">
      {submittedData && (
        <div className="bg-gray-100 rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Submitted Details</h2>
          </div>
          <div className="border-b border-gray-300 pb-6">
            <p className="text-gray-600 text-sm mb-2"><strong>Couple Image:</strong></p>
            <div className="rounded-lg overflow-hidden">
              <img className='w-full h-40 object-cover' src={submittedData.coupleImageLink} alt="Couple Image" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-b border-gray-300 pb-6">
              <p className="text-gray-600 text-sm mb-2"><strong>My Biodata ID:</strong></p>
              <p className="text-gray-800 font-semibold">{submittedData.selfBiodataId}</p>
            </div>
            <div className="border-b border-gray-300 pb-6">
              <p className="text-gray-600 text-sm mb-2"><strong>Partner Biodata ID:</strong></p>
              <p className="text-gray-800 font-semibold">{submittedData.partnerBiodataId}</p>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-6">
            <p className="text-gray-600 text-sm mb-2"><strong>Success Story:</strong></p>
            <p className="text-gray-800">{submittedData.story}</p>
          </div>
        </div>
      )}
      {!submittedData && (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Share Your Success Story</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="myselfBiodataId" className="block text-sm font-medium text-gray-700">Myself Biodata ID:</label>
              <input
                type="number"
                id="myselfBiodataId"
                value={myselfBiodataId}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500
focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="partnerBiodataId" className="block text-sm font-medium text-gray-700">Partner Biodata ID:</label>
              <input
                type="number"
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
              {/* Render spinner when loading state is true */}
              {loading ? (
                <div className="spinner-border text-indigo-500" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GotMarried;
