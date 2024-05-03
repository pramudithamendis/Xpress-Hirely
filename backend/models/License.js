import mongoose from 'mongoose';

const LicenseSchema = new mongoose.Schema({
  vehicleNo: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  uploadLicense: { type: String },
  email: { type: String },
  notes: { type: String },
  status: { type: String, default: 'active' }
});

const License = mongoose.model('License', LicenseSchema);

export default License;
