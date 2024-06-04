import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const ViewBiodata = () => {
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        setLoading(false); // Set loading to false once data is fetched or on error
      }
    };

    fetchBiodata();
  }, [axiosSecure, user.email]);

  const handleMakePremium = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmMakePremium = async () => {
    try {
      await axiosSecure.patch(`/biodatas/premium/${user.email}`);
      setIsModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Biodata has been marked as premium.',
      });
      setBiodata(prevState => ({ ...prevState, isPremium: true }));
    } catch (error) {
      console.error('Error marking biodata as premium:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to mark biodata as premium. Please try again.',
      });
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">View Biodata</h2>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information :</h3>
            <div className="space-y-2">
              <InfoRow label="Biodata Type" value={biodata.biodataType} />
              <InfoRow label="Name" value={biodata.name} />
              <InfoRow label="Father's Name" value={biodata.fathersName} />
              <InfoRow label="Mother's Name" value={biodata.mothersName} />
              <InfoRow label="Age" value={biodata.age} />
              <InfoRow label="Date of Birth" value={biodata.dob} />
              <InfoRow label="Occupation" value={biodata.occupation} />
              <InfoRow label="Race" value={biodata.race} />
              <InfoRow label="Permanent Division" value={biodata.permanentDivision} />
              <InfoRow label="Present Division" value={biodata.presentDivision} />
              <InfoRow label="Contact Email" value={biodata.contactEmail} />
              <InfoRow label="Mobile Number" value={biodata.mobileNumber} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Expected Partner Characteristics :</h3>
            <div className="space-y-2">
              <InfoRow label="Height" value={biodata.height} />
              <InfoRow label="Weight" value={biodata.weight} />
              <InfoRow label="Expected Partner Age" value={biodata.expectedPartnerAge} />
              <InfoRow label="Expected Partner Height" value={biodata.expectedPartnerHeight} />
              <InfoRow label="Expected Partner Weight" value={biodata.expectedPartnerWeight} />
            </div>
          </div>
        </div>
        {biodata.isPremium ? (
          <button className="mt-8 bg-orange-500 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-50" disabled>
            Already Marked as Premium
          </button>
        ) : (
          <button onClick={handleMakePremium} className="mt-8 bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Make Biodata Premium</button>
        )}
      </div>
     {/* Modal for confirming premium */}
     <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirm Make Biodata Premium"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">Are you sure to make your biodata premium?</h2>
          <div className="flex justify-center">
            <button onClick={handleConfirmMakePremium} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-2">Yes</button>
            <button onClick={handleCloseModal} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">No</button>
          </div>
        </div>
      </Modal>
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
