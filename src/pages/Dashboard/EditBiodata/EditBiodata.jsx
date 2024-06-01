import React, { useState } from 'react';

const EditBiodata = () => {
  const [formData, setFormData] = useState({
    biodataType: '',
    name: '',
    profileImage: '',
    dob: '',
    height: '',
    weight: '',
    age: '',
    occupation: '',
    race: '',
    fathersName: '',
    mothersName: '',
    permanentDivision: '',
    presentDivision: '',
    expectedPartnerAge: '',
    expectedPartnerHeight: '',
    expectedPartnerWeight: '',
    contactEmail: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Reset form fields
    setFormData({
      biodataType: '',
      name: '',
      profileImage: '',
      dob: '',
      height: '',
      weight: '',
      age: '',
      occupation: '',
      race: '',
      fathersName: '',
      mothersName: '',
      permanentDivision: '',
      presentDivision: '',
      expectedPartnerAge: '',
      expectedPartnerHeight: '',
      expectedPartnerWeight: '',
      contactEmail: '',
      mobileNumber: '',
    });
  };

  return (
    <div>
      <h2>Edit Biodata</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for all form data */}
        <label>
          Biodata Type:
          <select name="biodataType" value={formData.biodataType} onChange={handleChange}>
            <option value="">Select Biodata Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        {/* Add other input fields similarly */}
        <button type="submit">Save and Publish Now</button>
      </form>
    </div>
  );
};

export default EditBiodata;
