import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLicense } from '../../api/licenseAPI';

function AddLicense() {
  const [formData, setFormData] = useState({
    vehicleNo: '',
    startDate: '',
    endDate: '',
    email: '',
    notes: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update form data for inputs
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('vehicleNo', formData.vehicleNo);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('email', formData.email);
    data.append('notes', formData.notes);
    data.append('uploadLicense', file);

    try {
      await createLicense(data);
      navigate('/');
    } catch (err) {
      setError('Failed to add license. Please try again later.');
      console.error('Error adding license:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-xl font-bold mb-6">Add New License</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-xl m-auto">
        <div className="mb-4">
          <label htmlFor="vehicleNo" className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle Number
          </label>
          <input
            type="text"
            name="vehicleNo"
            id="vehicleNo"
            required
            value={formData.vehicleNo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            required
            value={formData.endDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="uploadLicense" className="block text-gray-700 text-sm font-bold mb-2">
            Upload License Document
          </label>
          <input
            type="file"
            name="uploadLicense"
            id="uploadLicense"
            required
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddLicense;
