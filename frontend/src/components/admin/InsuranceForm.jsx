import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carPic from '../../../public/carpic.jpg'; // Replace with the path to your image

const InsuranceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehiclenumber: '',
    insuranceProvider: '',
    policyNumber: '',
    policyType: '',
    coverageDetails: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
    contactInformation: '',
    email: '',
    uploadInsurance: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, uploadInsurance: e.target.files[0] });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (!formData.uploadInsurance) {
      alert('Please upload an insurance document before proceeding.');
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'file') {
        data.append('uploadInsurance', formData.file); // Use 'uploadInsurance' as the field name for the file
      } else {
        data.append(key, formData[key]);
      }
    });

    // Here you could potentially post data to an endpoint if needed
    console.log('Form data ready for submission:', formData);
    // Navigate with state passing FormData for demonstration as `state: data` wouldn't work directly
    navigate('/licenseform', { state: { ...formData } });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ background: `url(${carPic}) no-repeat center center`, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-50 m-20"></div>
      <form className="relative max-w-lg w-full bg-white bg-opacity-75 p-8 rounded shadow-md m-20" onSubmit={handleNextClick}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Insurance Details</h2>
        <div className="mb-4">
          <label htmlFor="vehiclenumber" className="block text-gray-700 text-sm font-bold mb-2">Vehicle Number:</label>
          <input type="text" id="vehiclenumber" name="vehiclenumber" value={formData.vehiclenumber} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="insuranceProvider" className="block text-gray-700 text-sm font-bold mb-2">Insurance Provider:</label>
          <input type="text" id="insuranceProvider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="policyNumber" className="block text-gray-700 text-sm font-bold mb-2">Policy Number:</label>
          <input type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="policyType" className="block text-gray-700 text-sm font-bold mb-2">Policy Type:</label>
          <input type="text" id="policyType" name="policyType" value={formData.policyType} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="coverageDetails" className="block text-gray-700 text-sm font-bold mb-2">Coverage Details:</label>
          <textarea id="coverageDetails" name="coverageDetails" value={formData.coverageDetails} onChange={handleInputChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="premiumAmount" className="block text-gray-700 text-sm font-bold mb-2">Premium Amount:</label>
          <input type="number" id="premiumAmount" name="premiumAmount" value={formData.premiumAmount} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="contactInformation" className="block text-gray-700 text-sm font-bold mb-2">Contact Information:</label>
          <input type="text" id="contactInformation" name="contactInformation" value={formData.contactInformation} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="uploadInsurance" className="block text-gray-700 text-sm font-bold mb-2">Upload Insurance:</label>
          <input type="file" id="uploadInsurance" name="uploadInsurance" onChange={handleFileChange} className="shadow border rounded py-2 px-3 text-gray-700" />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">BACK</button>
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">NEXT</button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
