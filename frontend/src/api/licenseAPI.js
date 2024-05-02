import axios from 'axios';

// Base API URL
const BASE_URL = 'http://localhost:5555';

// API URLs for licenses and insurances
const LICENSES_API_URL = `${BASE_URL}/licenses`;
const INSURANCES_API_URL = `${BASE_URL}/insurances`;

// Fetch all licenses
export const fetchLicenses = async () => {
  return axios.get(LICENSES_API_URL);
};

// Create a new license
export const createLicense = async (licenseData) => {
  return axios.post(LICENSES_API_URL, licenseData);
};

// Update an existing license
export const updateLicense = async (id, licenseData) => {
  return axios.put(`${LICENSES_API_URL}/${id}`, licenseData);
};

// Delete a license
export const deleteLicense = async (id) => {
  return axios.delete(`${LICENSES_API_URL}/${id}`);
};

// Fetch all insurances
export const fetchInsurances = async () => {
  return axios.get(INSURANCES_API_URL);
};

// Create a new insurance
export const createInsurance = async (insuranceData) => {
  return axios.post(INSURANCES_API_URL, insuranceData);
};

// Update an existing insurance
export const updateInsurance = async (id, insuranceData) => {
  return axios.put(`${INSURANCES_API_URL}/${id}`, insuranceData);
};

// Delete an insurance
export const deleteInsurance = async (id) => {
  return axios.delete(`${INSURANCES_API_URL}/${id}`);
};
