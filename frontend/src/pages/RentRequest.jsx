// RentRequest.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SedanImage from '../images/sedan.png';
import truck from '../images/truck.png';
import van from '../images/van.png';
import suv from '../images/jeep.png';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Hardcoded brands and models
const brands = [
    { label: 'Toyota', value: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'KDH', 'Highlander', 'Tacoma', 'Prius', '4Runner', 'Sienna', 'Avalon'] },
    { label: 'Honda', value: 'Honda', models: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Fit', 'Ridgeline', 'Passport', 'Insight'] },
    { label: 'Nissan', value: 'Nissan', models: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan', 'Frontier', 'Murano', 'Versa', 'Maxima', 'Armada'] }
]; 

const RentRequest = () => {
    const navigate = useNavigate();
    const [vehicleRequest, setVehicleRequest] = useState({
        owner_Name: '',
        owner_Email: '',
        owner_ID: '',
        VIN: '',
        brand: '',
        type: '',
        model: '',
        year: '',
        fuel_consumption: '',
        color: '',
        features: []
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestedModels, setSuggestedModels] = useState([]);

    const handleVehicleTypeSelect = (type) => {
        setVehicleRequest({
            ...vehicleRequest,
            type: type
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setVehicleRequest(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value)) : value
        }));
    };

    const handleBrandChange = (selectedBrand) => {
        // Update the selected brand
        setVehicleRequest({
            ...vehicleRequest,
            brand: selectedBrand.value
        });

        // Find the selected brand from the hardcoded list
        const selectedBrandData = brands.find(brand => brand.value === selectedBrand.value);
        if (selectedBrandData) {
            // Update the suggested models based on the selected brand
            setSuggestedModels(selectedBrandData.models.map(model => ({ label: model, value: model })));
        } else {
            setSuggestedModels([]);
        }
    };

    const handleModelChange = (selectedModel) => {
        // Update the selected model
        setVehicleRequest({
            ...vehicleRequest,
            model: selectedModel.value,
            type: getVehicleType(selectedModel.value) // Set vehicle type automatically
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting request:', vehicleRequest);
    
        try {
            const response = await axios.post('http://localhost:5555/cars', vehicleRequest);
    
            if (response.status === 201) {
                setSuccessMessage('Request submitted successfully');

                setErrorMessage('');

                // Reset form fields
                setVehicleRequest({
                    owner_Name: '',
                    owner_Email: '',
                    owner_ID: '',
                    VIN: '',
                    brand: '',
                    type: '',
                    model: '',
                    year: '',
                    fuel_consumption: '',
                    color: '',
                    comapny: '',
                    features: []
                });
                navigate("/insuranceform");
            } else {
                console.error('Failed to submit request');
                setErrorMessage('Failed to submit request');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error occurred while submitting request '+error.message);
            setSuccessMessage('');
        }
         // Clear messages after 3 seconds
         setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 5000);
    };


    const getVehicleType = (selectedModel) => {
        // Define mapping of models to vehicle types
        const typeMap = {
            'Camry': 'Car',
            'Corolla': 'Car',
            'RAV4': 'SUV',
            'KDH': 'Van',
            'Accord': 'Car',
            'Civic': 'Car',
            'CR-V': 'SUV',
            'Altima': 'Car',
            'Sentra': 'Car',
            'Rogue': 'SUV',
            'Highlander': 'SUV',
            'Tacoma': 'Truck',
            'Prius': 'Car',
            '4Runner': 'SUV',
            'Sienna': 'Van',
            'Avalon': 'Car',
            'Pilot': 'SUV',
            'Odyssey': 'Van',
            'HR-V': 'SUV',
            'Fit': 'Car',
            'Ridgeline': 'Truck',
            'Passport': 'SUV',
            'Insight': 'Car',
            'Pathfinder': 'SUV',
            'Titan': 'Truck',
            'Frontier': 'Truck',
            'Murano': 'SUV',
            'Versa': 'Car',
            'Maxima': 'Car',
            'Armada': 'SUV'
        }; 
        
        // Lookup the type for the selected model
        return typeMap[selectedModel] || '';
    };
    
    return (
        <>
            {/* <Header /> */}
            <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-8 pb-8">
                <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4 text-center">Owner & Vehicle Details</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Owner Details */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">Name</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="ownerName" 
                                    type="text" 
                                    name="owner_Name" 
                                    placeholder="Enter your name"
                                    value={vehicleRequest.owner_Name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerEmail">Email</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="ownerEmail" 
                                    type="email" 
                                    name="owner_Email" 
                                    placeholder="Enter your email"
                                    value={vehicleRequest.owner_Email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerID">ID</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="ownerID" 
                                    type="text" 
                                    name="owner_ID" 
                                    placeholder="Enter your ID"
                                    value={vehicleRequest.owner_ID}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carVIN">VIN</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="carVIN"
                                    type="text"
                                    name="VIN"
                                    placeholder="Enter car VIN"
                                    value={vehicleRequest.VIN}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Vehicle Details */}
                            <h2 className="text-3xl font-semibold mb-4 mt-8 text-center">Vehicle Details</h2>
                            {/* Brand Selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                                <Select
                                    options={brands}
                                    onChange={handleBrandChange}
                                    value={{ label: vehicleRequest.brand, value: vehicleRequest.brand }}
                                />
                            </div>
                            {/* Model Selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                                <Select
                                    options={suggestedModels}
                                    onChange={handleModelChange}
                                    value={{ label: vehicleRequest.model, value: vehicleRequest.model }}
                                    isDisabled={!vehicleRequest.brand}
                                />
                            </div>
                            {/* Vehicle Type Selection */}
                            <div className="flex justify-center mb-4">
                                <div className={`relative ${vehicleRequest.type === "Truck" ? 'border border-blue-500' : ''} rounded-lg overflow-hidden mr-4`} onClick={() => handleVehicleTypeSelect("Truck")}>
                                    <img src={truck} alt="Truck" className="w-24 h-24 object-cover" />
                                    {vehicleRequest.type === "Truck" && <div className="absolute inset-0 bg-blue-500 opacity-25"></div>}
                                    <p className="absolute inset-x-0 bottom-0 text-center text-sm font-bold text-gray-900">Truck</p>
                                </div>
                                <div className={`relative ${vehicleRequest.type === "Car" ? 'border border-blue-500' : ''} rounded-lg overflow-hidden mr-4`} onClick={() => handleVehicleTypeSelect("Car")}>
                                    <img src={SedanImage} alt="Car" className="w-24 h-24 object-cover" />
                                    {vehicleRequest.type === "Car" && <div className="absolute inset-0 bg-blue-500 opacity-25"></div>}
                                    <p className="absolute inset-x-0 bottom-0 text-center text-sm font-bold text-gray-900">Car</p>
                                </div>
                                <div className={`relative ${vehicleRequest.type === "Van" ? 'border border-blue-500' : ''} rounded-lg overflow-hidden mr-4`} onClick={() => handleVehicleTypeSelect("Van")}>
                                    <img src={van} alt="Van" className="w-24 h-24 object-cover" />
                                    {vehicleRequest.type === "Van" && <div className="absolute inset-0 bg-blue-500 opacity-25"></div>}
                                    <p className="absolute inset-x-0 bottom-0 text-center text-sm font-bold text-gray-900">Van</p>
                                </div>
                                <div className={`relative ${vehicleRequest.type === "SUV" ? 'border border-blue-500' : ''} rounded-lg overflow-hidden`} onClick={() => handleVehicleTypeSelect("SUV")}>
                                    <img src={suv} alt="SUV" className="w-24 h-24 object-cover" />
                                    {vehicleRequest.type === "SUV" && <div className="absolute inset-0 bg-blue-500 opacity-25"></div>}
                                    <p className="absolute inset-x-0 bottom-0 text-center text-sm font-bold text-gray-900">SUV</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carYear">Year</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="carYear" 
                                    type="number" 
                                    name="year" 
                                    placeholder="Enter car year"
                                    value={vehicleRequest.year}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carFuelConsumption">Fuel Consumption</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="carFuelConsumption" 
                                    type="number" 
                                    name="fuel_consumption" 
                                    placeholder="Enter fuel consumption"
                                    value={vehicleRequest.fuel_consumption}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carColor">Color</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="carColor" 
                                    type="text" 
                                    name="color" 
                                    placeholder="Enter car color"
                                    value={vehicleRequest.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carCompany">Company</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="carCompany"
                                    type="text"
                                    name="company"
                                    placeholder="Enter car company"
                                    value={vehicleRequest.company}
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Features</label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500"
                                            name="features"
                                            value="Sunroof"
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-2">SunRoof</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500"
                                            name="features"
                                            value="Roof Rack"
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-2">Roof Rack</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500"
                                            name="features"
                                            value="AC"
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-2">AC</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500"
                                            name="features"
                                            value="Heated Seats"
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-2">Heated Seats</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Success and Error Messages */}
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
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default RentRequest;
