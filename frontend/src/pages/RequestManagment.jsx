import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestManagement = () => {
    const [cars, setCars] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchAndFilterPendingRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5555/cars'); // Assuming '/cars' is the endpoint to fetch all requests
            const pendingRequests = response.data.filter(car => car.status === 'pending');
            setCars(pendingRequests);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            setErrorMessage('Error fetching pending requests');
        }
    };

    useEffect(() => {
        fetchAndFilterPendingRequests();
    }, []);

    const handleAcceptRequest = async (id, ownerEmail) => {
        try {
            await axios.patch(`http://localhost:5555/cars/request/${id}`, { status: 'accepted', owner_Email: ownerEmail });
            fetchAndFilterPendingRequests(); // Refresh the list of pending requests after accepting
            setSuccessMessage('Request accepted successfully');
            setErrorMessage('');
        } catch (error) {
            console.error('Error accepting request:', error);
            setErrorMessage('Error accepting request');
            setSuccessMessage('');
        }
        // Clear messages after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 5000);
    };
    

    const handleDeclineRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/cars/request/${id}`); // Assuming '/cars/:id' is the endpoint to delete the request
            fetchAndFilterPendingRequests(); // Refresh the list of pending requests after declining
            setSuccessMessage('Request declined successfully');
            setErrorMessage('');
        } catch (error) {
            console.error('Error declining request:', error);
            setErrorMessage('Error declining request');
            setSuccessMessage('');
        }

        // Clear messages after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 5000);
    };
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Pending Requests</h1>
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-bold">Error:</p>
                    <p>{errorMessage}</p>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-bold">Success:</p>
                    <p>{successMessage}</p>
                </div>
            )}
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Owner Name</th>
                        <th className="border border-gray-200 px-4 py-2">Model</th>
                        <th className="border border-gray-200 px-4 py-2">VIN</th>
                        <th className="border border-gray-200 px-4 py-2">Brand</th>
                        <th className="border border-gray-200 px-4 py-2">Year</th>
                        <th className="border border-gray-200 px-4 py-2">Fuel Consumption</th>
                        <th className="border border-gray-200 px-4 py-2">Color</th>
                        <th className="border border-gray-200 px-4 py-2">Company</th>
                        <th className="border border-gray-200 px-4 py-2">Features</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car._id}>
                            <td className="border border-gray-200 px-4 py-2">{car.owner_Name}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.model}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.VIN}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.brand}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.year}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.fuel_consumption}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.color}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.company}</td>
                            <td className="border border-gray-200 px-4 py-2">{car.features.join(', ')}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="bg-green-500 text-white py-1 px-2 mr-2 rounded-lg" onClick={() => handleAcceptRequest(car._id,car.owner_Email)}>Accept</button>
                                <button className="bg-red-500 text-white py-1 px-2 rounded-lg" onClick={() => handleDeclineRequest(car._id)}>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestManagement;
