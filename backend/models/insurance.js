import mongoose from 'mongoose';
import License from './License.js'; // Assuming License is in the same directory

const InsuranceSchema = new mongoose.Schema({
    insuranceProvider: { type: String },
    policyNumber: { type: String },
    policyType: { type: String },
    coverageDetails: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    premiumAmount: { type: Number },
    contactInformation: { type: String },
    email: {
        type: String,
        required: false,
        ref: 'License' // This sets up a reference to the License model
    },
    uploadInsurance: { type: String },
    vehicleNo: {
        type: String,
        required: false,
        ref: 'License' // This sets up a reference to the License model
    },
    status: { type: String, default: 'active' }
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);

export default Insurance;
