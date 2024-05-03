import React, { useState } from 'react';
import backgroundImage from '../../../public/carpic.jpg'; // replace with the path to your image
import { useLocation , useNavigate } from 'react-router-dom';
import { createInsurance, createLicense } from '../../api/licenseAPI';

const LicenseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    vehicleNo: location.state.vehiclenumber,
    email: location.state.email,
    startDate: '',
    endDate: '',
    notes: '',
    file: null,  // Initialize file as part of the form data for unified management
  });
  const [error, setError] = useState(''); // Added to manage error messages

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] }); // Correctly set the file in formData
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setError('Please upload a file before submitting.'); // Check if file is not uploaded
      return;
    }

    setError(''); // Clear any previous errors
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'file') {
        data.append('uploadLicense', formData.file); // Use 'uploadLicense' as the field name for the file
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await createInsurance(location.state);
      console.log('Insurance data saved successfully:', location.state);
      await createLicense(data);
      console.log('License data saved successfully:', formData);
      navigate('/');
    } catch (error) {
      console.error('Error saving license data:', error);
      setError('Failed to save license data. Please try again.'); // Update error state for user feedback
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form className="relative max-w-lg w-full bg-white bg-opacity-75 p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">License Details</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
          <input type="date" id="startDate" name="startDate" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
          <input type="date" id="endDate" name="endDate" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="uploadLicense" className="block text-gray-700 text-sm font-bold mb-2">Upload the license:</label>
          <input type="file" id="uploadLicense" name="file" onChange={handleFileChange} className="shadow border rounded py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-6">
          <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">Notes:</label>
          <textarea id="notes" name="notes" onChange={handleInputChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">BACK</button>
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default LicenseForm;
