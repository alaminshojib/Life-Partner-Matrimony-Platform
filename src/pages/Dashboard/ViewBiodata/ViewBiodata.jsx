import React, { useState, useEffect } from 'react';

const ViewBiodata = () => {
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    // Fetch biodata from server or local storage
    const fetchedBiodata = {}; // Fetch biodata here
    setBiodata(fetchedBiodata);
  }, []);

  const handleMakePremium = () => {
    // Handle making biodata premium
  };

  if (!biodata) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View Biodata</h2>
      <div>
        <p>Biodata Type: {biodata.biodataType}</p>
        <p>Name: {biodata.name}</p>
        <p>Profile Image: {biodata.profileImage}</p>
        <p>Date of Birth: {biodata.dob}</p>
        <p>Height: {biodata.height}</p>
        <p>Weight: {biodata.weight}</p>
        <p>Age: {biodata.age}</p>
        <p>Occupation: {biodata.occupation}</p>
        <p>Race: {biodata.race}</p>
        <p>Father's Name: {biodata.fathersName}</p>
        <p>Mother's Name: {biodata.mothersName}</p>
        <p>Permanent Division: {biodata.permanentDivision}</p>
        <p>Present Division: {biodata.presentDivision}</p>
        <p>Expected Partner Age: {biodata.expectedPartnerAge}</p>
        <p>Expected Partner Height: {biodata.expectedPartnerHeight}</p>
        <p>Expected Partner Weight: {biodata.expectedPartnerWeight}</p>
        <p>Contact Email: {biodata.contactEmail}</p>
        <p>Mobile Number: {biodata.mobileNumber}</p>
      </div>
      <button onClick={handleMakePremium}>Make Biodata Premium</button>
    </div>
  );
};

export default ViewBiodata;
