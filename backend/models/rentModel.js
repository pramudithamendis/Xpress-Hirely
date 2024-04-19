import mongoose from "mongoose";

const rentHistorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        vehicle:{
            type: String,
            required: true,
        },
        rentDate:{
            type: Date,
            required: true,
        },
        returnDate:{
            type: Date,
            required: true,
        },
        mileage:{
            type: Number,
            required: false,
        },
        amount:{
            type:Number,
            required:true
        },
    },
    {
            timestamps:true,
        }
);
export const RentHis = mongoose.model('RentHis', rentHistorySchema);//  how JS world understands
