import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ViewBiodata = () => {
  const [biodata, setBiodata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch biodata from server or local storage
    const fetchedBiodata = {}; // Fetch biodata here
    setBiodata(fetchedBiodata);
  }, []);

  const handleMakePremium = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmMakePremium = () => {
    // Send request to server to mark biodata as premium
    // Upon successful response, you can set the biodata as premium
    setIsModalOpen(false); // Close modal
    // Example: 
    // makeBiodataPremium(biodata.id).then(() => {
    //   setBiodata({ ...biodata, isPremium: true });
    // });
  };

  if (!biodata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 relative">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">View Biodata</h2>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <button onClick={handleMakePremium} className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Make Biodata Premium</button>
      </div>
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
  <div className="flex">
    <span className="font-semibold w-1/3">{label}:</span>
    <span className="w-2/3">{value}</span>
  </div>
);

export default ViewBiodata;
