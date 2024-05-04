import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const CarSchema = new Schema({
    owner_Name: {
        type: String,
        required: true
    },
    owner_Email: {
        type: String,
        required: true
    },
    owner_ID: {
        type: String,
        required: true
    },
    VIN: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fuel_consumption: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    price_per_km: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
    company : {
        type: String,
        required: true
    }

});

// module.exports = Car = mongoose.model('Car', CarSchema);
export const Car = mongoose.model('Car', CarSchema);
