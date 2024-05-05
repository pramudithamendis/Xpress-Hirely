import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFReport from "../components/PDFReport";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const VehicleDetails = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [editingRequestId, setEditingRequestId] = useState(null); 
  const [editFormData, setEditFormData] = useState({}); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  useEffect(() => {
    const filtered = acceptedRequests.filter(request =>
      request.VIN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchQuery, acceptedRequests]);
  
  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5555/cars");
      const accepted = response.data.filter(
        (request) => request.status === "accepted"
      );
      setAcceptedRequests(accepted);
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    }
  };

  const handleEdit = (id) => {
    const requestToEdit = acceptedRequests.find(
      (request) => request._id === id
    );
    setEditingRequestId(id);
    setEditFormData({
      VIN: requestToEdit.VIN,
      brand: requestToEdit.brand,
      model: requestToEdit.model,
      owner_Name: requestToEdit.owner_Name,
      owner_Email: requestToEdit.owner_Email,
      year: requestToEdit.year,
      fuel_consumption: requestToEdit.fuel_consumption,
      color: requestToEdit.color,
      company: requestToEdit.company,
      price_per_km: requestToEdit.price_per_km,
      features: requestToEdit.features.join(", "),
    });
  };

  const handleDelete = async (id) => {
    setRecordToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/cars/${recordToDelete}`);
      fetchAcceptedRequests();
      setSuccessMessage("Vehicle deleted successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting request:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to delete vehicle.");
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
    setDeleteConfirmationOpen(false);
  };
  

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:5555/cars/${editingRequestId}`,
        editFormData
      );
      fetchAcceptedRequests(); 
      setEditingRequestId(null); 
      setSuccessMessage("Vehicle details updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error editing request:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to update vehicle details."+error.message);
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Accepted Vehicle Details</h1>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Success:</p>
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Error:</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <PDFDownloadLink
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-5 rounded mr-2"
          document={<PDFReport data={acceptedRequests} />}
          fileName="vehicle_details.pdf"
        >
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
        <input
          type="text"
          placeholder="Search by VIN"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Owner Name</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Owner Email</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">VIN</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Brand</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Model</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Year</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Fuel Consumption</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Color</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Company</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Price per km</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Features</th>
            <th className="px-4 py-2 bg-blue-200 text-blue-800">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td className="border px-4 py-2">{request.owner_Name}</td>
              <td className="border px-4 py-2">{request.owner_Email}</td>
              <td className="border px-4 py-2">{request.VIN}</td>
              <td className="border px-4 py-2">{request.brand}</td>
              <td className="border px-4 py-2">{request.model}</td>
              <td className="border px-4 py-2">{request.year}</td>
              <td className="border px-4 py-2">{request.fuel_consumption}</td>
              <td className="border px-4 py-2">{request.color}</td>
              <td className="border px-4 py-2">{request.company}</td>
              <td className="border px-4 py-2">{request.price_per_km}</td>
              <td className="border px-4 py-2">
                {request.features.join(", ")}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded mr-2"
                  onClick={() => handleEdit(request._id)}
                >
                  Edit 
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  onClick={() => handleDelete(request._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onDelete={confirmDelete}
      />
      {editingRequestId && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Edit Vehicle Details
                </h3>
                <button
                  onClick={() => setEditingRequestId(null)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.293 10l4.147-4.146a1 1 0 10-1.414-1.414L10.88 8.587l-4.146-4.147a1 1 0 10-1.414 1.414L9.466 10l-4.147 4.146a1 1 0 001.414 1.414L10.88 11.413l4.146 4.147a1 1 0 101.414-1.414L11.293 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="VIN"
                    className="block text-sm font-medium text-gray-600"
                  >
                    VIN
                  </label>
                  <input
                    type="text"
                    name="VIN"
                    id="VIN"
                    value={editFormData.VIN}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={editFormData.brand}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={editFormData.model}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="owner_Name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="owner_Name"
                    id="owner_Name"
                    value={editFormData.owner_Name}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="owner_Email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Owner Email
                  </label>
                  <input
                    type="text"
                    name="owner_Email"
                    id="owner_Email"
                    value={editFormData.owner_Email}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={editFormData.year}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fuel_consumption"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Fuel Consumption
                  </label>
                  <input
                    type="text"
                    name="fuel_consumption"
                    id="fuel_consumption"
                    value={editFormData.fuel_consumption}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    id="color"
                    value={editFormData.color}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={editFormData.company}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="features"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Features
                  </label>
                  <input
                    type="text"
                    name="features"
                    id="features"
                    value={editFormData.features}
                    onChange={handleEditFormChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleEditFormSubmit}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setEditingRequestId(null)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
