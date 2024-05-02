import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInsurance } from '../../api/licenseAPI'; // Ensure this API function is correctly implemented for adding insurance data

function AddInsurance() {
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
        vehicleNo: '',
        status: 'active'
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isValidEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidDate = date => !!Date.parse(date);

    const validateForm = () => {
        const { vehiclenumber, insuranceProvider, policyNumber, email, startDate, endDate, premiumAmount } = formData;
        if (!vehiclenumber || !insuranceProvider || !policyNumber || !isValidEmail(email) || !isValidDate(startDate) || !isValidDate(endDate) || Number(premiumAmount) <= 0) {
            setError('Please fill out all fields correctly.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data:", formData); // Debug log
        if (!validateForm()) return; // Stops the form submission if validation fails

        try {
            await createInsurance(formData);
            navigate('/insurancedashboard'); // Redirect to the insurance dashboard on success
        } catch (err) {
            setError('Failed to add insurance. Please try again.');
            console.error('Error creating insurance:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-2xl">
                <h3 className="text-2xl font-bold text-center">Add New Insurance</h3>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">

                        {/* Vehicle Number Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="vehiclenumber">
                            Vehicle Number
                        </label>
                        <input
                            type="text"
                            name="vehiclenumber"
                            value={formData.vehiclenumber}
                            onChange={handleChange}
                            placeholder="Enter vehicle number"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Insurance Provider Input */}
                        <label className="block text-sm font-bold text-gray-700" htmlFor="insuranceProvider">
                            Insurance Provider
                        </label>
                        <input
                            type="text"
                            name="insuranceProvider"
                            value={formData.insuranceProvider}
                            onChange={handleChange}
                            placeholder="Enter provider"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        
                        {/* Policy Number Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="policyNumber">
                            Policy Number
                        </label>
                        <input
                            type="text"
                            name="policyNumber"
                            value={formData.policyNumber}
                            onChange={handleChange}
                            placeholder="Enter policy number"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Policy Type Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="policyType">
                            Policy Type
                        </label>
                        <input
                            type="text"
                            name="policyType"
                            value={formData.policyType}
                            onChange={handleChange}
                            placeholder="Enter policy type"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Coverage Details Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="coverageDetails">
                            Coverage Details
                        </label>
                        <textarea
                            name="coverageDetails"
                            value={formData.coverageDetails}
                            onChange={handleChange}
                            placeholder="Describe the coverage details"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>

                        {/* Start Date Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* End Date Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="endDate">
                            End Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Premium Amount Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="premiumAmount">
                            Premium Amount
                        </label>
                        <input
                            type="number"
                            name="premiumAmount"
                            value={formData.premiumAmount}
                            onChange={handleChange}
                            placeholder="Enter premium amount"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            required
                        />

                        {/* Contact Information Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="contactInformation">
                            Contact Information
                        </label>
                        <input
                            type="text"
                            name="contactInformation"
                            value={formData.contactInformation}
                            onChange={handleChange}
                            placeholder="Enter contact info"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Email Field */}
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mt-4">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Status Input */}
                        <label className="block text-sm font-bold text-gray-700 mt-4" htmlFor="status">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        {/* Submit Button */}
                        <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">
                            Add Insurance
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddInsurance;
