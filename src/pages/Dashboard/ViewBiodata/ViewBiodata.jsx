import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ViewBiodata = () => {
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const response = await axiosSecure.get(`/biodatas/${user.email}`);
        setBiodata(response.data);
      } catch (error) {
        console.error('Error fetching biodata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [axiosSecure, user.email]);

  const handleMakePremium = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to make your biodata premium?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make it premium!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmMakePremium(biodata._id); // Pass user ID to the function
      }
    });
  };

  const handleConfirmMakePremium = async (userId) => {
    try {
      // Send a POST request to the /premium-user endpoint with the biodata details
      await axiosSecure.post(`/premium-user`, biodata);
      // Update local state to reflect the premium status change
      setBiodata(prevState => ({
        ...prevState,
        isPremium: true
      }));
      // Show success message
      Swal.fire('Success', 'Your biodata is now premium!', 'success');
    } catch (error) {
      console.error('Error making biodata premium:', error);
      // Show error message
      Swal.fire('Error', 'Failed to make your biodata premium', 'error');
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Loading Biodata...</h2>
          {/* You can add a spinner component or any other loading indicator here if needed */}
        </div>
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">No Biodata Found</h2>
          <p className="text-lg text-gray-600 mb-8">Please publish your biodata first.</p>
          {/* You can add a button or any other elements here if needed */}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 relative">
      <div className='flex justify-between items-center '>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">View Biodata (Myself Biodata Id : {biodata.biodataId})</h2>
        {biodata.isPremium ? (
          <button className="mt-8 bg-orange-500 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-50" disabled>
            Already Marked as Premium
          </button>
        ) : (
          <button className="mt-8 bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleMakePremium}>
            Make Biodata Premium
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information :</h3>
            <div className="space-y-2">
              <InfoRow label="Biodata Type" value={biodata.biodata_type} />
              <InfoRow label="Name" value={biodata.name} />
              <InfoRow label="Father's Name" value={biodata.fathers_name} />
              <InfoRow label="Mother's Name" value={biodata.mothers_name} />
              <InfoRow label="Age" value={biodata.age} />
              <InfoRow label="Date of Birth" value={biodata.date_of_birth} />
              <InfoRow label="Occupation" value={biodata.occupation} />
              <InfoRow label="Race" value={biodata.race} />
              <InfoRow label="Permanent Division" value={biodata.permanent_division} />
              <InfoRow label="Present Division" value={biodata.present_division} />
              <InfoRow label="Contact Email" value={biodata.contact_email} />
              <InfoRow label="Mobile Number" value={biodata.mobile_number} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Expected Partner Characteristics :</h3>
            <div className="space-y-2">
              <InfoRow label="Height" value={biodata.height} />
              <InfoRow label="Weight" value={biodata.weight} />
              <InfoRow label="Expected Partner Age" value={biodata.expected_partner_age} />
              <InfoRow label="Expected Partner Height" value={biodata.expected_partner_height} />
              <InfoRow label="Expected Partner Weight" value={biodata.expected_partner_weight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex border-b border-gray-200 py-2">
    <span className="font-semibold w-1/3">{label}:</span>
    <span className="w-2/3">{value}</span>
  </div>
);

export default ViewBiodata;
