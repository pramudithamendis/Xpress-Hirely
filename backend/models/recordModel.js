import mongoose from "mongoose";

const recordSchema = mongoose.Schema(
    {
        Maintaintype:{
            type: String,
            required: true,
        },
        VehicleID:{
            type: String,
            required: true,
        },
        Date:{
            type: String,
            required: true,
        },
        Milage:{
            type: Number,
            required: true,
        },
        Description:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Record = mongoose.model('Cat', recordSchema);