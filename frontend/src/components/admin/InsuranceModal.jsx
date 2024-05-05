import React, { useState, useEffect } from 'react';

function InsuranceModal({ isOpen, onClose, insurance, onUpdate }) {
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    policyNumber: '',
    policyType: '',
    coverageDetails: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
    contactInformation: '',
    email: '',
    uploadInsurance: '',
    vehicleNo: '',
    status: 'active', // Default status
    _id: ''
  });

  useEffect(() => {
    if (isOpen && insurance) {
      setFormData({
        insuranceProvider: insurance.insuranceProvider || '',
        policyNumber: insurance.policyNumber || '',
        policyType: insurance.policyType || '',
        coverageDetails: insurance.coverageDetails || '',
        startDate: insurance.startDate ? insurance.startDate.split('T')[0] : '',
        endDate: insurance.endDate ? insurance.endDate.split('T')[0] : '',
        premiumAmount: insurance.premiumAmount || '',
        contactInformation: insurance.contactInformation || '',
        email: insurance.email || '',
        uploadInsurance: insurance.uploadInsurance || '',
        vehicleNo: insurance.vehicleNo || '',
        status: insurance.status || 'active',
        _id: insurance._id
      });
    }
  }, [isOpen, insurance]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Update Insurance</h3>
        <form onSubmit={handleSubmit}>

          <label className="block text-sm font-bold text-gray-700" htmlFor="insuranceProvider">
              Insurance Provider
          </label>
          <input 
            type="text" 
            name="insuranceProvider" 
            value={formData.insuranceProvider} 
            onChange={handleChange} className="mb-4 w-full p-2 border rounded" 
            placeholder="Insurance Provider" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="policyNumber">
              Policy Number
          </label>
          <input 
            type="text" 
            name="policyNumber" 
            value={formData.policyNumber} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Policy Number" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="policyType">
              Policy Type
          </label>
          <input 
            type="text" 
            name="policyType" 
            value={formData.policyType} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Policy Type" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="coverageDetails">
              Coverage Details
          </label>
          <textarea 
            name="coverageDetails" 
            value={formData.coverageDetails} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Coverage Details" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="startDate">
              Start Date
          </label>
          <input 
            type="date" 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="endDate">
              End Date
          </label>
          <input 
            type="date" 
            name="endDate" 
            value={formData.endDate} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="premiumAmount">
              Premium Amount
          </label>
          <input 
            type="number" 
            name="premiumAmount" 
            value={formData.premiumAmount} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Premium Amount" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="contactInformation">
              Contact Information
          </label>
          <input 
            type="text" 
            name="contactInformation" 
            value={formData.contactInformation} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Contact Information" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="email">
              Email
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Email" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="uploadInsurance">
              Upload Insurance
          </label>
          <input 
            type="file" 
            name="uploadInsurance" 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
          />

          <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="vehicleNo">
              Vehicle No
          </label>
          <input 
            type="text" 
            name="vehicleNo" 
            value={formData.vehicleNo} 
            onChange={handleChange} 
            className="mb-4 w-full p-2 border rounded" 
            placeholder="Vehicle Number" 
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
          <button onClick={onClose} type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default InsuranceModal;
