import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import countryData from 'country-flag-icons/react/3x2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import { useNavigate } from 'react-router-dom';

const EditBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
const navigate=useNavigate();

  const defaultFormData = {
    biodata_type: '',
    name: '',
    profile_image: '',
    date_of_birth: '',
    height: '',
    weight: '',
    age: '',
    occupation: '',
    race: '',
    fathers_name: '',
    mothers_name: '',
    permanent_division: '',
    present_division: '',
    expected_partner_age: '',
    expected_partner_height: '',
    expected_partner_weight: '',
    contact_email: user.email,
    mobileCountryCode: 'BD',
    mobile_number: '',
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);

  const fetchBiodata = async () => {
    try {
      const response = await axiosSecure.get(`/biodatas/${user.email}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching biodata:', error);
    }
  };

  useEffect(() => {
    fetchBiodata();
  }, [axiosSecure, user.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosSecure.post('/biodatas', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your biodata has been saved successfully.',
      });
      setFormData(defaultFormData);
      navigate("/dashboard/view-biodata")

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'You have already published your Biodata!',
      });
    } finally {
      setLoading(false);
      
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingData = await axiosSecure.get(`/biodatas/${formData.contact_email}`);
      const existingFormData = existingData.data;
      const hasChanges = JSON.stringify(existingFormData) !== JSON.stringify(formData);

      if (!hasChanges) {
        Swal.fire({
          icon: 'info',
          title: 'No Changes Detected!',
          text: 'You have to change something before updating the biodata.',
        });
        return;
      }

      const response = await axiosSecure.patch(`/biodatas/${formData.contact_email}`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Biodata updated successfully.',
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'You have no posted biodata!',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Edit Biodata</h2>
      <form onSubmit={handlePublish} className="space-y-6">
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biodata Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Biodata Type :</label>
            <select
              required
              name="biodata_type"
              value={formData.biodata_type}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Biodata Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name :</label>
            <input
              required
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
              required
              type="text"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth :</label>
            <input
              required
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Height :</label>
            <select
              required
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
              required
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
              required
              type="number"
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
              required
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
              required
              type="text"
              name="fathers_name"
              value={formData.fathers_name}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Mother's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name :</label>
            <input
              required
              type="text"
              name="mothers_name"
              value={formData.mothers_name}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Permanent Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Permanent Division :</label>
            <select
              name="permanent_division"
              value={formData.permanent_division}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required // Adding required attribute to make it mandatory to select one option
            >
              <option value="">Select Permanent Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barishal">Barishal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          {/* Present Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Present Division :</label>
            <select
              required
              name="present_division"
              value={formData.present_division}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Present Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barishal">Barishal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Partner Age :</label>
            <select
              required
              name="expected_partner_age"
              value={formData.expected_partner_age}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Expected Partner Age</option>
              <option value="18-25">18 - 25</option>
              <option value="26-30">26 - 30</option>
              <option value="31-35">31 - 35</option>
              <option value="36-40">36 - 40</option>
              <option value="41-45">41 - 45</option>
              <option value="46-50">46 - 50</option>
              {/* Add more age ranges as needed */}
            </select>
          </div>

          {/* Expected Partner Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Partner Height :</label>
            <select
              required
              name="expected_partner_height"
              value={formData.expected_partner_height}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Expected Partner Height</option>
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
              required
              name="expected_partner_weight"
              value={formData.expected_partner_weight}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Expected Partner Weight</option>
              <option value="Underweight">Underweight</option>
              <option value="Normal">Normal</option>
              <option value="Overweight">Overweight</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email :</label>
            <input
              readOnly
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number :</label>
            <div className="mt-1 flex items-center gap-2 rounded-md shadow-sm">
              <div className=" inset-y-0 left-0 flex items-center ">
                <label htmlFor="mobileCountryCode" className="sr-only">
                  Country Code
                </label>
                <select
                  id="mobileCountryCode"
                  name="mobileCountryCode"
                  value={formData.mobileCountryCode}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {Object.keys(countryData).map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {countryCode}
                    </option>
                  ))}
                </select>
              </div>
              <input
                required
                type="tel"
                name="mobile_number"
                id="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="flex-1 mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.96 7.96 0 0116 12h4zm-9-6.291A7.96 7.96 0 0112 4v4c1.124 0 2.16.231 3.113.647l-2.647 3zM12 20a7.96 7.96 0 01-3.113-.647l2.647-3A7.96 7.96 0 0112 16v4zm4-9.709V7.41A8.013 8.013 0 0116.709 11H16zM7.291 11H8a8.013 8.013 0 01.709-3.59L7.291 11zM12 8a4 4 0 00-4 4h2a2 2 0 012-2v-2z"></path>
              </svg>
            ) : null}
            Publish
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.96 7.96 0 0116 12h4zm-9-6.291A7.96 7.96 0 0112 4v4c1.124 0 2.16.231 3.113.647l-2.647 3zM12 20a7.96 7.96 0 01-3.113-.647l2.647-3A7.96 7.96 0 0112 16v4zm4-9.709V7.41A8.013 8.013 0 0116.709 11H16zM7.291 11H8a8.013 8.013 0 01.709-3.59L7.291 11zM12 8a4 4 0 00-4 4h2a2 2 0 012-2v-2z"></path>
              </svg>
            ) : null}
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;


