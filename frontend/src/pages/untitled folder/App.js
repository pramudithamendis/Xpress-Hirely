import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import OnBoarding from '../src/pages/OnBoarding.jsx';
import RentRequest from './pages/RentRequest.jsx';
import RequestManagement from './pages/RequestManagment.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/rent-request" element={<RentRequest />} />
          <Route path="/request-management" element={<RequestManagement />} />
          <Route path="/vehicle-details" element={<VehicleDetails />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
      <ToastContainer /> {/* Include ToastContainer here */}
    </div>
  );
}

export default App;
