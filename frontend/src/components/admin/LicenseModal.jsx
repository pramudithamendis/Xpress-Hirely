import React, { useState, useEffect } from 'react';

function LicenseModal({ isOpen, onClose, license, onUpdate }) {
  const [formData, setFormData] = useState({
    vehicleNo: '',
    startDate: '',
    endDate: '',
    email: '',
    notes: '',
    uploadLicense: '',
    status: 'active', // default status
    _id: ''
  });

  useEffect(() => {
    if (isOpen && license) {
      setFormData({
        vehicleNo: license.vehicleNo,
        startDate: license.startDate ? license.startDate.split('T')[0] : '',
        endDate: license.endDate ? license.endDate.split('T')[0] : '',
        email: license.email || '',
        notes: license.notes || '',
        uploadLicense: license.uploadLicense || '',
        status: license.status || 'active',
        _id: license._id
      });
    }
  }, [isOpen, license]);

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
        <h3 className="text-lg font-bold mb-4">Update License</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="mb-4 w-full p-2 border rounded" placeholder="Vehicle Number" />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="mb-4 w-full p-2 border rounded" />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="mb-4 w-full p-2 border rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mb-4 w-full p-2 border rounded" placeholder="Email" />
          <textarea name="notes" value={formData.notes} onChange={handleChange} className="mb-4 w-full p-2 border rounded" placeholder="Notes" />
          <input type="text" name="uploadLicense" value={formData.uploadLicense} onChange={handleChange} className="mb-4 w-full p-2 border rounded" placeholder="Upload License" />
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

export default LicenseModal;
