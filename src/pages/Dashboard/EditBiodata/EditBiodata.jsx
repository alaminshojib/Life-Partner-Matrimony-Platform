import React, { useState } from 'react';

const EditBiodata = () => {
  const [formData, setFormData] = useState({
    biodataType: 'Male',
    name: 'John Doe',
    profileImage: 'https://example.com/profile.jpg',
    dob: '1990-01-01',
    height: '6 feet',
    weight: '170 lbs',
    age: '32',
    occupation: 'Engineer',
    race: 'Caucasian',
    fathersName: 'David Doe',
    mothersName: 'Mary Doe',
    permanentDivision: 'Dhaka',
    presentDivision: 'Dhaka',
    expectedPartnerAge: '25-35',
    expectedPartnerHeight: '5 feet 5 inches - 6 feet',
    expectedPartnerWeight: '120 lbs - 180 lbs',
    contactEmail: 'john@example.com',
    mobileNumber: '1234567890',
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
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Edit Biodata</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biodata Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Biodata Type :</label>
            <select
              name="biodataType"
              value={formData.biodataType}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image :</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth :</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Height :</label>
            <select
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Height</option>
              <option value="Short">Short</option>
              <option value="Average">Average</option>
              <option value="Tall">Tall</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight :</label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Weight</option>
              <option value="Underweight">Underweight</option>
              <option value="Normal">Normal</option>
              <option value="Overweight">Overweight</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age :</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation :</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required // Adding required attribute to make it mandatory to select one option
            >
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Agriculturist">Agriculturist</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Employed">Bank Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Retired">Retired</option>


              {/* Add more options as needed */}
            </select>
          </div>

          {/* Race */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Race :</label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Race</option>
              <option value="Asian">Asian</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Native American">Native American</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name :</label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Mother's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name :</label>
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Permanent Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Permanent Division :</label>
            <select
              name="permanentDivision"
              value={formData.permanentDivision}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required // Adding required attribute to make it mandatory to select one option
            >
              <option value="">Select Permanent Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          {/* Present Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Present Division :</label>
            <select
              name="presentDivision"
              value={formData.presentDivision}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Present Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
              {/* Add more options as needed */}
            </select>

          </div>

          {/* Expected Partner Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Partner Age :</label>
            <input
              type="text"
              name="expectedPartnerAge"
              value={formData.expectedPartnerAge}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Expected Partner Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Partner Height :</label>
            <select
              name="expectedPartnerHeight"
              value={formData.expectedPartnerHeight}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="5 feet 0 inches - 5 feet 5 inches">4 feet 0 inches - 5 feet 0 inches</option>
              <option value="5 feet 0 inches - 5 feet 5 inches">5 feet 0 inches - 5 feet 5 inches</option>
              <option value="5 feet 6 inches - 6 feet 0 inches">5 feet 6 inches - 6 feet 0 inches</option>
              <option value="6 feet 1 inches - 6 feet 6 inches">6 feet 1 inches - 6 feet 6 inches</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Expected Partner Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Partner Weight :</label>
            <select
              name="expectedPartnerWeight"
              value={formData.expectedPartnerWeight}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="45 kg - 55 kg">35 kg - 45 kg</option>
              <option value="45 kg - 55 kg">45 kg - 55 kg</option>
              <option value="56 kg - 65 kg">56 kg - 65 kg</option>
              <option value="66 kg - 75 kg">66 kg - 75 kg</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email :</label>
            <input
              type="email"
              required
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              readOnly
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number : *</label>
            <input
              type="text"
              required
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save and Publish Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
